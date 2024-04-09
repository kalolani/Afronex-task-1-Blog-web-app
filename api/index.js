import express from "express";
import cors from "cors";
import User from "./models/user.js";
import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(10);
const secret = "dkjfbvdkfjbvdkfjbvkdfvbdkfvb";

await mongoose.connect(
  "mongodb+srv://kaleab:kal_olani7@cluster0.bi7hd3m.mongodb.net/?retryWrites=true&w=majority"
);

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
  const userDoc = await User.findOne({ email });

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    //login
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;

      res.cookie("token", token).json({
        id: userDoc._id,
        email,
      });
    });
  } else {
    res.status(400).json("wrong credintials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(ok);
});

app.post("/post", async (req, res) => {
  const { title, content, author, expertise } = req.body;

  const PostDocs = await Post.create({
    title,
    content,
    author,
    expertise,
  });
  res.json(PostDocs);
});

app.listen(4000);
//7f1Vw6DTNsn89cbG
