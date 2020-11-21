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
const router = express_1.default.Router();
const ObjectId = mongoose_1.default.Types.ObjectId;
const PostModel = mongoose_1.default.model("Fkn_Posts_detail");
const VoteModel = mongoose_1.default.model("Fkn_vote_details");
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _user, limit, page } = req.body;
    const startindex = (page - 1) * limit;
    const endIndex = page * limit;
    const nextPage = {
        page: page + 1,
        limit: limit,
    };
    const prevPage = {
        page: page - 1,
        limit: limit,
    };
    const dbres = yield PostModel.aggregate([
        {
            $match: {
                _user: ObjectId(_user),
                poststatus: "A",
            },
        },
        {
            $skip: startindex,
        },
        {
            $limit: limit,
        },
        {
            $lookup: {
                from: "Fkn_vote_details",
                localField: "_id",
                foreignField: "_post",
                as: "votes",
            },
        },
        {
            $sort: {
                postcreateddate: -1,
            },
        },
    ]).exec((err, result) => {
        //console.log(result[0].votes);
        //console.log("result", result);
        if (result) {
            for (var i = 0; i < result.length; i++) {
                const vote = result[i].votes;
                let totalVotes = 0;
                let votecount = Array(2);
                //console.log("votecount", votecount);
                let voted = false;
                totalVotes = vote.length;
                result[i].uservotedvalue = null;
                for (var j = 0; j < vote.length; j++) {
                    //totalVotes = totalVotes + 1;
                    voted = vote[j]._user == _user ? true : false;
                    if (voted) {
                        result[i].voted = true;
                        result[i].uservotedvalue = vote[j].votevalue;
                    }
                }
                // console.log(votecount.length, vote);
                for (var j = 0; j < votecount.length; j++) {
                    votecount[j] = 0;
                    vote.map((o) => (o.votevalue === j ? (votecount[j] += 1) : 0));
                    // console.log(currcount);
                    // votecount[j] = optioncount === undefined ? 0 : optioncount.length;
                }
                //console.log("votevalue", totalVotes, vote.length);
                result[i].totalvotes = vote.length;
                result[i].votecount = votecount;
                result[i].votes = null;
            }
        }
        const finalResult = {
            nextPage: nextPage,
            prevPage: prevPage,
            result: result,
        };
        res.status(200).send(JSON.stringify(finalResult));
    });
}));
module.exports = router;
