const express = require("express");
const axios = require("axios");
const { json } = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "comment.created") {
    const status = data.content.includes(["orange", "bad", "fuck"])
      ? "rejected"
      : "approved";

    await axios.post("http://localhost:5002/events", {
      type: "comments.moderated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
  res.json({});
});

app.listen(4003, () => {
  console.log("Server ready on port 4003");
});
