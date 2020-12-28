const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "Post_Created") {
    posts[data.id] = {
      id: data.id,
      posts: data.title,
      comments: [],
    };
  }
  if (type === "Comment_Created") {
    const { id, content, postId } = data;
    posts[postId].comments.push({
      id,
      content,
    });
  }

  res.status(200).send({ message: "ok" });
});

app.listen("4002", () => {
  console.log("Listening on port 4002...");
});
