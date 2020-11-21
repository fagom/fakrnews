import express from "express";
import mongoose from "mongoose";

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const PostModel = mongoose.model("Fkn_Posts_detail");
const VoteModel = mongoose.model("Fkn_vote_details");

router.post("/", async (req, res) => {
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

  const dbres = await PostModel.aggregate([
    {
      $match: {
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
          vote.map((o: any) => (o.votevalue === j ? (votecount[j] += 1) : 0));
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
});

module.exports = router;
