const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
router.get("/", (req, res) => res.send("USER ROUTE"));

router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password of at least 8 characters"
    ).isLength({ min: 8 }),
    check("dob", "Please provide a valid date of birth").isISO8601(),
    check(
      "location",
      "Location must be provided as an object with 'latitude' and 'longitude' properties"
    )
      .isObject()
      .withMessage("Location must be an object"),
    check("location.latitude", "Latitude must be a valid number").isFloat(),
    check("location.longitude", "Longitude must be a valid number").isFloat(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, name, email, password, dob, role, location } = req.body;

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
        location: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
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
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Duplicate key error" }] });
      }
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/login",
  [
    check("username", "Username is required").exists(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      if (user.role !== "mod") {
        return res
          .status(403)
          .json({ errors: [{ msg: "Unauthorized access" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
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

router.post(
  "/loginUser",
  [
    check("username", "Username is required").exists(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
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

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    let user = await User.findOne({ username });

    if (!user) res.status(404).send("User Not Found");

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.put("/:username", async (req, res) => {
  const { username } = req.params;
  const { name, dob, email, location } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (name) {
      user.name = name;
    }

    if (dob) {
      user.dob = new Date(dob);
    }
    if (email) {
      user.email = email;
    }
    if (location) {
      user.location = {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      };
    }

    await user.save();

    res
      .status(200)
      .json({ message: "User information updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
