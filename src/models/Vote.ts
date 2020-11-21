import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  _post: Schema.Types.ObjectId,
  _user: Schema.Types.ObjectId,
  votevalue: Number, //1 for Yes, 0 for No
  createddate: { type: Date, default: Date.now },
  modifeddate: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "Fkn_vote_details",
  VoteSchema,
  "Fkn_vote_details"
);
