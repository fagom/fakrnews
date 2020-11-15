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
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _username = req.params.id;
    const user = yield UserModel.findOne({
        username: _username,
        userstatus: "A",
    });
    if (user) {
        res.status(200).send({
            description: "Username Exists",
        });
    }
    else {
        const errinstance = new base_error_class_1.ErrorClass("UserNotFound", 204, "user doesnot exist");
        res.status(204).send(errinstance.parseMessage());
    }
}));
module.exports = router;
