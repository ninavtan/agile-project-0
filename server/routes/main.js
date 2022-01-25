const router = require("express").Router();

const Board = require("../models/board");
const Card = require("../models/card");
const Comment = require("../models/comment");
const List = require("../models/list");
const User = require("../models/user");
const Org = require("../models/org");


router.get("/generate-fake-data", (req, res, next) => {       
    // Generate two organizations
    let orgOne = new Org();

    orgOne.name = "Chore Professionals LLC"
    orgOne.description = "Helping you get chores done before your partner gets home!"
    orgOne.boards = []
    orgOne.users = []

    orgOne.save((err) => {
        if (err) throw err;
    });

    let orgTwo = new Org();

    orgTwo.name = "Slackers"
    orgTwo.description = "Always do it later."
    orgTwo.boards = []
    orgTwo.users = []

    orgTwo.save((err) => {
        if (err) throw err;
    });    
    
    //Generate three users    
    let userOne = new User();
    
    userOne.username = "Stephen";
    userOne.password = "Strange";
    userOne.board = [];
    userOne.org = null;

    userOne.save((err) => {
        if (err) throw err;
    });   

    let userTwo = new User();
    
    userTwo.username = "Jango";
    userTwo.password = "Fett";
    userTwo.board = [];
    userTwo.org = null;

    userTwo.save((err) => {
        if (err) throw err;
    });   

    let userThree = new User();
    
    userThree.username = "Marc";
    userThree.password = "Spector";
    userThree.board = [];
    userThree.org = null;

    userThree.save((err) => {
        if (err) throw err;
    });   
    
    // Generate two boards

    let boardOne = new Board();

    boardOne.title = "Chores";
    boardOne.label = "#CD6155"
    boardOne.lists = [];    

    boardOne.save((err) => {
        if (err) throw err;
    });

    let boardTwo = new Board();

    boardTwo.title = "Fun and Games";
    boardTwo.label = "#2980B9"
    boardTwo.lists = [];    

    boardTwo.save((err) => {
        if (err) throw err;
    });
    
    // Generate two dummy lists  
    let toDoList = new List();

    toDoList.title = "To Do";
    toDoList.color = "#F1C40F";    
    toDoList.card = [];

    toDoList.save((err) => {
        if (err) throw err;
    });

    let doingList = new List();

    doingList.title = "Doing";
    doingList.color = "#D35400";    
    doingList.card = [];

    doingList.save((err) => {
        if (err) throw err;
    });

    let doneList = new List();

    doneList.title = "Done";
    doneList.color = "#F1C40F";    
    doneList.card = [];

    doneList.save((err) => {
        if (err) throw err;
    });
    
    
    // Generate two dummy cards
    let card1 = new Card();

    card1.cardTitle = "Take out the trash";
    card1.description = "Trash truck stops by on Wednesday";
    card1.cardLabel = "#239B56";    
    card1.comment = [];

    card1.save((err) => {
        if (err) throw err;
    });

    let card2 = new Card();

    card2.cardTitle = "Veterinary Appointment";
    card2.description = "Take dog to vet";
    card2.cardLabel = "#839192";    
    card2.comment = [];

    card2.save((err) => {
        if (err) throw err;
    });     

    let comment1 = new Comment();

    comment1.username = null;
    comment1.text = "Test-Text";
    comment1.card = null;

    comment1.save((err) => {
        if (err) throw err;
    });

    res.end();
});

router.get("/push-fake-data", async (req, res, next) => {
    // Push database objects to their respective arrays
    orgOne = await Org.findOne({ name: 'Chore Professionals LLC'}).exec();
    orgTwo = await Org.findOne({ name: 'Slackers' }).exec();
    userOne = await User.findOne({ username: 'Stephen' }).exec();
    userTwo = await User.findOne({ username: 'Jango' }).exec();
    userThree = await User.findOne({ username: 'Marc' }).exec();    
    boardOne = await Board.findOne({ title: "Chores" }).exec();   
    boardTwo = await Board.findOne({ title: "Fun and Games" }).exec();   
    toDoList = await List.findOne({ title: "To Do" }).exec();   
    doingList = await List.findOne({ title: "Doing" }).exec();   
    doneList = await List.findOne({ title: "Done" }).exec();   
    card1 = await Card.findOne({ cardTitle: "Take out the trash" }).exec();   
    card2 = await Card.findOne({ cardTitle: "Veterinary Appointment" }).exec();   
    comment1 = await Comment.findOne({ text: "Test-Text" }).exec();
    
    //orgOne.users.push(userOne._id);
    orgOne.users.push(userTwo._id);
    orgOne.users.push(userThree._id);
    orgOne.save();

    orgTwo.users.push(userOne._id);
    orgTwo.save();

    userOne.org = orgTwo._id;
    userOne.save();

    userTwo.org = orgOne._id;
    userTwo.board.push(boardOne._id);
    userTwo.board.push(boardTwo._id);
    userTwo.save();

    userThree.org = orgOne._id;
    userThree.save();

    boardOne.lists.push(toDoList._id);
    boardOne.lists.push(doingList._id);
    boardOne.user = userTwo._id;
    boardOne.save();

    boardTwo.lists.push(doneList._id);
    boardTwo.user = userTwo._id;
    boardTwo.save();

    toDoList.card.push(card1._id);
    toDoList.board = boardOne._id;  
    toDoList.save();
    
    doingList.card.push(card2._id);
    doingList.board = boardOne._id;
    doingList.save();

    doneList.board = boardOne._id;
    doneList.save();

    card1.list = toDoList._id;
    card1.comment.push(comment1._id);
    card1.save();

    card2.list = doingList._id;
    card2.save();  
    
    comment1.username = userThree._id;
    comment1.card = card1._id;
    comment1.save();

    res.end();
});   

