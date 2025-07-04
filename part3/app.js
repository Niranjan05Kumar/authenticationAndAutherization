const express = require("express");
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/createuser", async (req, res) => {
  const user = await userModel.create({
    name: "John Doe",
    email: "johndeo@gmail.com",
    age: 30,
  });
  res.send(user);
});

app.get("/createpost", async (req, res) => {
  const post = await postModel.create({
    postdata: "This is a post",
    user: "6868013ade3833a7b0ced214",
  });
  const user = await userModel.findOne({ _id: "6868013ade3833a7b0ced214" });
  user.posts.push(post._id);
  await user.save();
  res.send({post, user});
});

app.listen(3000);
