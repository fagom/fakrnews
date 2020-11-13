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
    const { _id, fullname, firstname, surname, emailid, googleid, profilePic, } = req.body;
    if (!emailid || !fullname || !firstname || !surname || !googleid) {
        const errinstance = new base_error_class_1.ErrorClass("BadData", 400, "Invalid Data provided");
        res.status(400).send(errinstance.parseMessage());
    }
    const user = yield UserModel.findById(_id);
    if (!user) {
        const errinstance = new base_error_class_1.ErrorClass("UserNotFound", 400, "EmailID doesnot exist");
        res.status(400).send(errinstance.parseMessage());
    }
    else {
        const existingUser = new UserModel({
            fullname,
            firstname,
            surname,
            emailid,
            googleid,
            profilePic,
        });
        try {
            yield existingUser.save();
            res.status(200).send({
                _id: existingUser.get("_id"),
                fullname: existingUser.get("fullname"),
                firstname: existingUser.get("firstname"),
                surname: existingUser.get("surname"),
                profilePic: existingUser.get("profilePic"),
                firsttimelogin: existingUser.get("firsttimelogin"),
            });
        }
        catch (e) {
            const errinstance = new base_error_class_1.ErrorClass("ServerError", 500, "Oops something went wrong. Try again later");
            res.status(500).send(errinstance.parseMessage());
        }
    }
}));
module.exports = router;
