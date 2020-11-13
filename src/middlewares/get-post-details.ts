import express from "express";
import mongoose from "mongoose";
const PostModel = mongoose.model("Fkn_Posts_detail");
import { ErrorClass } from "../common/base-error-class";
const router = express.Router();

router.get("/:id", async (req, res) => {
  const _id = req.params.id;

  const existingPost = await PostModel.findOne({ _id: _id, poststatus: "A" });
  if (!existingPost) {
    const errinstance = new ErrorClass("PostNotFound", 404, "Page Not Found");
    res.status(404).send(errinstance.parseMessage());
  } else {
    res.status(200).send({
      posttitle: existingPost.get("posttitle"),
      postcreateddate: existingPost.get("postcreateddate"),
      _user: existingPost.get("_user"),
      fullname: existingPost.get("fullname"),
      firstname: existingPost.get("firstname"),
      surname: existingPost.get("surname"),
      profilePic: existingPost.get("profilePic"),
      userbio: existingPost.get("userbio"),
      username: existingPost.get("username"),
      userIconColor: existingPost.get("userIconColor"),
    });
  }
});

module.exports = router;
