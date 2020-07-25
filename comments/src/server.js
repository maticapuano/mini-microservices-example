const express = require("express");
const uuid = require("uuid").v4;
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }));

const commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = uuid();
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      error: true,
      message: "content is requerid",
    });
  }

  const comments = commentByPostId[id] || [];

  comments.push({ id: commentId, content });

  commentByPostId[id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Server ready on 4001");
});
