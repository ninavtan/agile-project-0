const router = require("express").Router();

const Board = require("../models/board");
const Card = require("../models/card");
const Comment = require("../models/comment");
const List = require("../models/list");
const User = require("../models/user");

/*
router.get("/generate-fake-data", (req, res, next) => {       
    // Generate two dummy cards
    let card1 = new Card();

    card1.cardTitle = "Take out the trash";
    card1.description = "Trash truck stops by on Wednesday";
    card1.label = "#F0FFFF";

    card1.save((err) => {
        if (err) throw err;
    });

    let card2 = new Card();

    card2.cardTitle = "Veterinary Appointment";
    card2.description = "Take dog to vet appointment";
    card2.label = "#F0FFFF";

    card2.save((err) => {
        if (err) throw err;
    });

    // Generate two dummy lists  
    let toDoList = new List();

    toDoList.title = "To Do";
    toDoList.color = "#FAEBD7";
    toDoList.card.push(card1);

    toDoList.save((err) => {
        if (err) throw err;
    });

    let doingList = new List();

    doingList.title = "Doing";
    doingList.color = "#FAEBD7";
    doingList.card.push(card2);

    doingList.save((err) => {
        if (err) throw err;
    });

    // Generate one board
    let boardOne = new Board();

    boardOne.title = "Chores";
    boardOne.label = "#00FFFF"
    boardOne.list.push(toDoList);
    boardOne.list.push(doingList);

    boardOne.save((err) => {
        if (err) throw err;
    });

    //Generate one user    
    let userOne = new User();
    
    userOne.username = "John Smith";
    userOne.password = "John Smith";
    userOne.board.push(boardOne);

    userOne.save((err) => {
        if (err) throw err;
    });   
});
*/




// POST for login information
router.post("/login", (req, res) => {

});

// GET the board for the logged in user (working)
router.get("/boards", (req, res, next) => {   

    Board.find({})
    .exec((err, boards) => {
        if (err) return next(err);
        res.send(boards);
    });


});

// POST a new board (working)
router.post("/boards/", (req, res, next) => {
    let boardToBeAdded = new Board();

    boardToBeAdded.title = req.body.title;
    boardToBeAdded.label = req.body.label;
    boardToBeAdded.list = [];

    boardToBeAdded.save((err) => {
        if(err) throw err;
    });

    res.end();

});

// DELETE a pre-existing board (working)
// TODO: delete cards related to board to delete
router.delete("/boards/:board", (req, res, next) => {
    const board  = req.params.board;

    Board.findByIdAndRemove(board, (err, matchingBoard) => {
        if (err) throw err;
        res.send(matchingBoard._id + " has been removed from Boards.");
    });

    // Find the lists associated with board to delete and delete those too. (working)
    List.deleteMany({board: board}).exec((err, lists) => {
        res.send(` ${lists} associated with Board ${board} have been deleted.`)
    });


});

// PUT(edit) a pre-existing board
router.put("/boards/:board", (req, res, next) => {

});

// GET all lists for the specified board (working)
router.get("/boards/:board/lists", (req, res, next) => {
    const { board } = req.params;

    Board.findById(board)
        .populate("list")
        .exec((err, list) => {
            if (err) throw err;
            res.send(list);
        });   
});

// POST add a new list using its title only to an existing board (working)
router.post("/boards/:board/list", (req, res, next) => {
    let listToBeAdded = new List();
    const { board } = req.params;   

    listToBeAdded.title = req.body.title;
    listToBeAdded.color = ''
    listToBeAdded.card = [];

    listToBeAdded.save((err) => {
        if(err) throw err;
    });

    Board.findOneAndUpdate(
        { _id: board },
        { $push: {list: listToBeAdded} },
        
        (err, updatedBoard) => {
            if (err) throw err;
            else res.send(updatedBoard);
        }
            
    )
    
});

// DELETE(archive) a pre-existing list
router.delete("/boards/:board/:list", (req, res, next) => {
    const { board } = req.params
    const { list } = req.params

    Board.findByIdAndRemove(board, (err, matchingBoard) => {
        if (err) throw err;
        matchingBoard.list.findByIdAndRemove(list, (matchingList) => {
            res.send(matchingList + "has been removed from the board.");
        })
        
    });

    // Find board, then use $pull to pull list using id


});

// CARD ROUTES //

// GET a pre-existing card (working)
router.get("/boards/:board/:list/:card", (req, res, next) => {
    const card = req.params.card;
    console.log(card);

    // Get card by id
    Card.findById(card).exec((err, matchingCard) => {
        res.send(matchingCard);
    });
});

// POST a new card using its title only
router.post("/boards/:board/:list/card", (req, res, next) => {
    let cardToBeAdded = new Card();

    const { list } = req.params;   

    console.log(req.body.cardTitle);

    cardToBeAdded.cardTitle = req.body.cardTitle;
    cardToBeAdded.description = '';
    cardToBeAdded.cardLabel = '';

    cardToBeAdded.save((err) => {
        if(err) console.log('There was an error with saving the card', err);
    });

    List.findOneAndUpdate(
        { _id: list },
        { $push: {card: cardToBeAdded} },
        
        (err, updatedList) => {
            if (err) throw err;
            else res.send(updatedList);
        }    
    )
});

// PUT(edit) a pre-existing card
router.put("/boards/:board/:list/:card", (req, res, next) => {
    const card = req.params.card;

});

//DELETE a pre-existing card (working)
router.delete("/boards/:board/:list/:card", (req, res, next) => {
    const card = req.params.card;

    Card.findByIdAndDelete(card).exec((err, cardToDelete) => {
        if (err) throw err;
        res.send(cardToDelete + "has been deleted from this list.");
    });

    // Updates the list and removes the card to delete.
    List.findOneAndUpdate({_id: req.params.list},
        { $pull: { card: card}}, function(err, result) {
            if (err) console.log("There was an error:", err);
            res.send(result);
        })
});

// TODO:
// POST a new comment to the selected card
router.post("/board/:card/comments", (req, res, next) => {

});

// GET all comments for the specified card (is this needed?)
router.get("/board/:card/comments", (req, res, next) => {

});

module.exports = router;