const mongoose = require("mongoose");
const Comment = require("./Comment");

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  platform: { type: String, required: true },
  comments: [Comment.schema],
});

module.exports = mongoose.model("game", gameSchema);
