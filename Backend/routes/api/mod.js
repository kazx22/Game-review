const express = require("express");
const router = express.Router();
const Mod = require("../../model/Mods");

router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    const mod = new Mod({
      username,
      email,
    });
    await mod.save();
    res.status(201).json(mod);
  } catch (error) {
    console.error("Error creating Mod:", error);
    res.status(500).json({ error: "An error occurred while creating Mod" });
  }
});

router.get("/", async (req, res) => {
  try {
    const mods = await Mod.find();
    res.json(mods);
  } catch (error) {
    console.error("Error fetching Mods:", error);
    res.status(500).json({ error: "An error occurred while fetching Mods" });
  }
});

router.delete("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const deletedMod = await Mod.findOneAndDelete({ username: username });
    if (!deletedMod) {
      return res.status(404).json({ error: "Mod not found" });
    }
    res.json(deletedMod);
  } catch (error) {
    console.error("Error deleting Mod:", error);
    res.status(500).json({ error: "An error occurred while deleting Mod" });
  }
});

module.exports = router;
