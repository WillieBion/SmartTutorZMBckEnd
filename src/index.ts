import express from "express";
const app = express();
// import * as db from './models';
const cors = require("cors");

//Set Path
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// console.log(path);

// const router = express.Router();
// const Sequelize = require("sequelize");
import { Sequelize } from "sequelize";
import { generateOTP } from "./appResources/resources";
import { validateToken } from "./appResources/jwtToken";

//
app.use(express.json());

//This is to ensure that all routes but for the registration and Login routes require a valid token
app.use((req, res, next) => {
  if (req.path === "/login" || req.path === "/register" || req.path === "/payment/smartTutor/callback" || req.path === "/forgotpassword/otp") {
    return next();
  }

  validateToken(req, res, next);
});

const PORT = 1432;

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
const login = require("./routes/Auth/login");

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
app.use(cors());
// app.use(express.json())
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
// console.log("onbaording: " + db.user_details);
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
