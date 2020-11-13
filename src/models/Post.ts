import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  posttitle: String,
  _user: Schema.Types.ObjectId,
  postcreateddate: { type: String, default: new Date() },
  postmodifeddate: { type: String, default: new Date() },
  poststatus: { type: String, default: "A" },
});

module.exports = mongoose.model(
  "Fkn_Posts_detail",
  PostSchema,
  "Fkn_Posts_detail"
);
