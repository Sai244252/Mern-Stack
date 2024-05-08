//Packages

import express from "express";

import cookieParser from "cookie-parser";

import dotenv from "dotenv";

import path from "path";

//Files

import connectDB from "./config/db.js";

//COnfiguration

dotenv.config();

connectDB();

const app = express();
//middlewares

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//Routes

//listen

app.listen(PORT, () => {
  console.log("Serving is running on the Port :", PORT);
});
