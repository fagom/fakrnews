"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
const UserModel = mongoose_1.default.model("Fkn_user_details");
const UserCreateMiddleware = require("../middlewares/post-create-user");
const UserUpdateMiddleware = require("../middlewares/post-update-user");
router.use("/api/user/create", UserCreateMiddleware);
router.use("/api/user/update", UserUpdateMiddleware);
module.exports = router;
