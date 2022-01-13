const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Card = require("../models/card");


const CommentSchema = new Schema({
    username: String,
    text: String    
});

module.exports = mongoose.model("Comment", CommentSchema);