const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userposttest");

const userSchema = new mongoose.Schema({
  username: String,
  //  OR username: { type: String },
  email: String,
  age: Number,
  posts: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post", // Reference to the post model
    }
  ],
});

module.exports = mongoose.model("User", userSchema);
