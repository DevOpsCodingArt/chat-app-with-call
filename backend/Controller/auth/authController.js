const jwt = require("jsonwebtoken");
const { upsertStreamUser } = require("../../Config/stream");
const User = require("../../Model/User");

exports.signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // Simple validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }
    const idx = Math.floor(Math.random() * 10000);
    const avatarUrl = `https://avatar.iran.liara.run/public/${idx}`;
    // Create user
    const newUser = new User({
      fullName,
      email,
      password,
      profilePic: avatarUrl,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
    } catch (error) {
      console.error(`Error upserting Stream user: ${newUser.fullName}`, error);
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    newUser.token = token;
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.onBoard = async (req, res) => {
  try {
    const userID = req.user.id;
    const { fullName, bio, nativeLanguage, learningLanguage, location } =
      req.body;
    console.log(fullName, bio, nativeLanguage, learningLanguage, location);

    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ],
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        ...req.body,
        isOnBoarding: true,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    user.token = token;
    await user.save();

    res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.logOut = async (req, res) => {
  res.clearCookie("token", {
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  res.status(200).json({ message: "Logout successful." });
};
