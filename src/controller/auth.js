require("dotenv").config();
const { sendWelcomeEmail } = require("../mailer");
const User = require("../model/auth");
const { UserZodSchema } = require("../utils/ZodSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id, email) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const handleSignup = async (req, res) => {
  let { firstName, lastName, email, gender, phone, password } = req.body;
  try {
    let validatedData = UserZodSchema.parse({
      firstName,
      lastName,
      email,
      gender,
      phone,
      password,
    });
    const salt = await bcrypt.genSalt();

    validatedData.password = await bcrypt.hash(password, salt);

    // make my validation validation
    const response = await User.create(validatedData);
    const name = firstName + " " + lastName;

    await sendWelcomeEmail({ name, email });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error creating data", error });
  }
};
const handleLogin = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(404).json({ message: "pls fill al the details" });
    }

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ message: "invalid login credentials" });
    }
    // check if the password is correct with the password in db
    // unhash the password
    const verify = await bcrypt.compare(password, userDetails.password);

    if (!verify) {
      return res.status(404).json({ message: "invalid login credentials" });
    }
    // else log them in
    const token = createToken(userDetails._id, userDetails.email);

    res.json({ message: "u are logged in", token });
    // const res = await
    console.log(req.body);
  } catch (error) {}
};

const handleCheckAuth = async (req, res) => {
  try {
    // console.log(req.user);
    // console.log("hell world");
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status).json({ message });
  }
};
module.exports = { handleSignup, handleLogin, handleCheckAuth };

// get tge user details from the client -> Email and password 👍
// check if the user Email and pass they sentis not empty 👍
// check if the email the users sent is in out database 👍
// if not, tell them to sign up 👍
//  if yes, check the password they sent is the same as the one in our db
// if no, tell them invalid login credentials
// if yes, log them in by sending them  a token in theree client

//      JWT  -> JSON -> WEB -> TOKEN

// egdgwfyueqfuieiogneiunguinwugnijgoiwngp8y985h4985ht49ht89h54egdgwfyueqfuieiogneiunguinwugnijgoiwngp8y985h4985ht49ht89h54
// egdgwfyueqfuieiogneiunguinwugnijgoiwngp8y985h4985ht49ht89h54egdgwfyueqfuieiogneiunguinwugnijgoiwngp8y985h4985ht49ht89h54
// egdgwfyueqfuieiogneiunguinwugnijgoiwngp8y985h4985ht49ht89h54egdgwfyueqfuieiogneiunguinwugnijgoiwngp8y985h4985ht49ht89h54;
