const express = require("express");
const uuid = require("uuid").v4;
const cors = require("cors");
const axios = require("axios").default;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: "*" }));

const POSTS = {};

app.get("/posts", (req, res) => {
  res.json(POSTS);
});

app.post("/posts/create", async (req, res) => {
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

  await axios.post("http://event-srv:5002/events", {
    type: "post.created",
    data: {
      id,
      title,
    },
  });

  return res.status(201).json({
    id,
    title,
  });
});

app.post("/events", (req, res) => {
  console.log("Event received >> ", req.body.type);

  res.json({});
});

app.listen(4000, () => {
  console.log(`Server ready on 4000`);
});
