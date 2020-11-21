import express from "express";
import mongoose from "mongoose";
const PostModel = mongoose.model("Fkn_Posts_detail");
import { ErrorClass } from "../common/base-error-class";

const router = express.Router();

router.post("/", async (req, res) => {
  const { _id } = req.body;

  const existingPost = await PostModel.findOne({ _id: _id, poststatus: "A" });

  if (!existingPost) {
    const errinstance = new ErrorClass("PostNotFound", 404, "Page Not Found");
    res.status(404).send(errinstance.parseMessage());
  } else {
    try {
      existingPost.set("poststatus", "D");
      existingPost.set("__v", existingPost.get("__v") + 1);
      existingPost.save();
      res.status(200).send({ data: "data deleted successfully" });
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
