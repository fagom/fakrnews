"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const VoteModel = mongoose_1.default.model("Fkn_vote_details");
const base_error_class_1 = require("../common/base-error-class");
const router = express_1.default.Router();
const ObjectId = mongoose_1.default.Types.ObjectId;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _post, _user, votevalue } = req.body;
    const existingVote = yield VoteModel.findOne({
        _post: ObjectId(_post),
        _user: ObjectId(_user),
    });
    if (existingVote) {
        existingVote.set("votevalue", votevalue);
        existingVote.set("modifeddate", new Date());
        existingVote.set("__v", existingVote.get("__v") + 1);
    }
    else {
        const errinstance = new base_error_class_1.ErrorClass("VoteNotExists", 500, "Oops, something went wrong. Refresh and try again.");
        res.status(500).send(errinstance.parseMessage());
    }
}));
module.exports = router;
