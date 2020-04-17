const express = require("express");
const router = express.Router();
const { User, validateLoggin } = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

//* @route    post api/auth/
//* @desc     auth user && get token
//* @access  public
router.post("/", async (req, res) => {
  const result = validateLoggin(req.body);
  if (result.error) {
    return res.status(400).json({
      success: false,
      err: result.error.details.map((d) => d.message),
    });
  }
  //? compare email
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        err: "invalid credentials",
      });
    }
    //? compare the password with the hashed pass
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        err: "invalid credentials",
      });
    }
    const payload = {
      id: user.id,
    };
    jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
      if (err) throw err;
      res.status(200).json({
        success: true,
        token: token,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, err: "server error" });
  }
});

//* @route    get  api/auth/
//* @desc     get logged in user
//* @access  private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      err: "server error",
    });
  }
});

module.exports = router;