// Board Routes //

/*
router.get("/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne(
        {username: }
    )
})

*/
// GET all boards for the logged in user 
router.get("/:user", (req, res, next) => {   
    const userId = req.params.user;
    console.log(req.params.user)

    User.findById( userId )
    .populate("board")
    .exec((err, targetUser) => {
        if (err) return next(err);
        res.send(targetUser.board);
    });
});

//GET a specific board based on id 
router.get("/boards/:board", (req, res, next) => {
    const board = req.params.board;
    console.log(board._id)

    Board.findById(board)
        .populate("lists")
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
    boardToBeAdded.lists = [];

    boardToBeAdded.save((err) => {
        if(err) throw err;
    });

    res.send(boardToBeAdded);
});

// DELETE a pre-existing board 
router.delete("/boards/:board", (req, res, next) => {
    const board  = req.params.board;

    Board.findByIdAndRemove(board, (err, matchingBoard) => {
        if (err) throw err;

        List.deleteMany({board: board}).exec((err, lists) => {
            res.send(`All lists associated with Board ${board} have been deleted.`)
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
        { new: true},             
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
        .populate("lists")
        .exec((err, targetBoard) => {
            if (err) throw err;
            res.send(targetBoard.lists);
        });   
});

// POST add a new list to an existing board 
router.post("/boards/:board/list", async (req, res, next) => {
    const boardId = req.params.board; 
    const listToBeAdded = new List(); 
    const targetBoard = await Board.findById(boardId).exec();
      

    listToBeAdded.title = req.body.title;
    listToBeAdded.color = '';
    listToBeAdded.board = targetBoard._id;
    listToBeAdded.card = [];    

    listToBeAdded.save((err) => {
        if(err) throw err;
    }); 
    
    targetBoard.lists.push(listToBeAdded);
    targetBoard.save();

    res.send(listToBeAdded);    
});

// DELETE(archive) a pre-existing list
// use List.findByIdAndRemove
router.delete("/boards/:board/:list", (req, res, next) => {    
    const list = req.params.list;
    const board = req.params.board;    
    
    List.findByIdAndRemove(list, 
        { new: true},
        (err, matchingList) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        };
        
        Board.findOneAndUpdate(
            {_id: board},
            { $pull: { lists: list}}, 
            { new: true}, 
            (err, result) => {
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
            { new: true},
            (err, updatedList) => {
                if (err) throw err;
                Card.findByIdAndUpdate(targetCard._id,
                    { list: listId },
                    { new: true},
                    (err, updatedCardWithListId) => {
                        if (err) throw err;
                        res.send(updatedCardWithListId)  //Can change this to the updated list if needed.
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
            { new: true},       
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
    cardToBeAdded.description = '';
    cardToBeAdded.cardLabel = '';
    cardToBeAdded.list = targetList._id;
    cardToBeAdded.comment = [];

    console.log(req.body.title)

    cardToBeAdded.save((err) => {
        if(err) throw err;
    });   

    targetList.card.push(cardToBeAdded);
    targetList.save();

    res.send(cardToBeAdded);
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
        cardLabel: updatedLabel },
        { new: true},
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
        List.findOneAndUpdate(
            {_id: req.params.list},
            { $pull: { card: card}},
            { new: true},
            (err, updatedList) => {
                if (err) console.log("There was an error:", err);
                res.send(updatedList);
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

    res.send(commentToBeAdded);        
});

// GET all comments for the specified card 
router.get("/boards/:card/comments", (req, res, next) => {
    const card = req.params.card;

    Card.findById(card)
        .populate("comment")
        .exec((err, targetCard) => {
            if (err) throw err;
            res.send(targetCard.comment);
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
        { new: true},
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
            { $pull: { comment: comment}},
            { new: true},
            (err, result) => {
                if (err) throw err;
                return res.send(result);
            }
        );
    });
});

module.exports = router;



    