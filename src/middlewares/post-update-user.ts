import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const UserModel = mongoose.model("Fkn_user_details");
import { ErrorClass } from "../common/base-error-class";

router.post("/", async (req, res) => {
  const {
    _id,
    fullname,
    firstname,
    surname,
    emailid,
    googleid,
    profilePic,
  } = req.body;

  if (!emailid || !fullname || !firstname || !surname || !googleid) {
    const errinstance = new ErrorClass("BadData", 400, "Invalid Data provided");
    res.status(400).send(errinstance.parseMessage());
  }

  const user = await UserModel.findById(_id);

  if (!user) {
    const errinstance = new ErrorClass(
      "UserNotFound",
      400,
      "EmailID doesnot exist"
    );
    res.status(400).send(errinstance.parseMessage());
  } else {
    const existingUser = new UserModel({
      fullname,
      firstname,
      surname,
      emailid,
      googleid,
      profilePic,
    });
    try {
      existingUser.set("__v", existingUser.get("__v") + 1);
      await existingUser.save();

      res.status(200).send({
        _id: existingUser.get("_id"),
        fullname: existingUser.get("fullname"),
        firstname: existingUser.get("firstname"),
        surname: existingUser.get("surname"),
        profilePic: existingUser.get("profilePic"),
        firsttimelogin: existingUser.get("firsttimelogin"),
      });
    } catch (e) {
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
