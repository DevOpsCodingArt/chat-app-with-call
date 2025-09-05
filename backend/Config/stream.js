require("dotenv").config();
const { StreamChat } = require("stream-chat");

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("Missing Stream API credentials");
}
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

const upsertStreamUser = async (userData) => {
  try {
    if (!userData?.id) {
      throw new Error("User ID is required");
    }
    return await streamClient.upsertUser(userData);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error;
  }
};

// Uncomment if you want to export this function as well
const generateStreamToken = (userId) => {
  const userIdStr = userId.toString();
  return streamClient.createToken(userIdStr);
};

module.exports = {
  upsertStreamUser,
  generateStreamToken,
};
