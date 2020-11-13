"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UserCreateMiddleware = require("../middlewares/post-create-user");
const UserUpdateMiddleware = require("../middlewares/post-update-user");
const UserGetMiddleware = require("../middlewares/get-user-details");
router.use("/api/user/create", UserCreateMiddleware);
router.use("/api/user/update", UserUpdateMiddleware);
router.use("/api/user", UserGetMiddleware);
module.exports = router;
