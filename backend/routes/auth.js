const routerAuth = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
  passwordReset,
} = require("../models/validation");

// REGISTER

routerAuth.post("/register", async (req, res) => {
  // Validate data before a user
  console.log(registerValidation(req.body));
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the username is already in the database
  const usernameExist = await User.findOne({ name: req.body.name });
  if (usernameExist) return res.status(400).send("Username already exist");

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error + "Look");
  }
});

// LOGIN
routerAuth.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email exists
  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send("Username is not found");

  // PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  // Create and assing a token
  const token = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.TOKEN_SECRET
  );
  res.status(200).send(token);
});

// FORGOT PASSWORD
routerAuth.post("/reset-password", async (req, res) => {
  const { error } = passwordReset(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  const getUserId = await User.findOne({ id: req.body.id });

  if (emailExist) {
    var oldPassword = getUserId.password; // declare user password from DB
    const newPass = req.body.newPassword; // declare new password
    const currentPass = req.body.password; // declare current password

    // Hashing new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPass, salt);

    // Check user password from DB and current user password if they match
    const comparePasswords = bcrypt.compare(
      currentPass,
      oldPassword,
      function (err, isMatch) {
        if (err) {
          res.json({ message: err });
        } else if (!isMatch) {
          res.json({ message: "Wrong current password" });
        } else {
          // Check if new password is different than current password
          bcrypt.compare(currentPass, hashPassword, function (err, isMatch) {
            if (err) {
              res.json({ message: err });
            } else if (!isMatch) {
              // Save new password in DB
              getUserId.password = hashPassword;
              getUserId.save();
              res.json({ message: getUserId });
            } else {
              res.json({ message: "New password is the same as old one" });
            }
          });
        }
      }
    );
  } else {
    return res.status(400).send("Email doesn't exist");
  }
});

// Getting username
routerAuth.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user.name);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = routerAuth;
