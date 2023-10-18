"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// import * as db from './models';
const cors = require("cors");
//Set Path
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
// console.log(path);
// const router = express.Router();
// const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
const jwtToken_1 = require("./appResources/jwtToken");
//
app.use(express_1.default.json());
//This is to ensure that all routes but for the registration and Login routes require a valid token
app.use((req, res, next) => {
    if (req.path === "/login" || req.path === "/register" || req.path === "/payment/smartTutor/callback") {
        return next();
    }
    (0, jwtToken_1.validateToken)(req, res, next);
});
const PORT = 1430;
const sequelize = new sequelize_1.Sequelize("edu_app", "root", "Willie#2045@1998", {
    host: "localhost",
    dialect: "mysql",
});
sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((error) => {
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
app.use("/contentManagement", contentManagement, examManagement, lessonManagement, TopicsManagement);
app.use("/payment", paymentManagement, subscriptionManagement);
// console.log("onbaording: " + db.user_details);
sequelize
    .sync()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.log("This could be the error ==>", err);
});
