"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const keys = require("./config/keys");
require("./src/models/Post");
require("./src/models/user");
require("./src/models/Vote");
const UserRoute = require("./src/routes/user-route");
const PostRoute = require("./src/routes/post-route");
const VoteRoute = require("./src/routes/vote-route");
try {
    mongoose_1.default.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
catch (error) {
    throw error;
}
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(UserRoute);
app.use(PostRoute);
app.use(VoteRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server API App listening on Port ${PORT}`));
