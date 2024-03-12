const express = require("express");
const router = express.Router();
const Game = require("../../model/Game");
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
  auth,
  roleCheck,
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("imageUrl", "Image URL is required").not().isEmpty(),
    check("releaseDate", "Release date is required").isISO8601(),
    check("genre", "Genre is required").not().isEmpty(),
    check("platform", "Platform is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, imageUrl, releaseDate, genre, platform } =
        req.body;

      const game = new Game({
        title,
        description,
        imageUrl,
        releaseDate,
        genre,
        platform,
      });

      await game.save();

      res.json(game);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
