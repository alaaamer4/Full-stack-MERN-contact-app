const mongoose = require("mongoose");
const joi = require("joi");

const contactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

const validateContact = (contact) => {
  const schema = {
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string(),
    type: joi.string(),
  };
  const result = joi.validate(contact, schema);
  return result;
};

module.exports.validateContact = validateContact;
module.exports.Contact = Contact;
