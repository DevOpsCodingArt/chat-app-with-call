require("dotenv").config();

const express = require("express");
const authRouter = require("./Routes/auth.route");
const connectDB = require("./Config/db");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/user.route");
const chatRouter = require("./Routes/chat.route");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

app.use(
  cors({
    origin: "https://chat-app-with-call-f3pv.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/chat-app/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(_dirname, "../frontend", "chat-app", "dist", "index.html")
    );
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
