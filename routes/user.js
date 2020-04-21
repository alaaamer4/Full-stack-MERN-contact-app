const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//* @route    POST api/users/
//* @desc     register user
//* @access  public
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).json({
      success: false,
      err: result.error.details[0].message,
    });
  }
  try {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        err: "user already exists",
      });
    }
    user = new User({
      name,
      password,
      email,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      id: user.id,
    };
    jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
      if (err) {
        throw err;
      }
      res.status(200).json({
        success: true,
        token: token,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: "server error",
    });
  }
});

module.exports = router;
