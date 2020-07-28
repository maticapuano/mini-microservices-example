const express = require("express");
const app = express();
const axios = require("axios").default;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  await axios.post("http://localhost:4000/events", event);
  await axios.post("http://localhost:4001/events", event);
  await axios.post("http://localhost:4002/events", event);
  await axios.post("http://localhost:4003/events", event);

  return res.json({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.listen(5002, () => console.log("Server ready on port 5002"));
