import express from "express";
import mongoose from "mongoose";
const PostModel = mongoose.model("Fkn_Posts_detail");
import { ErrorClass } from "../common/base-error-class";
const router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

router.post("/", async (req, res) => {
  const _id = req.body._id;
  const _user = req.body._user;

  const existingPost = await PostModel.findOne({
    _id: ObjectId(_id),
    poststatus: "A",
  });

  if (!existingPost) {
    const errinstance = new ErrorClass("PostNotFound", 404, "Page Not Found");
    res.status(404).send(errinstance.parseMessage());
  } else {
    const dbres = await PostModel.aggregate([
      {
        $match: {
          _id: ObjectId(_id),
        },
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
        result: result,
      };

      res.status(200).send(JSON.stringify(finalResult));
    });
  }
});

module.exports = router;
