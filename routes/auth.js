const express = require("express");
const router = express.Router();

//* @route    GET api/auth/
//* @desc     get logged in user
//* @access  private
router.post("/", (req, res) => {
  res.status(200).json({ success: true });
});

//* @route    POST  api/auth/
//* @desc     auth user && get token
//* @access  public
router.post("/", (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = router;
