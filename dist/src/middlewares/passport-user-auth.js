"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require("mongoose");
const passportauth = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../../config/keys");
const FNUser = mongoose.model("Fkn_user_details");
//#1B5E20
//#3E2723
//#b71c1c
//#3F51B5
passportauth.serializeUser((user, done) => {
    done(null, user.id);
});
passportauth.deserializeUser((id, done) => {
    FNUser.findById(id).then((user) => {
        done(null, user);
    });
});
passportauth.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log("profile", profile._json);
    const ExistingUser = yield FNUser.findOne({ googleid: profile.id });
    if (ExistingUser) {
        done(null, ExistingUser);
    }
    else {
        yield new FNUser({
            googleid: profile.id,
            fullname: profile._json.name,
            firstname: profile._json.given_name,
            surname: profile._json.family_name,
            emailid: profile._json.email,
            profilePic: profile._json.picture,
            lasloginDate: Date(),
        })
            .save()
            .then((user) => done(null, user));
    }
})));
