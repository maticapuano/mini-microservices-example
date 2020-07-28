const express = require("express");
const uuid = require("uuid").v4;
const cors = require("cors");
const axios = require("axios").default;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }));

const commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
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

  comments.push({ id: commentId, content, status: "pending" });

  commentByPostId[id] = comments;

  await axios.post("http://localhost:5002/events", {
    type: "comment.created",
    data: {
      id: commentId,
      content,
      postId: id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event received: >> ", req.body.type);

  const { type, data } = req.body;

  if (type === "comment.moderated") {
    const { postId, id, status } = data;

    const comments = commentByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios.post("http://localhost:5002/events", {
      type: "comment.updated",
      data: {
        id,
        status,
        postId,
        content: data.content,
      },
    });
  }

  res.json({});
});

app.listen(4001, () => {
  console.log("Server ready on 4001");
});
