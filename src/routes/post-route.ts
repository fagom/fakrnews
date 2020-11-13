import express from "express";
import mongoose from "mongoose";

const PostCreateMiddleWare = require("../middlewares/post-create-post");
const PostUpdateMiddleware = require("../middlewares/post-update-post");
const PostDeleteMiddleware = require("../middlewares/post-delete-post");
const PostGetMiddleware = require("../middlewares/get-post-details");

const router = express.Router();

router.use("/api/post/create", PostCreateMiddleWare);
router.use("/api/post/update", PostUpdateMiddleware);
router.use("/api/post/delete", PostDeleteMiddleware);
router.use("/api/post", PostGetMiddleware);

module.exports = router;
