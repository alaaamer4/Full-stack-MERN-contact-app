const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Contact, validateContact } = require("../models/Contact");
const { User } = require("../models/User");

//* @route    GET api/contacts/
//* @desc     get all contacts (only that user contact)
//* @access  private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      err: "server error",
    });
  }
});
//* @route    POST api/contacts/
//* @desc     create new contact
//* @access  private
router.post("/", auth, async (req, res) => {
  const result = validateContact(req.body);
  if (result.error) {
    return res.status(400).json({
      success: false,
      err: result.error.details.map((m) => m.message),
    });
  }
  try {
    const { name, phone, email, type } = req.body;
    const contact = new Contact({
      user: req.user.id,
      name,
      phone,
      email,
      type,
    });
    await contact.save();
    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      err: "server error",
    });
  }
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
