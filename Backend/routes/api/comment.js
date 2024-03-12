const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middlewares/auth");
const Comment = require("../../model/Comment");
const Game = require("../../model/Game");

router.post(
  "/",
  auth,
  [check("content", "Comment content is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userid, gameid, content } = req.body;

      const game = await Game.findById(gameid);
      if (!game) {
        return res.status(404).json({ msg: "Game not found" });
      }

      const comment = new Comment({
        userid,
        gameid,
        content,
      });

      await comment.save();

      game.comments.push(comment);
      await game.save();

      res.json(comment);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/:gameid", async (req, res) => {
  try {
    const gameid = req.params.gameid;

    const game = await Game.findById(gameid);
    if (!game) {
      return res.status(404).json({ msg: "Game not found" });
    }
    await game
      .populate({
        path: "comments",
        populate: {
          path: "replies.userid",
        },
      })
      .execPopulate();

    res.json(game.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//  Comment replies
router.post(
  "/:commentId/reply",
  auth,
  [check("content", "Reply content is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { content } = req.body;
      const commentId = req.params.commentId;
      const userid = req.user.id;

      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }

      const reply = {
        userid,
        content,
        timestamp: Date.now(),
      };

      comment.replies.push(reply);
      await comment.save();

      res.json(reply);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
