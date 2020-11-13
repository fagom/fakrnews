import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const UserCreateMiddleware = require("../middlewares/post-create-user");
const UserUpdateMiddleware = require("../middlewares/post-update-user");

router.use("/api/user/create", UserCreateMiddleware);

router.use("/api/user/update", UserUpdateMiddleware);

module.exports = router;
