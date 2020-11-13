import express from "express";
const router = express.Router();

const VoteCreateMiddleware = require("../middlewares/post-vote-create");
const VoteUpdateMiddleware = require("../middlewares/post-vote-update");

router.use("/api/vote/create", VoteCreateMiddleware);
router.use("/api/vote/update", VoteUpdateMiddleware);

module.exports = router;
