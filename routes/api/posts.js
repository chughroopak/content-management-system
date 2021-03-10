const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validatePostInput = require("../../validation/post");

//model
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// @route GET api/posts/
// @desc Get posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json("No Posts found."));
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No Post found with that id" })
    );
});

// @route POST api/posts
// @desc create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newPost.save().then((post) => res.json(post));
  }
);

// @route   Delete api/posts/:id
// @desc    delete post by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then((u) => {
      Post.findById(req.params.id).then((post) => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        // Delete
        post
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch((err) =>
            res.status(404).json({ postnotfound: "No post found for this id" })
          );
      });
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    like post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then((u) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadLiked: "User already liked this post" });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ nopostfound: "Post not found" })
        );
    });
  }
);

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then((u) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          const removeIndex = post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ nopostfound: "Post not found" })
        );
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    add comment
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        //add to comments array
        post.comments.unshift(newComment);
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) => console.log(err));
      })
      .catch((err) => res.status(404).json({ nopostfound: "Post not found" }));
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    remove comment from post
// @access  Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment doesnot exist" });
        }

        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        post.save().then((post) => res.json(post));
      })
      .catch((err) =>
        res.status(404).json({ nopostfound: "Post not found", err })
      );
  }
);

module.exports = router;
