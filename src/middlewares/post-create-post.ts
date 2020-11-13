import express from "express";
import mongoose from "mongoose";
const PostModel = mongoose.model("Fkn_Posts_detail");
import { ErrorClass } from "../common/base-error-class";

const router = express.Router();

router.post("/", (req, res) => {
  const {} = req.body;
});

module.exports = router;
