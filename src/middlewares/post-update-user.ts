import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const UserModel = mongoose.model("Fkn_user_details");
import { ErrorClass } from "../common/base-error-class";

router.post("/", async (req, res) => {
  console.log("update");
  const {
    _id,
    fullname,
    firstname,
    surname,
    emailid,
    profilePic,
    username,
    userIconColor,
    firsttimelogin,
  } = req.body;

  if (!emailid || !fullname || !firstname || !surname) {
    const errinstance = new ErrorClass("BadData", 400, "Invalid Data provided");
    res.status(400).send(errinstance.parseMessage());
  }

  const user = await UserModel.findById(_id);

  if (!user) {
    const errinstance = new ErrorClass(
      "UserNotFound",
      404,
      "user doesnot exist"
    );
    res.status(404).send(errinstance.parseMessage());
  } else {
    try {
      user.set("fullname", fullname);
      user.set("firstname", firstname);
      user.set("surname", surname);
      user.set("emailid", emailid);
      user.set("profilePic", profilePic);
      user.set("username", username);
      user.set("userIconColor", userIconColor);
      user.set("firsttimelogin", firsttimelogin);

      let version = user.get("__v");
      user.set("__v", version + 1);

      await user.save();

      res.status(200).send({
        _id: user.get("_id"),
        fullname: user.get("fullname"),
        firstname: user.get("firstname"),
        surname: user.get("surname"),
        profilePic: user.get("profilePic"),
        firsttimelogin: user.get("firsttimelogin"),
        username: user.get("username"),
        userIconColor: user.get("userIconColor"),
      });
    } catch (e) {
      console.log(e);
      const errinstance = new ErrorClass(
        "ServerError",
        500,
        "Oops something went wrong. Try again later"
      );
      res.status(500).send(errinstance.parseMessage());
    }
  }
});

module.exports = router;
