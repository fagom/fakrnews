import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./src/models/Post");
require("./src/models/user");
require("./src/models/Vote");
require("./src/middlewares/passport-user-auth");

const UserRoute = require("./src/routes/user-route");
const PostRoute = require("./src/routes/post-route");
const VoteRoute = require("./src/routes/vote-route");
const PassportAuthRoute = require("./src/common/passport-auth-route");

try {
  mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  throw error;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

PassportAuthRoute(app);

app.use(UserRoute);
app.use(PostRoute);
app.use(VoteRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server API App listening on Port ${PORT}`));
