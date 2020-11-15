import express from "express";
import mongoose from "mongoose";
const VoteModel = mongoose.model("Fkn_vote_details");
import { ErrorClass } from "../common/base-error-class";

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.post("/", async (req, res) => {
  const { _post, _user, votevalue } = req.body;

  const existingVote = await VoteModel.findOne({
    _post: ObjectId(_post),
    _user: ObjectId(_user),
  });

  if (existingVote) {
    existingVote.set("votevalue", votevalue);
    existingVote.set("modifeddate", new Date());
    existingVote.set("__v", existingVote.get("__v") + 1);
    existingVote.save();
    res.status(200).send(existingVote);
  } else {
    const errinstance = new ErrorClass(
      "VoteNotExists",
      500,
      "Oops, something went wrong. Refresh and try again."
    );
    res.status(500).send(errinstance.parseMessage());
  }
});

module.exports = router;
