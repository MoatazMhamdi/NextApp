const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log('JWT Payload:', jwt_payload); // Add this line to log the payload
      User.getUserById(jwt_payload.data, (err, user) => { // Corrected here
        if (err) {
          console.log('error:', err)
          return done(err, false);
        }
        if (user) {
          console.log('User found:', user) // Corrected here
          return done(null, user);
        } else {
          console.log('No user found! ')
          return done(null, false);
        }
      });
    })
  );
};
