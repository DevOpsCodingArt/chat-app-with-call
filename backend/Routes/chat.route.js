const express = require("express");
const protectRoute = require("../Middleware/auth.middle");
const { getStreamToken } = require("../Controller/chat/chatController");

const chatRouter = express.Router();

// Example: Get all chats
chatRouter.get("/token", protectRoute, getStreamToken);

module.exports = chatRouter;
