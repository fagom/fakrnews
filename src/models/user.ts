import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  emailid: { type: String, required: true },
  googleid: { type: String, required: true },
  profilePic: String,
  createddate: { type: Date, default: Date.now },
  modifieddate: { type: Date, default: Date.now },
  firsttimelogin: { type: String, default: "Y" },
  userbio: { type: String },
  username: { type: String },
  userstatus: { type: String, default: "A" },
  userIconColor: { type: String, default: "#000000" },
});

module.exports = mongoose.model(
  "Fkn_user_details",
  UserSchema,
  "Fkn_user_details"
);
