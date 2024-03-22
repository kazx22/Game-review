const express = require("express");
const router = express.Router();
const Game = require("../../model/Game");
// const Comment = require("../models/Comment");
const auth = require("../../middlewares/auth");
const roleCheck = require("../../middlewares/roleCheck");
const { check, validationResult } = require("express-validator");

// router.get("/", async (req, res) => {
//   try {
//     const games = await Game.find();
//     res.json(games);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("imageUrl", "Image URL is required").not().isEmpty(),
    check("releaseDate", "Release date is required").isISO8601(),
    check("genre", "Genre is required").not().isEmpty(),
    check("platform", "Platform is required").not().isEmpty(),
    check("rating", "Rating is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        title,
        description,
        imageUrl,
        releaseDate,
        genre,
        platform,
        rating,
      } = req.body;

      const game = new Game({
        title,
        description,
        imageUrl,
        releaseDate,
        genre,
        platform,
        rating,
      });

      await game.save();

      res.json(game);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
router.post("/:gameId/reviews", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const { title, rating, username, description } = req.body;

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    game.reviews.push({ title, rating, username, description });

    await game.save();

    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:gameId/reviews/:reviewId/comments", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    const { username, content } = req.body;

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const review = game.reviews.id(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.comments.push({ username, content, timestamp: new Date() });

    await review.save();
    await game.save();

    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:gameId", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:gameId/reviews", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(game.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:gameId/reviews/:reviewId", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const review = game.reviews.find(
      (review) => review._id.toString() === reviewId
    );

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:gameId/reviews/:reviewId", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const reviewIndex = game.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Review not found" });
    }

    game.reviews.splice(reviewIndex, 1);
    await game.save();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:gameId/reviews/:reviewId/comments", async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const review = game.reviews.id(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(review.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
