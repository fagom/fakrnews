import express from "express";
import mongoose from "mongoose";

const PostCreateMiddleWare = require("../middlewares/post-create-post");

const router = express.Router();

router.use("/api/post/create", PostCreateMiddleWare);

module.exports = router;
