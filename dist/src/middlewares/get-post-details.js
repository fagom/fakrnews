"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const PostModel = mongoose_1.default.model("Fkn_Posts_detail");
const base_error_class_1 = require("../common/base-error-class");
const router = express_1.default.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const existingPost = yield PostModel.findOne({ _id: _id, poststatus: "A" });
    if (!existingPost) {
        const errinstance = new base_error_class_1.ErrorClass("PostNotFound", 404, "Page Not Found");
        res.status(404).send(errinstance.parseMessage());
    }
    else {
        res.status(200).send({
            posttitle: existingPost.get("posttitle"),
            postcreateddate: existingPost.get("postcreateddate"),
            _user: existingPost.get("_user"),
            fullname: existingPost.get("fullname"),
            firstname: existingPost.get("firstname"),
            surname: existingPost.get("surname"),
            profilePic: existingPost.get("profilePic"),
            userbio: existingPost.get("userbio"),
            username: existingPost.get("username"),
            userIconColor: existingPost.get("userIconColor"),
        });
    }
}));
module.exports = router;
