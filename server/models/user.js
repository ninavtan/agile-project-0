const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Board = require("../models/board");


const UserSchema = new Schema({
    username: String,
    password: String,
    board: [{ type: Schema.Types.ObjectId, ref: Board }],
});

module.exports = mongoose.model("User", UserSchema);