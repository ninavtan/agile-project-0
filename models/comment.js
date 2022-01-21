const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Card = require("../models/card");


const CommentSchema = new Schema({
    username: String,
    text: String,
    card: { type: Schema.Types.ObjectId, ref: "Card" }   
});

module.exports = mongoose.model("Comment", CommentSchema);