const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
router.get("/", (req, res) => res.send("USER ROUTE")); /// TEST

router.post(
  "/",
  [
    check("name", "Name is not required").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Please enter a password of min 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      const { username, name, email, password, dob, role } = req.body;

      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already exist" }] });
      }
      user = new User({
        username,
        name,
        email,
        password,
        dob,
        role,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
