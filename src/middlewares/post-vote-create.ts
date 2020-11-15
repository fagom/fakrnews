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
    const errinstance = new ErrorClass(
      "VoteExists",
      500,
      "Oops, you seem to have voted. Refresh and try again."
    );
    res.status(500).send(errinstance.parseMessage());
  } else {
    const newVote = new VoteModel({
      _post: _post,
      _user: _user,
      votevalue: votevalue,
    });
    newVote.save();
    res.status(200).send(newVote);
  }
});

module.exports = router;
