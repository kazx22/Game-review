const mongoose = require("mongoose");
const Comment = require("./Comment");

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  platform: { type: String, required: true },
  rating: { type: String, required: true, min: 0, max: 5 },
  comments: [Comment.schema],
});

module.exports = mongoose.model("game", gameSchema);
