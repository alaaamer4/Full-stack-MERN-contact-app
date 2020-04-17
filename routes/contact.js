const express = require("express");
const router = express.Router();

//* @route    GET api/contacts/
//* @desc     get all contacts (only that user contact)
//* @access  private
router.get("/", (req, res) => {
  res.status(200).json({ success: true });
});
//* @route    POST api/contacts/
//* @desc     create new contact
//* @access  private
router.post("/", (req, res) => {
  res.status(200).json({ success: true });
});
//* @route    PUT api/contacts/:id
//* @desc     update contact
//* @access  private
router.put("/:id", (req, res) => {
  res.status(200).json({ success: true });
});
//* @route    DELETE api/contacts/:id
//* @desc     delete contact
//* @access  private
router.delete("/:id", (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = router;
