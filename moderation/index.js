const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.post("/events", async (req, res) => {
  const { data, type } = req.body;
  if (type === "commentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    const response = await axios.post("http://event-bus-srv:4005/events", {
      type: "commentModerated",
      data: {
        ...data,
        status,
      },
    });
    console.log(response.status);
  }

  res.json({});
});

app.listen(4003, () => {
  console.log("Server is running on port 4003");
});
