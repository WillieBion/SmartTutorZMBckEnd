import express from "express";
import { ResponseHandler } from "./appResourceTypes";
export const app = express();
export const router = express.Router();
import { properties } from "./applicationProperties";
import axios from "axios";


// Resuable Functions
export const responseHandler = (response: ResponseHandler) => {
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

//ERROR CODES
export const errorCodes = {
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND_RESOURCE: 404,
  BAD_REQUEST: 400,
  RESOURCE_ALREADY_EXISTS: 409
  // DB_DUPLICATE_ENTRY:
};

//SUCCESS CODES

export const successCodes = {
  SERVER_SUCCESS: 200,
};

//Resuable Error Messages
export const errorMessages = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  GEN_NOT_FOUND: "Not Found",
  USER_NOT_FOUND: "User Not Found",
  USER_CREDENTIALS_WRONG: "Wrong userName/Pin combination!",
  USER_ALREADY_LOGGED_IN: "User is already logged in on another device",
  USER_AUTHENTICATION_STATUS_FAILED: "User not authenticated",
  USER_ALREADY_EXISTS: "User already exists",
  REFERRAL_CODE_DOESNT_EXIST: "Referral ID does not exist.",

};

//Resuable Success Messgae
export const successMessages = {
  WELCOME_ABOARD:
    "You have been successfully onboarded. Welcome to Smart Tutor",
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
  LOGOUT_SUCCESS: "Successfully logged out",
  USER_AUTHENTICATION_STATUS: "User is authenticated.",
  VERIFICATION_CODE_SUCCESS: "Code successfully verified",
  TEACHER_ONBOARDING: "You have successfully created a teacher"

};

// Base URL
export const BASE_URL = "https://api.primenetpay.com:9001";

export const generateTransId = () => {
  const prefix = "0000";
  const randomer = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, "0");

  return prefix + randomer;
};

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

export const generateOTP = () => {
  const length = 6;
  const charset = "0123456789"; // Only digits 0-9
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset.charAt(randomIndex);
  }
  // const message = `Your OTP is ${otp}`;
  const message = `Your one-time password is ${otp}. Change this password after you login to your SmartTutor ZM account. Contact support if you didn't initiate this request.`

  //   // return otp;
  const urlEncodedMessage = encodeURIComponent(message);

  return { otp, senderMessgae: urlEncodedMessage };
};

export const generateOTPOnReg = () => {
  const length = 6;
  const charset = "0123456789"; // Only digits 0-9
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset.charAt(randomIndex);
  }
  // const message = `Your OTP is ${otp}`;
  const message = `Your registration one-time password is ${otp}. Contact support if you didn't initiate this request.`

  //   // return otp;
  const urlEncodedMessage = encodeURIComponent(message);

  return { otp, senderMessgae: urlEncodedMessage };
};

export const teacherDefaultPass = (referral_code: string) => {
  const length = 6;
  const charset = "0123456789"; // Only digits 0-9
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset.charAt(randomIndex);
  }
  // const message = `Your OTP is ${otp}`;
  const message = `Your default login password is ${otp} and your referral ID is ${referral_code}.`

  //   // return otp;
  const urlEncodedMessage = encodeURIComponent(message);

  return { otp, senderMessgae: urlEncodedMessage };
};

export const generateReferralCode = () => {
  const length = 5;
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Alpha Numeric A-Z - 0-9
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset.charAt(randomIndex);
  }
  // const message = `Your OTP is ${otp}`;
  // const message = `Your one-time password is ${otp}. Change this password after you login to your SmartTutor ZM account. Contact support if you didn't initiate this request.`

  //   // return otp;
  // const urlEncodedMessage = encodeURIComponent(message);

  return { code };
};
// const randomDigitsOTP = generateOTP();
// console.log(randomDigitsOTP);

// const randomOTP = generateOTP();
// console.log("Random OTP:", randomOTP);

//Payment Messages
export const paymentMessages = {
  NARRATION_MSG: "SmartTutor Payment",
};

//Code Verification

export const VerifyToken = async (user_name: string, senderMessgae: any) => {

  //Make axios request to bulk sms


  const bulkSMSResponse = await axios.get(
    `https://bulksms.zamtel.co.zm/api/v2.1/action/send/api_key/${properties.SMS_API}/contacts/${user_name}/senderId/${properties.SMS_SENDERID}/message/${senderMessgae}`
  );
  if (bulkSMSResponse.data.success === true) {
    console.log(bulkSMSResponse.data.success + "Bulk SMS sent successfully");
    return {
      success: true,
      message: "Bulk SMS sent successfully"
    }
  } else {
    console.log("Bulk SMS not sent successfully");
    return {
      success: false,
      message: "Bulk SMS not sent successfully"
    }

  }


}

// module.exports = {
//     app,
//     router
// }
