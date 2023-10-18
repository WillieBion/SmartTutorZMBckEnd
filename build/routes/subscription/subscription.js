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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const applicationProperties_1 = require("../../appResources/applicationProperties");
const resources_1 = require("../../appResources/resources");
const dbConfig_1 = require("../../instances/dbConfig");
const dbQuery_1 = require("../../instances/dbQuery");
resources_1.router.post("/subscribe", (req, res) => {
    const { user_name, amount, msisdn, subscription } = req.body;
    /* Use MSISDN as identifier */
    const transID = (0, resources_1.generateTransId)();
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.ADD_SUBSCRIPTION_QRY, [user_name, transID, subscription], (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: error.code,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                // const dbResp = {
                //   statusCode: successCodes.SERVER_SUCCESS,
                //   message: { description: successMessages.ADD_PAYMENT_SUCCESS },
                // };
                // const resp = responseHandler(dbResp);
                // res.status(successCodes.SERVER_SUCCESS).json(resp);
                /* Axios Headers */
                const headers = {
                    "X-Authorization": applicationProperties_1.properties.PAYMENT_API,
                    "Content-Type": "application/json",
                };
                /* dataToPost */
                const dataToPost = {
                    payer_number: msisdn,
                    external_reference: transID,
                    payment_narration: resources_1.paymentMessages.NARRATION_MSG,
                    currency: "ZMW",
                    amount: amount,
                };
                /* Make primeNet post  */
                const primeResponse = yield axios_1.default.post(`${resources_1.BASE_URL}/api/v2/transaction/collect`, dataToPost, { headers });
                if (primeResponse.status === 202) {
                    console.log("Prompt was successfully sent");
                    const dbResp = {
                        statusCode: resources_1.successCodes.SERVER_SUCCESS,
                        message: { description: primeResponse.data.message },
                    };
                    const resp = (0, resources_1.responseHandler)(dbResp);
                    res.status(resp.statusCode).json(resp);
                }
                else {
                    const dbResp = {
                        statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                        message: { description: primeResponse.data.message },
                    };
                    const resp = (0, resources_1.responseHandler)(dbResp);
                    res.status(resp.statusCode).json(resp);
                }
            }
        }));
    }
    catch (error) {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(500).json(resp);
    }
});
/* Get Subscription details */
resources_1.router.get("/getSubscriptionDetails", (req, res) => {
    // const { id } = req.params;
    dbConfig_1.database.query(dbQuery_1.db_query.GET_SUBSCRIPTION_DETAILS_QRY, (error, result) => {
        if (error) {
            const dbResp = {
                statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
            };
            const resp = (0, resources_1.responseHandler)(dbResp);
            res.status(resp.statusCode).json(resp);
        }
        else {
            const dbResp = {
                statusCode: resources_1.successCodes.SERVER_SUCCESS,
                message: result,
            };
            const resp = (0, resources_1.responseHandler)(dbResp);
            res.status(resp.statusCode).json(resp);
        }
    });
});
resources_1.router.post("/smartTutor/callback", (req, res) => {
    const { amount, final_status, transaction_id, payer_number, status_message, order_id, } = req.body;
    console.log("i am  body" + req.body);
    if (final_status === 300) {
        try {
            dbConfig_1.database.query(dbQuery_1.db_query.GET_USER_ID_BY_TRANSID, [order_id], (err, result) => {
                console.log(result);
                if (err) {
                    const dbResp = {
                        statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                        message: err.code,
                    };
                    const resp = (0, resources_1.responseHandler)(dbResp);
                    res.status(resp.statusCode).json(resp);
                }
                else {
                    // const dbResp = {
                    //   statusCode: successCodes.SERVER_SUCCESS,
                    //   message: successMessages.UPDATED_SUBSCRIPTION_SUCCESS,
                    // };
                    // const resp = responseHandler(dbResp);
                    // res.status(resp.statusCode).json(resp);
                    // console.log("I am result: " + result[0]);
                    dbConfig_1.database.query(dbQuery_1.db_query.UPDATE_USER_STATUS_QRY, [2, result[0].user_id], (err, result) => {
                        if (err) {
                            const dbResp = {
                                statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                                message: err.code,
                            };
                            const resp = (0, resources_1.responseHandler)(dbResp);
                            res.status(resp.statusCode).json(resp);
                            return;
                        }
                        else {
                            const dbResp = {
                                statusCode: resources_1.successCodes.SERVER_SUCCESS,
                                message: resources_1.successMessages.UPDATED_SUBSCRIPTION_SUCCESS,
                            };
                            const resp = (0, resources_1.responseHandler)(dbResp);
                            res.status(resp.statusCode).json(resp);
                        }
                    });
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
    }
    else {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(resp.statusCode).json(resp);
    }
});
module.exports = resources_1.router;
