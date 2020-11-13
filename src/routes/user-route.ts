import express from "express";

const router = express.Router();

const UserCreateMiddleware = require("../middlewares/post-create-user");
const UserUpdateMiddleware = require("../middlewares/post-update-user");
const UserGetMiddleware = require("../middlewares/get-user-details");

router.use("/api/user/create", UserCreateMiddleware);

router.use("/api/user/update", UserUpdateMiddleware);

router.use("/api/user", UserGetMiddleware);

module.exports = router;
