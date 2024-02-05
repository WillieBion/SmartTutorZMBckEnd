import express from "express";
const app = express();
// import * as db from './models';
// const cors = require("cors");
import cors from 'cors';

//Set Path
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// console.log(path);

// const router = express.Router();
// const Sequelize = require("sequelize");
import { Sequelize } from "sequelize";
import { generateOTP, generateReferralCode } from "./appResources/resources";
import { validateToken } from "./appResources/jwtToken";
import { getter } from "./instances/dbConfig";

//
app.use(express.json());
app.use(cors());

//This is to ensure that all routes but for the registration and Login routes require a valid token
app.use((req, res, next) => {
  if (req.path === "/login" || req.path === "/register" || req.path === "/payment/smartTutor/callback"
    || req.path === "/forgotpassword/otp" || req.path === "/devicelogout"
    || req.path === "/getUsers/unsubscribed" || req.path === "/register/verification"
    || req.path === "/dashboard/login" || req.path === "/dashboard/register" || req.path.startsWith("/delete-request")) {
    return next();
  }

  validateToken(req, res, next);
});

const PORT = 1430;

const sequelize = new Sequelize("edu_app", "root", "Willie#2045@1998", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database: ", error);
  });

//Routes Auth
const onbaording = require("./routes/onBoarding/onboarding");
const login = require("./routes/Auth/auth");

// Routes SubjectsManagement
const contentManagement = require("./routes/contentManagement/subjects");
const examManagement = require("./routes/contentManagement/exams");
const lessonManagement = require("./routes/contentManagement/lessons");

//Routes TopicsManagement
const TopicsManagement = require("./routes/contentManagement/subjectTopic");

//Payment
const paymentManagement = require("./routes/payment/collection");

/* Subscription */
const subscriptionManagement = require("./routes/subscription/subscription");

// chat
const chat = require("./routes/chat/stChatbot");

//Admin
const adminStats = require("./routes/stats/adminstats");

//sales_manager
const salesManager = require("./routes/stats/sales_manager");
// const generateTransId = () => {
//   const prefix = "0000";
//   const randomer = Math.floor(Math.random() * 100000000)
//     .toString()
//     .padStart(8, "0");

//   return prefix + randomer;
// };
// console.log(generateTransId());
//use routes
// const value = generateOTP();
// console.log(value);
// app.use(express.json())
// const value = generateReferralCode()
// console.log(value)
app.use("/", onbaording);
app.use("/", login);
app.use(
  "/contentManagement",
  contentManagement,
  examManagement,
  lessonManagement,
  TopicsManagement
);
app.use("/payment", paymentManagement, subscriptionManagement);
app.use("/chat", chat);
app.use("/stats", adminStats, salesManager)

// console.log("onbaording: " + db.user_details);
getter("260972156059");
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log("This could be the error ==>", err);
  });
