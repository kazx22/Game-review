const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  reviewCount: { type: Number, default: 0 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  date: { type: Date, default: Date.now },
  role: { type: String, enum: ["user", "mod"], default: "user" },
  imageUrl: {
    type: String,
    default: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number] },
  },
});
userSchema.index({ location: "2dsphere" });
module.exports = User = mongoose.model("User", userSchema);
