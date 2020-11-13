import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  posttitle: { type: String, required: true },
  postcreateddate: { type: String, default: new Date() },
  postmodifeddate: { type: String, default: new Date() },
  poststatus: { type: String, default: "A" },
  _user: Schema.Types.ObjectId,
  fullname: { type: String, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  profilePic: String,
  userbio: { type: String },
  username: { type: String },
  userIconColor: { type: String },
});

module.exports = mongoose.model(
  "Fkn_Posts_detail",
  PostSchema,
  "Fkn_Posts_detail"
);
