const router = require("express").Router();

const Board = require("../models/board");
const Card = require("../models/card");
const comment = require("../models/comment");
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

// Board Routes //

// GET all boards for the logged in user 
router.get("/boards", (req, res, next) => {   

    Board.find({})
    .exec((err, boards) => {
        if (err) return next(err);
        res.send(boards);
    });
});

//GET a specific board based on id 
router.get("/boards/:board", (req, res, next) => {
    const { board } = req.params;

    Board.findById(board)
        .populate("list")
        .exec((err, searchedBoard) => {
            if (err) throw err;
            res.send(searchedBoard);
        });    
});

// POST a new board 
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

// DELETE a pre-existing board 
router.delete("/boards/:board", (req, res, next) => {
    const board  = req.params.board;

    Board.findByIdAndRemove(board, (err, matchingBoard) => {
        if (err) throw err;

        List.deleteMany({board: board}).exec((err, lists) => {
            res.send(` ${lists} associated with Board ${board} have been deleted.`)
        });
    });    
});

// PUT(edit) a pre-existing board 
router.put("/boards/:board", (req, res, next) => { 
    const currentBoard = req.params.board;
    const updatedTitle = req.body.title;
    const updatedLabel = req.body.label;   

    Board.findOneAndUpdate(
        { _id: currentBoard },
        { label: updatedLabel,
          title: updatedTitle},             
        (err, updatedBoard) => {
            if (err) throw err;
            else res.send(updatedBoard);        
        });   
});


// List Routes //

// GET all lists for the specified board 
router.get("/boards/:board/lists", (req, res, next) => {
    const boardId = req.params.board;

    Board.findById(boardId)
        .populate("list")
        .exec((err, list) => {
            if (err) throw err;
            res.send(list);
        });   
});

// POST add a new list to an existing board 
router.post("/boards/:board/list", async (req, res, next) => {
    const boardId = req.params.board; 
    const listToBeAdded = new List(); 
    const targetBoard = await Board.findById(boardId).exec();
      

    listToBeAdded.title = req.body.title;
    listToBeAdded.color = req.body.color;
    listToBeAdded.board = targetBoard._id;
    listToBeAdded.card = [];    

    listToBeAdded.save((err) => {
        if(err) throw err;
    }); 
    
    targetBoard.list.push(listToBeAdded);
    targetBoard.save();

    res.end();    
});

// DELETE(archive) a pre-existing list
// use List.findByIdAndRemove
router.delete("/boards/:board/:list", (req, res, next) => {    
    const list = req.params.list;
    const board = req.params.board;    
    
    List.findByIdAndRemove(list, (err, matchingList) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        };
        
        Board.findOneAndUpdate(
            {_id: board},
            { $pull: { list: list}}, function(err, result) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                };
                return res.send(result);
            }
        );
// Find the cards associated with list to delete.
/*
Card.deleteMany({list: list}).exec((err, cards) => {
    if (err) throw err;
    res.send(` ${cards} associated with Board ${list} have been deleted.`)
});
*/
});
});

//Use this route when dragging cards to a new list
router.put("/boards/board/:list", async (req, res, next) => {
    const listId = req.params.list;
    // No option to update board._id since lists won't change boards    

    if (req.body.card) {
        const updatedTitle = req.body.title;
        const updatedColor = req.body.color;    
        const newCardId = req.body.card;

        const targetCard = await Card.findById(newCardId).exec();

        List.findOneAndUpdate(
            { _id: listId },
            { title: updatedTitle,
              color: updatedColor,
              $push: {card: targetCard._id} },
            (err, updatedList) => {
                if (err) throw err;
                Card.findByIdAndUpdate(targetCard._id,
                    { list: listId },
                    (err, updatedListandCard) => {
                        if (err) throw err;
                        res.send(updatedListandCard)
                    }
                );              
            }  
        );
    } else { 
        const updatedTitle = req.body.title;
        const updatedColor = req.body.color; 

        List.findOneAndUpdate(
            { _id: listId },
            { title: updatedTitle, 
              color: updatedColor},        
            (err, updatedList) => {
                if (err) throw err;
                res.send(updatedList);
            }
        );
    }    
});

