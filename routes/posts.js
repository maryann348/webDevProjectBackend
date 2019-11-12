const express = require("express");
const router = express.Router();
const Post = require("../models/PostSchema");

//gets all posts from the database
router.get("/", async (request, response) => {
  try {
    const posts = await Post.find();
    response.json(posts);
  } catch (error) {
    response.json({ message: error });
  }
});

//Gets a specific post using an id
router.get("/:postID", async (request, response) => {
  try {
    const post = await Post.findById(request.params.postID);
    response.json(post);
  } catch (error) {
    response.json({ message: error });
  }
});

//Saves a new post
router.post("/", async (request, response) => {
  const post = new Post({
    title: request.body.title,
    description: request.body.description
  });

  try {
    const savePost = await post.save();
    response.json(savePost);
  } catch (error) {
    response.json({ message: error });
  }
});

//deletes a post
router.delete("/:postID", async (request, response) => {
  try {
    const post = await Post.remove({ _id: request.params.postID });
    response.json(post);
  } catch (error) {
    response.json({ message: error });
  }
});

//updates the title of a post
router.patch("/:postID", async (request, response) => {
  try {
    const post = await Post.updateOne(
      { _id: request.params.postID },
      { $set: { title: request.body.title } }
    );
    response.json(post);
  } catch (error) {
    response.json({ message: error });
  }
});

module.exports = router;
