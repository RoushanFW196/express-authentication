const express = require("express");

const Post = require("../models/post.model");

const authenticate = require("../middlewares/authenticate");
//const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post(
  "/",
  authenticate,
 
  async (req, res) => {
    try {
    

     const create_post = await Post.create({
        title: req.body.title,
        body: req.body.body,
      
        user_id: req.body.user_id,
      });
    //  const create_post = await Post.create(req.body);

      return res.status(201).json({ create_post });
    } catch (e) {
      return res.status(500).json({ status: "failed to create post", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const getallpost = await Post.find().lean().exec();

  return res.send(getallpost);
});

module.exports = router;
