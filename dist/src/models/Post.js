"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PostSchema = new Schema({
    posttitle: { type: String, required: true },
    postcreateddate: { type: String, default: Date.now },
    postmodifeddate: { type: String, default: Date.now },
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
module.exports = mongoose_1.default.model("Fkn_Posts_detail", PostSchema, "Fkn_Posts_detail");
