const mongoose = require("mongoose");
const modSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

module.exports = Mods = mongoose.model("Mods", modSchema);
