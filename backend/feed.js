const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }  
});

const Feed = mongoose.model("feed", userSchema, "feedback"); 
module.exports = Feed;
