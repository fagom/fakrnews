"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostCreateMiddleWare = require("../middlewares/post-create-post");
const router = express_1.default.Router();
router.use("/api", PostCreateMiddleWare);
module.exports = router;
