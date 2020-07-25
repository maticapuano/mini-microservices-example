const express = require("express");
const uuid = require("uuid").v4;
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }));

const POSTS = {};

app.get("/posts", (req, res) => {
  res.json(POSTS);
});

app.post("/posts", (req, res) => {
  const id = uuid();
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: true,
      message: "Title is requerid",
    });
  }

  POSTS[id] = {
    id,
    title,
  };

  return res.status(201).json({
    id,
    title,
  });
});

app.listen(4000, () => {
  console.log(`Server ready on 4000`);
});
