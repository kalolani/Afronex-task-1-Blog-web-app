/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import User from "./models/user.js";
import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import Post from "./models/post.js";
import Comment from "./models/comment.js";

//const router = express.Router();

const app = express();

const allowedOrigin = " https://blog-website-frontend-opal.vercel.app";
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const salt = bcrypt.genSaltSync(10);
const secret = "dkjfbvdkfjbvdkfjbvkdfvbdkfvb";

await mongoose.connect(
  `mongodb+srv://kaleab:kalolani7@cluster0.bi7hd3m.mongodb.net/?retryWrites=true&w=majority`
);

app.get("/", (req, res) => {
  res.json("kaleab");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserDocs = await User.create({
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(UserDocs);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      // If user is not found, return a 400 Bad Request response
      return res.status(400).json("User not found");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      // If passwords match, generate JWT token
      jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          // If error occurs during token generation, handle it
          console.error("Error generating JWT token:", err);
          return res.status(500).json("Internal server error");
        }

        // Set token in cookie and send success response
        res.cookie("token", token).json({ id: userDoc.id, email });
      });
    } else {
      // If passwords don't match, return a 401 Unauthorized response
      return res.status(401).json("Wrong credentials");
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("An error occurred during login:", error);
    // Send an appropriate error response to the client
    res.status(500).json("Internal server error");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const { title, content, expertise } = req.body;
    const PostDoc = await Post.create({
      title,
      content,
      expertise,
      author: info.id,
    });
    res.json(PostDoc);
  });
});

app.put("/post", async (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, secret);

    const { id, title, content, expertise } = req.body;

    // Validate input data
    if (!id || !title || !content || !expertise) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find the post by ID and author
    const postDoc = await Post.findOneAndUpdate(
      { _id: id, author: decoded.id },
      { title, content, expertise },
      { new: true }
    );

    if (!postDoc) {
      return res
        .status(404)
        .json({ error: "Post not found or you are not the author" });
    }

    res.json(postDoc);
  } catch (error) {
    console.error("Error updating post:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token or token expired" });
    }
    res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  }
});

app.delete("/post/:id", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const postId = req.params.id;

    try {
      const postDoc = await Post.findOneAndDelete({
        _id: postId,
        author: info.id, // Ensuring the user is the author of the post
      });

      if (!postDoc) {
        return res.status(404).json("Post not found or you are not the author");
      }

      res.json(postDoc);
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["email"])
      .sort({ createdAt: -1 })
      .limit(30)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["email"]);
  res.json(postDoc);
});

//create a new comment
app.post("/comment", async (req, res) => {
  try {
    const { postId, comment, email } = req.body;

    const commentDoc = new Comment({ postId, comment, author: email });
    const savedComment = await commentDoc.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all comments
app.get("/comment/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ error: "Invalid JSON" });
  } else {
    next();
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
