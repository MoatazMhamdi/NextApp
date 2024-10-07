const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorLogger } = require("../helpers/logger");
exports.signup = async (req, res) => {
  let newUser = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    surname : req.body.surname,
    phone_nbr : req.body.phone_nbr,
    dateNaissance : req.body.dateNaissance,
    adress : req.body.adress
});

  User.getUserByEmail(newUser.email, (err, user) => {
    if (err) {
      errorLogger.error(err);
      return res
        .status(422)
        .json({ success: false, msg: "Something went wrong." });
    }
    if (user) {
      return res.status(422).json({
        success: false,
        msg: "Email has already been registered with us.",
      });
    }

    User.addUser(newUser, (err) => {
      if (err) {
        errorLogger.error(err);
        return res.status(422).json({
          success: false,
          msg: "Something went wrong.",
        });
      }
      res.status(200).json({
        success: true,
        msg: "User registered successfully.",
      });
    });
  });
};


exports.login = async (req, res, next) => {
  const email = req.body.email;

  User.getUserByEmail(email, (err, emailUser) => {
    if (err) {
      errorLogger.error(err);
      return res
        .status(422)
        .json({ success: false, msg: "Something went wrong." });
    }
    if (!emailUser) {
      return res
        .status(422)
        .json({ success: false, msg: "Invalid credentials." });
    }
    let finalUser = emailUser;
    // User.comparePassword(password, finalUser.password, (err, isMatch) => {
    //   if (err) {
    //     errorLogger.error(err);
    //     return res
    //       .status(422)
    //       .json({ success: false, msg: "Something went wrong." });
    //   }
    //   if (!isMatch) {
    //     return res
    //       .status(422)
    //       .json({ success: false, msg: "Invalid credentials." });
    //   }

      const token = jwt.sign(
        { data: finalUser._id },
        process.env.JWT_SECRET,
        {}
      );
      res.status(200).json({
        msg: "Logged in Successfully.",
        success: true,
        token: token,
        user: {
          id: finalUser._id,
          token,
          email: finalUser.email,
          name: finalUser.name,
          surname: finalUser.surname,
          phone_nbr: finalUser.phone_nbr,
          dateNaissance: finalUser.dateNaissance,
          adress : finalUser.adress
        },
      });
    });
  
};

exports.profile = async (req, res) => {
  const userId = req.userId; // Get user ID from the request object
  User.getUserById(userId, (err, user) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({
          success: false,
          msg: "An error occurred while fetching the profile.",
        });
    }
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ success: false, msg: "User not found." });
    }
    
      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          phone_nbr: user.phone_nbr,
          dateNaissance: user.dateNaissance,
          adress: user.adress,
        
      }}
    );
    
  });
};
exports.getAll = async (req, res, next) => {
  try {
    const Users = await User.find().exec();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};


exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const { email, name, phone_nbr,dateNaissance, address } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.email = email;
    user.name = name;
    user.phone_nbr = phone_nbr;
    user.dateNaissance = dateNaissance;
    user.address = address;

    const updateUser = await user.save();

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
    try {
      const ownerId = req.params.id;
      const owner = await Owner.findById(ownerId);
      
      if (!owner) {
        return res.status(404).json({ message: 'Owner not found' });
      }
      
      res.status(200).json(owner);
    } catch (error) {
      console.error('Error fetching owner by ID:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  