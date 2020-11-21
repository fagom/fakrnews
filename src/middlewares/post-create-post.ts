import express from "express";
import mongoose from "mongoose";
const PostModel = mongoose.model("Fkn_Posts_detail");
import { ErrorClass } from "../common/base-error-class";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    posttitle,
    _user,
    fullname,
    firstname,
    surname,
    profilePic,
    userbio,
    username,
    userIconColor,
  } = req.body;

  const newpost = new PostModel({
    posttitle,
    _user,
    fullname,
    firstname,
    surname,
    profilePic,
    userbio,
    username,
    userIconColor,
    postcreateddate: new Date(),
    postmodifeddate: new Date(),
  });
  try {
    newpost.save();

    res.status(200).send({
      _id: newpost.get("_id"),
      posttitle: newpost.get("posttitle"),
      postcreateddate: newpost.get("postcreateddate"),
      _user: newpost.get("_user"),
      fullname: newpost.get("fullname"),
      firstname: newpost.get("firstname"),
      surname: newpost.get("surname"),
      profilePic: newpost.get("profilePic"),
      userbio: newpost.get("userbio"),
      username: newpost.get("username"),
      userIconColor: newpost.get("userIconColor"),
    });
  } catch (e) {
    const errinstance = new ErrorClass(
      "ServerError",
      500,
      "Oops something went wrong. Try again later"
    );
    res.status(500).send(errinstance.parseMessage());
  }
});

module.exports = router;
