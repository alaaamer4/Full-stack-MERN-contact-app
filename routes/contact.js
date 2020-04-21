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
// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ success: false, err: "not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, err: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json({ success: true, data: contact });
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ success: false, err: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, err: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ success: true, data: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, err: "server error" });
  }
});

module.exports = router;
