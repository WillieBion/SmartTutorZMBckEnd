import express from "express";
import { ResponseHandler } from "./appResourceTypes";
export const app = express();
export const router = express.Router();

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
};

//Resuable Success Messgae
export const successMessages = {
  WELCOME_ABOARD:
    "You have been successfully onboarded. Welcome to Smart Tutor",
  LOGIN_SUCCESS: "Login successful, Welcome to Smart Tutor",
  ADD_SUBJECT_SUCCESS: "You have successfully added a subject"
};

// module.exports = {
//     app,
//     router
// }
