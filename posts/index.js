const express = require("express");
const bodyParser = require("body-parser");
const { v4 } = require("uuid");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};
app
  .route("/posts")
  .get((req, res) => {
    res.status(200).json(posts);
  })
  .post(async (req, res) => {
    const { title } = req.body;
    const id = v4();
    posts[id] = { id, title };
    await axios.post("http://event-bus-srv:4005/events", {
      type: "postCreated",
      data: {
        id,
        title,
      },
    });
    res.status(201).json(posts[id]);
  });
app.post("/events", (req, res) => {
  console.log("Event received:", req.body.type);
  res.json({});
});
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