// CARD ROUTES //

// POST a new card 
router.post("/boards/:board/:list/card", async (req, res, next) => {
    const listId = req.params.list;
    const cardToBeAdded = new Card();
    const targetList = await List.findById(listId).exec();

    cardToBeAdded.cardTitle = req.body.title;
    cardToBeAdded.description = req.body.description;
    cardToBeAdded.cardLabel = req.body.label;
    cardToBeAdded.list = targetList._id;
    cardToBeAdded.comment = [];

    cardToBeAdded.save((err) => {
        if(err) throw err;
    });   

    targetList.card.push(cardToBeAdded);
    targetList.save();

    res.end();
});

// GET a pre-existing card 
router.get("/boards/:board/:list/:card", (req, res, next) => {
    const card = req.params.card;

    Card.findById(card).exec((err, matchingCard) => {
        res.send(matchingCard);
    });
});

// PUT(edit) a pre-existing card 
router.put("/boards/:board/:list/:card", (req, res, next) => {
    const card = req.params.card;

    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;
    const updatedLabel = req.body.label;
    // Update to comment value will occur with Comment POST route

    Card.findOneAndUpdate(
        { _id: card },
        { cardTitle: updatedTitle,
        description: updatedDesc,
        cardlabel: updatedLabel },
        (err, updatedCard) => {
            if (err) throw err;
            else res.send(updatedCard);        
        });   
});

//DELETE a pre-existing card 
router.delete("/boards/board/:list/:card", (req, res, next) => {
    const card = req.params.card;

    Card.findByIdAndDelete(card).exec((err, cardToDelete) => {
        if (err) throw err;
        // Updates the list and removes the card to delete.
        List.findOneAndUpdate({_id: req.params.list},
            { $pull: { card: card}}, function(err, result) {
                if (err) console.log("There was an error:", err);
                res.send(result);
            });       
    });    
});

// Comment Routes //

// POST a new comment to the selected card
router.post("/boards/:card/comment", async (req, res, next) => {
    const cardId = req.params.card;
    const commentToBeAdded = new Comment();
    const targetCard = await Card.findById(cardId).exec();     

    commentToBeAdded.username = req.body.username;
    commentToBeAdded.text = req.body.text;
    commentToBeAdded.card = targetCard._id;
    
    commentToBeAdded.save((err) => {
        if(err) throw err;
    });

    targetCard.comment.push(commentToBeAdded);
    targetCard.save();

    res.end();        
});

// GET all comments for the specified card 
router.get("/boards/:card/comments", (req, res, next) => {
    const card = req.params.card;

    Card.findById(card)
        .populate("comment")
        .exec((err, cardComments) => {
            if (err) throw err;
            res.send(cardComments);
        });    
});

// PUT (edit) a specific comment
router.put("/boards/card/:comment", (req, res, next) => {
    const comment = req.params.comment;

    // Should not be able to edit what user made the comment.  Only the text.
    const updatedText = req.body.text;
 
    Comment.findOneAndUpdate(
        { _id: comment},
        { text: updatedText },
        (err, updatedComment) => {
            if (err) throw err;
            res.send(updatedComment);
        });    
});

// DELETE a specific comment
router.delete("/boards/board/list/:card/:comment", (req, res, next) => {
    const comment = req.params.comment;
    const card = req.params.card;    
    
    Comment.findByIdAndDelete(comment).exec((err, commentToDelete) => {
        if (err) throw err;           
        // Updates the card and removes the deleted comment     
        Card.findOneAndUpdate(
            {_id: card},
            { $pull: { comment: comment}}, function(err, result) {
                if (err) throw err;
                return res.send(result);
            }
        );
    });
});

module.exports = router;
