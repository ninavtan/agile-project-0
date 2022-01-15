const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const List = require("../models/list");
const Comment = require("../models/comment");

const CardSchema = new Schema({
    cardTitle: String,
    description: String, 
    cardlabel: String, 
    list: { type: Schema.Types.ObjectId, ref: "List" },  
    comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],    
});

module.exports = mongoose.model("Card", CardSchema);