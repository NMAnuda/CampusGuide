const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        username: {type: String, required: true},
        possition:{type: String, required: true}
     
    }
);
const checkhead = mongoose.model("checkhead",userSchema,"head");
module.exports = checkhead;