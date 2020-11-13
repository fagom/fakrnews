"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const VoteCreateMiddleware = require("../middlewares/post-vote-create");
const VoteUpdateMiddleware = require("../middlewares/post-vote-update");
router.use("/api/vote/create", VoteCreateMiddleware);
router.use("/api/vote/update", VoteUpdateMiddleware);
module.exports = router;
