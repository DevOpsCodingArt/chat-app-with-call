const express = require("express");
const protectRoute = require("../Middleware/auth.middle");
const {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendRequests,
} = require("../Controller/user/userController");

const userRouter = express.Router();

userRouter.use(protectRoute);
// Example: Get all users
userRouter.get("/", getRecommendedUsers);
userRouter.get("/friends", getMyFriends);
userRouter.post("/friend-request/:id", sendFriendRequest);
userRouter.put("/friend-request/:id/accept", acceptFriendRequest);
userRouter.get("/friend-requests", getFriendRequests);
userRouter.get("/outgoing-friend-requests", getOutgoingFriendRequests);

module.exports = userRouter;
