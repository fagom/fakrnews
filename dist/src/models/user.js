"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    fullname: { type: String, required: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    emailid: { type: String, required: true },
    googleid: { type: String, required: true },
    profilePic: String,
    createddate: { type: Date, default: new Date() },
    modifieddate: { type: Date, default: new Date() },
    firsttimelogin: { type: String, default: "Y" },
    userbio: { type: String },
    username: { type: String },
    userstatus: { type: String, default: "A" },
    userIconColor: { type: String, default: "#000000" },
});
module.exports = mongoose_1.default.model("Fkn_user_details", UserSchema, "Fkn_user_details");
