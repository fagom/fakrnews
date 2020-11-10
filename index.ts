import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server API App listening on Port ${PORT}`));
