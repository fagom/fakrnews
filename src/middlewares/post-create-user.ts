import express from "express";
import mongoose from "mongoose";
const UserModel = mongoose.model("Fkn_user_details");
import { ErrorClass } from "../common/base-error-class";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
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

  const user = await UserModel.findOne({ emailid: emailid });

  if (user) {
    const errinstance = new ErrorClass(
      "ExistingUser",
      400,
      "EmailID already exists"
    );
    res.status(400).send(errinstance.parseMessage());
  } else {
    const newUser = new UserModel({
      fullname,
      firstname,
      surname,
      emailid,
      googleid,
      profilePic,
    });
    try {
      await newUser.save();

      res.status(200).send({
        _id: newUser.get("_id"),
        fullname: newUser.get("fullname"),
        firstname: newUser.get("firstname"),
        surname: newUser.get("surname"),
        profilePic: newUser.get("profilePic"),
        firsttimelogin: newUser.get("firsttimelogin"),
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
