"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("../../appResources/resources");
const dbConfig_1 = require("../../instances/dbConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const applicationProperties_1 = require("../../appResources/applicationProperties");
const dbQuery_1 = require("../../instances/dbQuery");
const axios_1 = __importDefault(require("axios"));
// const db = require('../../models');
resources_1.router.post("/register", (req, res) => {
    console.log("Here I am " + req.body);
    const { msisdn, user_name, password, user_role, user_status } = req.body;
    bcrypt_1.default
        .hash(password, Number(applicationProperties_1.properties.ENC_KEY))
        .then((hash) => {
        dbConfig_1.database.query("INSERT INTO user_details (msisdn, user_name, password, user_role, user_status) VALUES (?,?,?,?,?)", [msisdn, user_name, hash, user_role, user_status], (error, result) => {
            // console.log(error?.code);
            // if (error?.code === ""){
            //   console.log("Error: " + error, "statusCode:" + error?.code);
            //   const dbResp = {statusCode: 400, message: error?.message  }
            //   const resp = responseHandler(dbResp);
            //   res.status(resp.statusCode).json(resp.message);
            // }else if (error?.code === '500'){
            // console.log("Error: " + error, "statusCode:" + error.code);
            // const dbResp = {statusCode: error!.errno, message: errorMessages.INTERNAL_SERVER_ERROR }
            // const resp = responseHandler(dbResp);
            // res.status(resp.statusCode).json(resp.message)
            if (error) {
                console.log("Error: " + error, "statusCode:" + error.code);
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                console.log("We are a success, Welcome onboard");
                const _a = req.body, { password } = _a, userDetails = __rest(_a, ["password"]);
                console.log(userDetails);
                const dbResp = {
                    statusCode: resources_1.successCodes.SERVER_SUCCESS,
                    message: {
                        description: resources_1.successMessages.WELCOME_ABOARD,
                        user_details: userDetails,
                    },
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
        });
    })
        .catch((err) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
    });
    // database.query(
    //   "INSERT INTO user_details (msisdn, user_name, user_role, user_status) VALUES (?,?,?,?)",
    //   [msisdn, user_name, user_role, user_status],
    //   (error, result) => {
    //     // console.log(error?.code);
    //     // if (error?.code === ""){
    //     //   console.log("Error: " + error, "statusCode:" + error?.code);
    //     //   const dbResp = {statusCode: 400, message: error?.message  }
    //     //   const resp = responseHandler(dbResp);
    //     //   res.status(resp.statusCode).json(resp.message);
    //     // }else if (error?.code === '500'){
    //     // console.log("Error: " + error, "statusCode:" + error.code);
    //     // const dbResp = {statusCode: error!.errno, message: errorMessages.INTERNAL_SERVER_ERROR }
    //     // const resp = responseHandler(dbResp);
    //     // res.status(resp.statusCode).json(resp.message)
    //     if (error) {
    //       console.log("Error: " + error, "statusCode:" + error.code);
    //       const dbResp = {
    //         statusCode: error!.errno,
    //         message: errorMessages.INTERNAL_SERVER_ERROR,
    //       };
    //       const resp = responseHandler(dbResp);
    //       res.status(resp.statusCode).json(resp);
    //     } else {
    //       console.log("We are a success, Welcome onboard");
    //       const dbResp = {
    //         statusCode: successCodes.SERVER_SUCCESS,
    //         message: {description: successMessages.WELCOME_ABOARD, payload: req.body},
    //       };
    //       const resp = responseHandler(dbResp);
    //       res.status(resp.statusCode).json(resp);
    //     }
    //   }
    // );
    // return
    //   db.user_details.create({msisdn, user_name, user_role, user_status}).then((details: any) => {
    //  if (details){
    //   res.status(200).json({statusCode: 200, message: {status: "success", payload: details}})
    //  }
    //   }).catch((err: any) => {
    //      if (err){
    //       res.status(500).json({statusCode:500, message: {status: "error", payload: err}});
    //      }
    //   })
});
/* Change Password */
resources_1.router.post("/verifypassword/(:msisdn)", (req, res) => {
    const { msisdn } = req.params;
    const { current_password } = req.body;
    // let
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.GET_PASSWORD_QRY, [msisdn], (err, result) => {
            if (err) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            // res.status(200).json(result[0])
            if (result.length !== 0) {
                bcrypt_1.default.compare(current_password, result[0].password, (error, response) => {
                    if (response) {
                        // database.query(db_query.UPDATE_PASSWORD_QRY, [])
                        const dbResp = {
                            statusCode: resources_1.successCodes.SERVER_SUCCESS,
                            message: {
                                success: true,
                                description: resources_1.successMessages.MATCHING_PASSWORD_SUCCESS,
                            },
                        };
                        const resp = (0, resources_1.responseHandler)(dbResp);
                        res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
                    }
                    else {
                        const respo = {
                            statusCode: resources_1.errorCodes.BAD_REQUEST,
                            message: resources_1.errorMessages.USER_CREDENTIALS_WRONG,
                        };
                        const resp = (0, resources_1.responseHandler)(respo);
                        res.status(resp.statusCode).json(resp);
                    }
                });
            }
            else {
                const respo = {
                    statusCode: resources_1.errorCodes.NOT_FOUND_RESOURCE,
                    message: resources_1.errorMessages.USER_NOT_FOUND,
                };
                const resp = (0, resources_1.responseHandler)(respo);
                res.status(resp.statusCode).json(resp);
            }
        });
    }
    catch (error) {
        const respo = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(respo);
        res.status(resp.statusCode).json(resp);
    }
});
resources_1.router.put("/updatepassword/(:msisdn)", (req, res) => {
    const { msisdn } = req.params;
    const { password } = req.body;
    bcrypt_1.default
        .hash(password, Number(applicationProperties_1.properties.ENC_KEY))
        .then((hash) => {
        dbConfig_1.database.query(dbQuery_1.db_query.UPDATE_PASSWORD_QRY, [hash, msisdn], (error, result) => {
            if (error) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: error.code,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                const dbResp = {
                    statusCode: resources_1.successCodes.SERVER_SUCCESS,
                    message: { description: resources_1.successMessages.UPDATE_PASSWORD_SUCCESS },
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
            }
        });
    })
        .catch((error) => {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(500).json(resp);
    });
    // try {
    //   database.query(
    //     db_query.UPDATE_PASSWORD_QRY,
    //     [password, msisdn],
    //     (error, result) => {
    //       if (error) {
    //         const dbResp = {
    //           statusCode: errorCodes.INTERNAL_SERVER_ERROR,
    //           message: error.code,
    //         };
    //         const resp = responseHandler(dbResp);
    //         res.status(resp.statusCode).json(resp);
    //       } else {
    //         const dbResp = {
    //           statusCode: successCodes.SERVER_SUCCESS,
    //           message: { description: successMessages.UPDATE_PASSWORD_SUCCESS },
    //         };
    //         const resp = responseHandler(dbResp);
    //         res.status(successCodes.SERVER_SUCCESS).json(resp);
    //       }
    //     }
    //   );
    // } catch (error) {
    //   const dbResp = {
    //     statusCode: errorCodes.INTERNAL_SERVER_ERROR,
    //     message: errorMessages.INTERNAL_SERVER_ERROR,
    //   };
    //   const resp = responseHandler(dbResp);
    //   res.status(500).json(resp);
    // }
});
resources_1.router.post("/forgotpassword/otp", (req, res) => {
    const { user_name } = req.body;
    dbConfig_1.database.query(dbQuery_1.db_query.VERIFY_USERNAME_QRY, [user_name], (error, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            const dbResp = {
                statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                message: error.code,
            };
            const resp = (0, resources_1.responseHandler)(dbResp);
            res.status(resp.statusCode).json(resp);
        }
        // res.status(200).json(result.length);
        if (result.length !== 0) {
            const { senderMessgae, otp } = (0, resources_1.generateOTP)();
            /* Update password to OTP  */
            bcrypt_1.default.hash(otp, Number(applicationProperties_1.properties.ENC_KEY)).then((hash) => {
                dbConfig_1.database.query(dbQuery_1.db_query.UPDATE_PASSWORD_QRY, [hash, user_name], (err, response) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        const dbResp = {
                            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                            message: err.code,
                        };
                        const resp = (0, resources_1.responseHandler)(dbResp);
                        res.status(resp.statusCode).json(resp);
                        return;
                    }
                    const bulkSMSResponse = yield axios_1.default.get(`https://bulksms.zamtel.co.zm/api/v2.1/action/send/api_key/${applicationProperties_1.properties.SMS_API}/contacts/${user_name}/senderId/${applicationProperties_1.properties.SMS_SENDERID}/message/${senderMessgae}`);
                    if (bulkSMSResponse.data.success === true) {
                        // res.status(200).json(bulkSMSResponse.data);
                        const dbResp = {
                            statusCode: resources_1.successCodes.SERVER_SUCCESS,
                            message: {
                                description: resources_1.successMessages.FORGOT_PASSWORD_SUCCESS,
                            },
                        };
                        const resp = (0, resources_1.responseHandler)(dbResp);
                        res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
                        console.log("OTP: " + otp, "\n " + "message: " + senderMessgae);
                    }
                }));
            });
        }
    }));
});
resources_1.router.get("/getUserDetails/(:id)", (req, res) => {
    const { id } = req.params;
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.GET_USER_DETAILS, id, (err, result) => {
            if (err) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: err.code,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                const user = result[0];
                if (user) {
                    const { password } = user, user_details = __rest(user, ["password"]);
                    const dbResp = {
                        statusCode: resources_1.successCodes.SERVER_SUCCESS,
                        message: {
                            description: resources_1.successMessages.RETREIVE_USER_DETAILS_SUCCESS,
                            payload: user_details,
                        },
                    };
                    const resp = (0, resources_1.responseHandler)(dbResp);
                    res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
                }
            }
        });
    }
    catch (error) {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(resp.statusCode).json(resp);
    }
});
module.exports = resources_1.router;
