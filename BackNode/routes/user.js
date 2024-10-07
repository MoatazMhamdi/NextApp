const express = require("express");
const router = express.Router();
const passport = require("passport");
const extractUserId = require("../middleware/auth");
const params_validator = require("../helpers/params-validator");
const Joi = require("joi");
const User = require("../controllers/user");
const { getById } = require('../controllers/user'); // Adjust the path according to your project structure

// User Signup
router.post(
  "/signup",   
  User.signup,
  params_validator.validateParams({
    email: Joi.string()
      .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      .required(),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&(=)<>.,/])[A-Za-z\d@$!%*#?&(=)<>.,/]{6,}$/)
      .max(20)
      .required(),
    firstName: Joi.string().min(2).max(40).required(),
  })
);


// User Login
router.post(
  "/login",   
  User.login,
  params_validator.validateParams({
    email: Joi.string().min(8).max(40).required(),
   
  })
);

// User Profile
router.get(
  "/profile",
  passport.authenticate('jwt', { session: false }),
  extractUserId,
  User.profile
);

// ******************************** Vet **************************
router.get(
  "/All",
  User.getAll
);

router.put(
  "/edit/:id",
  
  User.updateUser
);

router.get('/:id', getById);


// Update Password
router.post(
  "/update-password",
  params_validator.validateParams({
    email: Joi.string().max(20).required(),
    currentPassword: Joi.string().max(20).required(),
    newPassword: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&(=)<>.,/])[A-Za-z\d@$!%*#?&(=)<>.,/]{6,}$/)
      .max(20)
      .required(),
    newConfirmPassword: Joi.string().max(20).required(),
  })
);

module.exports = router;
