const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.get("/", (req, res) => {
  // cookie set karna
  res.cookie("name", "niranjan");
  res.send("Hello, World!");
});

app.get("/read", (req, res) => {
  // cookie read karna
  console.log(req.cookies);
  res.send("Hello, World!");
});

// password hashing using bcrypt
app.get("/bcrypt", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("yourPassword", salt, function (err, hash) {
      console.log(hash);
      res.send("Password hashed successfully!");
    });
  });
});

// password comparison using bcrypt
app.get("/bcrypt/compare", (req, res) => {
  const hashedPassword = "$2b$10$EIX/1z5Z35z5Z3Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5"; // Example hash
  const passwordToCompare = "yourPassword";
  bcrypt.compare(passwordToCompare, hashedPassword, function (err, result) {
    if (result) {
      res.send("Password matches!");
    } else {
      res.send("Password does not match.");
    }
  });
});

// JWT token creation and verification
// JWT token creation
app.get("/jwt", (req, res) => {
  const token = jwt.sign({ name: "niranjan" }, "secretKey");
  res.cookie("token", token);
  //   console.log(token);
  res.send("JWT token created and cookie set!");
});

// JWT token verification
app.get("/jwt/verify", (req, res) => {
  let data = jwt.verify(req.cookies.token, "secretKey");
  //   console.log(data);
  res.send("JWT token verified successfully!");
});

app.listen(3000);
