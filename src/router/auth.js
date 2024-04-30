const express = require("express");
const { handleSignup } = require("../controller/auth");
const router = express.Router();

router.post("/signup", handleSignup);

module.exports = router;
