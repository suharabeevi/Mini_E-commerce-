const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const passwordcomplexity = require("joi-password-complexity");
const Joi = require("joi");
const Userschema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

Userschema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
  return token;
};
const User = mongoose.model("user", Userschema);
const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("username"),
    email: Joi.string().required().label("email"),
    password: passwordcomplexity().required().label("password"),
  });

  return schema.validate(data);
};
const Loginvalidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("password"),
    
  });

  return schema.validate(data);
};
module.exports = { User, validate, Loginvalidate };
