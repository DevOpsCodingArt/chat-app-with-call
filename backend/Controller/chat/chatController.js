const { generateStreamToken } = require("../../Config/stream");

exports.getStreamToken = (req, res) => {
  try {
    const token = generateStreamToken(req.user.id);
    res.json({ token });
  } catch (error) {
    console.error("Error generating stream token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
