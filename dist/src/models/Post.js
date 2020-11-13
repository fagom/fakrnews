"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PostSchema = new Schema({
    posttitle: String,
    _user: Schema.Types.ObjectId,
    postcreateddate: { type: String, default: new Date() },
    postmodifeddate: { type: String, default: new Date() },
    poststatus: { type: String, default: "A" },
});
module.exports = mongoose_1.default.model("Fkn_Posts_detail", PostSchema, "Fkn_Posts_detail");
