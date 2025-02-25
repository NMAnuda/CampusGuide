const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        district: {type: String, required: true},
        stream: {type: String, required: true},
        course: {type: String, required: true},
        zValue1: {type: String, required: true},
        zValue2: {type: String, required: true},
    }
);
const User =mongoose.model("User",userSchema,"customers");
module.exports = User;

