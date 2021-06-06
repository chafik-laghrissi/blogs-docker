const express = require("express");
const bodyParser = require("body-parser");
const { v4 } = require("uuid");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const commentsByPostId = {};
app
  .route("/posts/:id/comments")
  .get((req, res) => {
    const { id } = req.params;
    res.status(200).json(commentsByPostId[id] || []);
  })
  .post(async (req, res) => {
    const { content } = req.body;
    const { id: postId } = req.params;
    const commentId = v4();
    const comments = commentsByPostId[postId] || [];
    commentsByPostId[postId] = [
      ...comments,
      { id: commentId, content, status: "pending" },
    ];
    await axios.post("http://event-bus-srv:4005/events", {
      type: "commentCreated",
      data: {
        id: commentId,
        content,
        postId,
        status: "pending",
      },
    });
    res.status(201).json(commentsByPostId[postId]);
  });
app.post("/events", async (req, res) => {
  console.log("Event received:", req.body.type);
  const { type, data } = req.body;

  if (type === "commentModerated") {
    const { postId, id, content, status } = data;
    const comment = commentsByPostId[postId].find(
      (comment) => comment.id === id
    );
    comment.status = status;
    const response = await axios.post("http://event-bus-srv:4005/events", {
      type: "commentUpdated",
      data: {
        postId,
        id,
        content,
        status,
      },
    });
    console.log(response.status);
  }
  res.json({});
});
app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
