const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const events = [];
app.use(bodyParser.json());
app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  const response1=await axios.post("http://posts-clusterip-srv:4000/events", event);
  const response2=await axios.post("http://comments-srv:4001/events", event);
  const response3=await axios.post("http://moderation-srv:4003/events", event);
  const response4=await axios.post("http://query-srv:4002/events", event);
  console.log(1,response1.status);
  console.log(2,response2.status);
  console.log(3,response3.status);
  console.log(4,response4.status);
  res.status(200).json({ status: "OK" });
});
app.get("/events", (req, res) => {
  return res.json({events});
});
app.listen(4005, () => {
  console.log("Server is running on port 4005");
  console.log("test !");
});
