const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Board = require("../models/board");
const User = require("../models/user");


const OrgSchema = new Schema({
    name: String,
    description: String,    
    boards: [{ type: Schema.Types.ObjectId, ref: "Board" }], 
    users: [{ type: Schema.Types.ObjectId, ref: "User" }]   
});

module.exports = mongoose.model("Org", OrgSchema);