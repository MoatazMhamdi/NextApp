const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    default: false,
  },
  phone_nbr: {
    type: Number,
    required: false,
  },
  dateNaissance: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
});

// Export the model
const User = model("User", userSchema);
module.exports = User;

// Functions to interact with user
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
  User.findOne({ email }, callback);
};

module.exports.addUser = function (newUser, callback) {
  newUser.save(callback); // Directly save without password handling
};
