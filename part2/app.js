const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const path = require("path");

const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  const { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });

      const token = jwt.sign({ email }, "this_is_a_secret_key");
      res.cookie("token", token);
      res.render("login");
    });
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(400).send("User not found");
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ email: user.email }, "this_is_a_secret_key");
        res.cookie("token", token);
        res.render("profile", {user})
      } else {
        return res.status(400).send("Something went wrong");
      }
    });
  }
});


// direct login page if user is already created
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token"); // OR res.cookie("token", "");
  res.redirect("/");
});

app.listen(3000);
