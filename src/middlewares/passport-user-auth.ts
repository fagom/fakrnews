const mongoose = require("mongoose");
const passportauth = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../../config/keys");

const FNUser = mongoose.model("Fkn_user_details");
//#1B5E20
//#3E2723
//#b71c1c
//#3F51B5

passportauth.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passportauth.deserializeUser((id: any, done: any) => {
  FNUser.findById(id).then((user: any) => {
    done(null, user);
  });
});

passportauth.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      //console.log("profile", profile._json);

      const ExistingUser = await FNUser.findOne({ googleid: profile.id });

      if (ExistingUser) {
        done(null, ExistingUser);
      } else {
        await new FNUser({
          googleid: profile.id,
          fullname: profile._json.name,
          firstname: profile._json.given_name,
          surname: profile._json.family_name,
          emailid: profile._json.email,
          profilePic: profile._json.picture,
          lasloginDate: Date(),
        })
          .save()
          .then((user: any) => done(null, user));
      }
    }
  )
);
