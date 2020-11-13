import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  emailid: { type: String, required: true },
  googleid: { type: String, required: true },
  profilePic: String,
  createddate: { type: Date, default: new Date() },
  modifieddate: { type: Date, default: new Date() },
  firsttimelogin: { type: String, default: "A" },
  userbio: { type: String },
});

module.exports = mongoose.model(
  "Fkn_user_details",
  UserSchema,
  "Fkn_user_details"
);
