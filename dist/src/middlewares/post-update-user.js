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
const router = express_1.default.Router();
const UserModel = mongoose_1.default.model("Fkn_user_details");
const base_error_class_1 = require("../common/base-error-class");
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("update");
    const { _id, fullname, firstname, surname, emailid, profilePic, username, userIconColor, } = req.body;
    if (!emailid || !fullname || !firstname || !surname) {
        const errinstance = new base_error_class_1.ErrorClass("BadData", 400, "Invalid Data provided");
        res.status(400).send(errinstance.parseMessage());
    }
    const user = yield UserModel.findById(_id);
    if (!user) {
        const errinstance = new base_error_class_1.ErrorClass("UserNotFound", 404, "user doesnot exist");
        res.status(404).send(errinstance.parseMessage());
    }
    else {
        try {
            user.set("fullname", fullname);
            user.set("firstname", firstname);
            user.set("surname", surname);
            user.set("emailid", emailid);
            user.set("profilePic", profilePic);
            user.set("username", username);
            user.set("userIconColor", userIconColor);
            let version = user.get("__v");
            user.set("__v", version + 1);
            yield user.save();
            res.status(200).send({
                _id: user.get("_id"),
                fullname: user.get("fullname"),
                firstname: user.get("firstname"),
                surname: user.get("surname"),
                profilePic: user.get("profilePic"),
                firsttimelogin: user.get("firsttimelogin"),
                username: user.get("username"),
                userIconColor: user.get("userIconColor"),
            });
        }
        catch (e) {
            console.log(e);
            const errinstance = new base_error_class_1.ErrorClass("ServerError", 500, "Oops something went wrong. Try again later");
            res.status(500).send(errinstance.parseMessage());
        }
    }
}));
module.exports = router;
