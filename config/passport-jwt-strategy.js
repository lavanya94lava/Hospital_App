const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: "hospital",
  };
  
  console.log('reaching here');
  passport.use(
    new JWTStrategy(opts, function (jwtPayload, done) {
      console.log("jwtFromRequest-->", jwtFromRequest);
      Doctor.findById(jwtPayload._id, function (err, doctor) {
        if (err) {
          console.log("error in finding the doctor");
          return;
        }
        if (doctor) {
          console.log("jwtPayload._id -->",jwtPayload._id);
          return done(null, doctor);
        } else {
          return done(null, false);
        }
      });
    })
  );
  module.exports = passport;