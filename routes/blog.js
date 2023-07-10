const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/posts");
});

router.get("/posts", async (req, res) => {
  const [posts] = await db.query(
    "SELECT * FROM posts INNER JOIN authors ON posts.author_id = authors.id"
  );

  res.render("posts-list", {
    posts: posts,
  });
});

router.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  const [post] = await db.query(`SELECT * FROM posts WHERE id = ${id}`);

  res.render("post-detail", {
    post: post[0],
  });
});

router.get("/new-post", async (req, res) => {
  const [authors] = await db.query("SELECT * FROM authors");

  res.render("create-post", {
    authors: authors,
  });
});

router.post("/posts", async (req, res) => {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  //물음표는 전달된 배열에서 제공하는 값으로 자동 대체된다.
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    [data]
  );

  res.redirect("/posts");
});

module.exports = router;
