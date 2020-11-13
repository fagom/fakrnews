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
const UserModel = mongoose_1.default.model("Fkn_user_details");
const base_error_class_1 = require("../common/base-error-class");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, firstname, surname, emailid, googleid, profilePic, } = req.body;
    if (!emailid || !fullname || !firstname || !surname || !googleid) {
        const errinstance = new base_error_class_1.ErrorClass("BadData", 400, "Invalid Data provided");
        res.status(400).send(errinstance.parseMessage());
    }
    const user = yield UserModel.findOne({ emailid: emailid });
    if (user) {
        const errinstance = new base_error_class_1.ErrorClass("ExistingUser", 400, "EmailID already exists");
        res.status(400).send(errinstance.parseMessage());
    }
    else {
        const newUser = new UserModel({
            fullname,
            firstname,
            surname,
            emailid,
            googleid,
            profilePic,
        });
        try {
            yield newUser.save();
            res.status(200).send({
                _id: newUser.get("_id"),
                fullname: newUser.get("fullname"),
                firstname: newUser.get("firstname"),
                surname: newUser.get("surname"),
                profilePic: newUser.get("profilePic"),
                firsttimelogin: newUser.get("firsttimelogin"),
                userIconColor: newUser.get("userIconColor"),
            });
        }
        catch (e) {
            const errinstance = new base_error_class_1.ErrorClass("ServerError", 500, "Oops something went wrong. Try again later");
            res.status(500).send(errinstance.parseMessage());
        }
    }
}));
module.exports = router;
