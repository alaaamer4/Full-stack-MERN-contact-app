const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", userSchema);

const validate = (user) => {
  const schema = {
    name: joi.string().required(),
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    password: joi.string().min(6).max(819).required(),
  };

  const result = joi.validate(user, schema);
  return result;
};
const validateLoggin = (user) => {
  const schema = {
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    password: joi.string().min(6).max(819).required(),
  };

  const result = joi.validate(user, schema);
  return result;
};

module.exports.validate = validate;
module.exports.validateLoggin = validateLoggin;
module.exports.User = User;
