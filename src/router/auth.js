const express = require("express");
const {
  handleSignup,
  handleLogin,
  handleCheckAuth,
} = require("../controller/auth");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/checkAuth", verifyToken, handleCheckAuth);

module.exports = router;
