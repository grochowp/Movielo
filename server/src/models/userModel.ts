const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  firstName: {
    type: String,
    required: true,
    unique: false,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
    min: 2,
    max: 50,
  },
});

module.exports = mongoose.model("Users", userSchema);
