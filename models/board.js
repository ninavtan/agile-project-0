const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const List = require("../models/list");


const BoardSchema = new Schema({
    title: String,
    label: String,    
    list: [{ type: Schema.Types.ObjectId, ref: List }],    
});

module.exports = mongoose.model("Board", BoardSchema);