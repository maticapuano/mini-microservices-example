const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }));

const posts = {};

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "post.created") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "comment.created") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === "comment.updated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }

  console.log(posts);

  res.json({});
});

app.listen(4002, () => {
  console.log("Server ready on 4002");
});
