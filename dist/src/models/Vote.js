"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const VoteSchema = new Schema({
    _post: Schema.Types.ObjectId,
    _user: Schema.Types.ObjectId,
    votevalue: Number,
    createddate: { type: Date, default: new Date() },
    modifeddate: { type: Date, default: new Date() },
});
module.exports = mongoose_1.default.model("Fkn_vote_details", VoteSchema, "Fkn_vote_details");
