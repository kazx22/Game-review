const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const User = require("../../model/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [check("password", "Please enter a password of min 8 characters").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      const { username, email, password } = req.body;

      let user = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Wrong Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const secretKey = "mysecretkey";

      jwt.sign(payload, secretKey, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
