const mongoose = require("mongoose");
const Comment = require("./Comment");

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  username: { type: String, required: true },
  description: { type: String, required: true },
  comments: [Comment.schema],
});

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  platform: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Game", gameSchema);
