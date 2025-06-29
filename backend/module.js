const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        district: {type: String, required: true},
        stream: {type: String, required: true},
        subject1: {type: String, required: true},
        subject2: {type: String, required: true},
        subject3: {type: String, required: true},
        course: {type: String, required: true},
        zValue1: {type: String, required: true},
        zValue2: {type: String, required: true},
        Students:{type: Number},
        year: {type: String },
        campus: {type: String},
    }
);
const User =mongoose.model("User",userSchema,"customers");
module.exports = User;

