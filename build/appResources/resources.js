"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMessages = exports.generateOTP = exports.generateTransId = exports.BASE_URL = exports.successMessages = exports.errorMessages = exports.successCodes = exports.errorCodes = exports.responseHandler = exports.router = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.router = express_1.default.Router();
// Resuable Functions
const responseHandler = (response) => {
    console.log(response);
    //Add logic for if JWT authentication include jwt token
    if (response.jwtToken !== undefined) {
        return {
            statusCode: response.statusCode,
            message: response.message,
            jwtToken: response.jwtToken,
        };
    }
    return {
        statusCode: response.statusCode,
        message: response.message,
    };
};
exports.responseHandler = responseHandler;
//ERROR CODES
exports.errorCodes = {
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND_RESOURCE: 404,
    BAD_REQUEST: 400,
    // DB_DUPLICATE_ENTRY:
};
//SUCCESS CODES
exports.successCodes = {
    SERVER_SUCCESS: 200,
};
//Resuable Error Messages
exports.errorMessages = {
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    GEN_NOT_FOUND: "Not Found",
    USER_NOT_FOUND: "User Not Found",
    USER_CREDENTIALS_WRONG: "Wrong userName/Pin combination!",
};
//Resuable Success Messgae
exports.successMessages = {
    WELCOME_ABOARD: "You have been successfully onboarded. Welcome to Smart Tutor",
    LOGIN_SUCCESS: "Login successful, Welcome to Smart Tutor",
    ADD_SUBJECT_SUCCESS: "You have successfully added a subject",
    ADD_EXAM_SUCCESS: "You have successfully added an exam",
    ADD_EXAM_CONTENT_SUCCESS: "You have successfully added",
    ADD_LESSON_SUCCESS: "You have successfully added a lesson",
    ADD_TOPIC_SUCCESS: "You have successfully added a topic",
    ADD_PAYMENT_SUCCESS: "You have successfully added a payment",
    UPDATE_PASSWORD_SUCCESS: "You have successfully updated your password",
    MATCHING_PASSWORD_SUCCESS: "Your passwords match",
    RETREIVE_TRANSID_SUCCESS: "Your transaction has been successfully retrieved",
    FORGOT_PASSWORD_SUCCESS: "OTP SMS has been sent to your mobile device",
    UPDATED_SUBSCRIPTION_SUCCESS: "Subscription Successfully Updated",
    RETREIVE_USER_DETAILS_SUCCESS: "Successfully retrieved user details",
};
// Base URL
exports.BASE_URL = "https://api.primenetpay.com:9001";
const generateTransId = () => {
    const prefix = "0000";
    const randomer = Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, "0");
    return prefix + randomer;
};
exports.generateTransId = generateTransId;
/* Random OTP Generator */
// export const generateOTP = () => {
//   const length = 8;
//   const charset =
//     "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//   let otp = "";
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * charset.length);
//     otp += charset.charAt(randomIndex);
//   }
//   const message = `Your OTP is ${otp}`;
//   // return otp;
//   const urlEncodedMessage = encodeURIComponent(message);
//   return {
//     otp: otp,
//     senderMessgae: urlEncodedMessage,
//   };
// };
const generateOTP = () => {
    const length = 6;
    const charset = "0123456789"; // Only digits 0-9
    let otp = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        otp += charset.charAt(randomIndex);
    }
    const message = `Your OTP is ${otp}`;
    //   // return otp;
    const urlEncodedMessage = encodeURIComponent(message);
    return { otp, senderMessgae: urlEncodedMessage };
};
exports.generateOTP = generateOTP;
const randomDigitsOTP = (0, exports.generateOTP)();
console.log(randomDigitsOTP);
// const randomOTP = generateOTP();
// console.log("Random OTP:", randomOTP);
//Payment Messages
exports.paymentMessages = {
    NARRATION_MSG: "SmartTutor Payment",
};
// module.exports = {
//     app,
//     router
// }
