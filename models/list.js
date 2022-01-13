const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Board = require("../models/board");
const Card = require("../models/card");


const ListSchema = new Schema({
    title: String,
    color: String,    
    card: [{ type: Schema.Types.ObjectId, ref: Card }]    
});

module.exports = mongoose.model("List", ListSchema);