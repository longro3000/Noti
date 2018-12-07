const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20').Stratergy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
     done(null, user.id);
});

passport.deserializeUser((id, done) => {
     User.findById(id).then(user => {
          done(null, user);
     });
});

passport.use(
     new GoogleStratergy(
          {
               callbackURL: '/auth/google/callback',
               clientID: keys.googleClientID,
               clientSecret: keys.googleClientSecret,
               proxy: true
          },
          async (accessToken, refreshToken, profile, done) => {
               try {
                    const existingUser = await User.findOne({ googleID: profile.id });
                    if (existingUser) {
                         done(null, existingUser);
                    }
                    const user = await new User( {
                         googleID: profile.id,
                         displayName: profile.displayName
                    }).save();
                    done(null, user);
               } catch (err) {
                    done(err, null);
               }
          }
     )
);