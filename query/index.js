const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const posts = {};
const app = express();
app.use(bodyParser.json());
app.use(cors());
const handleEvent = (type, data) => {
  if (type === "postCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === "commentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  } else if (type === "commentUpdated") {
    const { id, content, postId, status } = data;
    const comment = posts[postId].comments.find((comment) => comment.id === id);
    comment.content = content;
    comment.status = status;
  }
};
app.get("/posts", (req, res) => {
  res.json(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  return res.json({ data });
});

app.listen(4002, async () => {
  console.log("Server is running on port 4002");
  const response = await axios.get("http://localhost:4005/events");
  for(let event of response.data.events){
    console.log("possessing ",event.type);
    handleEvent(event.type,event.data);
  }
});
