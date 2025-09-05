const User = require("../../Model/User");
const FriendRequest = require("./FriendRequest");

// Get recommended users
exports.getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude current user
        { _id: { $nin: currentUser.friends } }, // exclude current user's friends
        { isOnBoarding: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // Prevent sending request to self
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself." });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user." });
    }

    // Check if a friend request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json({ message: "Friend request sent." });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const myId = req.user.id;
    const { id: requestId } = req.params;

    // Find the friend request
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    // Check if the current user is the recipient
    if (friendRequest.recipient.toString() !== myId) {
      return res
        .status(403)
        .json({ message: "You cannot accept this request." });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add each other to friends list
    await User.findByIdAndUpdate(myId, {
      $addToSet: { friends: friendRequest.sender },
    });
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: myId },
    });

    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const myId = req.user.id;
    const incomingReqs = await FriendRequest.find({
      recipient: myId,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    // Get accepted requests where user is sender or recipient
    const acceptedReqs = await FriendRequest.find({
      status: "accepted",
      $or: [{ sender: myId }, { recipient: myId }],
    }).populate(
      "sender recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getOutgoingFriendRequests = async (req, res) => {
  try {
    const myId = req.user.id;

    const outgoingReqs = await FriendRequest.find({
      sender: myId,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingReqs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
