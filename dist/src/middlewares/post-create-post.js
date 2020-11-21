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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { posttitle, _user, fullname, firstname, surname, profilePic, userbio, username, userIconColor, } = req.body;
    const newpost = new PostModel({
        posttitle,
        _user,
        fullname,
        firstname,
        surname,
        profilePic,
        userbio,
        username,
        userIconColor,
        postcreateddate: new Date(),
        postmodifeddate: new Date(),
    });
    try {
        newpost.save();
        res.status(200).send({
            _id: newpost.get("_id"),
            posttitle: newpost.get("posttitle"),
            postcreateddate: newpost.get("postcreateddate"),
            _user: newpost.get("_user"),
            fullname: newpost.get("fullname"),
            firstname: newpost.get("firstname"),
            surname: newpost.get("surname"),
            profilePic: newpost.get("profilePic"),
            userbio: newpost.get("userbio"),
            username: newpost.get("username"),
            userIconColor: newpost.get("userIconColor"),
        });
    }
    catch (e) {
        const errinstance = new base_error_class_1.ErrorClass("ServerError", 500, "Oops something went wrong. Try again later");
        res.status(500).send(errinstance.parseMessage());
    }
}));
module.exports = router;
