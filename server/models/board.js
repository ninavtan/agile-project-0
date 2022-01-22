const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const List = require("../models/list");


const BoardSchema = new Schema({
    title: String,
    label: String,    
    lists: [{ type: Schema.Types.ObjectId, ref: "List" }], 
    user: { type: Schema.Types.ObjectId, ref: "User" }   
});

module.exports = mongoose.model("Board", BoardSchema);