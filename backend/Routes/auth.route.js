const express = require("express");
const {
  signUp,
  login,
  logOut,
  onBoard,
} = require("../Controller/auth/authController");
const protectRoute = require("../Middleware/auth.middle");

const authRouter = express.Router();

// Example: Register route
authRouter.post("/signUp", signUp);

// Example: Login route
authRouter.post("/login", login);
authRouter.post("/logout", logOut);

authRouter.post("/onboarding", protectRoute, onBoard);

authRouter.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
module.exports = authRouter;
