const express = require("express");
const axios = require("axios");
const { json } = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(json());

app.post("/events", (req, res) => {});

app.listen(4003, () => {
  console.log("Server ready on port 4003");
});
