const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Board = require("../models/board");
const Comment = require("../models/comment");
// do we want to link the List the card is in?


const CardSchema = new Schema({
    cardTitle: String,
    description: String, 
    cardLabel: String,   
    comment: [{ type: Schema.Types.ObjectId, ref: Comment }],    
});

module.exports = mongoose.model("Card", CardSchema);