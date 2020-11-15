import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const UserModel = mongoose.model("Fkn_user_details");
import { ErrorClass } from "../common/base-error-class";

router.get("/:id", async (req, res) => {
  const _username = req.params.id;

  const user = await UserModel.findOne({
    username: _username,
    userstatus: "A",
  });

  if (user) {
    res.status(200).send({
      description: "Username Exists",
      // fullname: user.get("fullname"),
      // firstname: user.get("firstname"),
      // surname: user.get("surname"),
      // profilePic: user.get("profilePic"),
      // firsttimelogin: user.get("firsttimelogin"),
      // userbio: user.get("userbio"),
      // username: user.get("username"),
    });
  } else {
    const errinstance = new ErrorClass(
      "UserNotFound",
      204,
      "user doesnot exist"
    );
    res.status(204).send(errinstance.parseMessage());
  }
});

module.exports = router;
