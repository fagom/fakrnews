"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostCreateMiddleWare = require("../middlewares/post-create-post");
const PostUpdateMiddleware = require("../middlewares/post-update-post");
const PostDeleteMiddleware = require("../middlewares/post-delete-post");
const PostGetMiddleware = require("../middlewares/get-post-details");
const router = express_1.default.Router();
router.use("/api/post/create", PostCreateMiddleWare);
router.use("/api/post/update", PostUpdateMiddleware);
router.use("/api/post/delete", PostDeleteMiddleware);
router.use("/api/post", PostGetMiddleware);
module.exports = router;
