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
const resources_1 = require("../../appResources/resources");
const applicationProperties_1 = require("../../appResources/applicationProperties");
const axios_1 = __importDefault(require("axios"));
const dbQuery_1 = require("../../instances/dbQuery");
const dbConfig_1 = require("../../instances/dbConfig");
// const headers = {};
resources_1.router.post("/collections", (req, res) => {
    const { msisdn, amount } = req.body;
    const headers = {
        "X-Authorization": applicationProperties_1.properties.PAYMENT_API,
        "Content-Type": "application/json",
    };
    // const transID = generateTransId();
    dbConfig_1.database.query(dbQuery_1.db_query.GET_TRANSID_QRY, [msisdn], (error, result) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Yeah: " + result);
        if (error) {
            const dbResp = {
                statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                message: error.code,
            };
            const resp = (0, resources_1.responseHandler)(dbResp);
            res.status(resp.statusCode).json(resp);
        }
        else {
            console.log("Yeah: " + result[0].trans_id);
            const dataToPost = {
                payer_number: msisdn,
                external_reference: result[0].trans_id,
                payment_narration: resources_1.paymentMessages.NARRATION_MSG,
                currency: "ZMW",
                amount: amount,
            };
            // console.log(dataToPost)
            // const dbResp = {
            //   statusCode: successCodes.SERVER_SUCCESS,
            //   message: { description: successMessages.RETREIVE_TRANSID_SUCCESS },
            // };
            // const resp = responseHandler(dbResp);
            // res.status(successCodes.SERVER_SUCCESS).json(resp);
            try {
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
            }
            catch (error) {
                console.log(error);
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(500).json(resp);
            }
        }
    }));
    // else {
    //   // console.log("Prompt failed: " + primeResponse.status);
    //   res.status(500).json(primeResponse.data);
    // }
});
/* RECEIPT */
resources_1.router.post("/onPayment/receipt", (req, res) => {
    const { amount, period, user_id } = req.body;
    /* Use MSISDN as identifier */
    const transID = (0, resources_1.generateTransId)();
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.ADD_RECEIPT_QRY, [transID, amount, period, user_id], (error, result) => {
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
                    message: { description: resources_1.successMessages.ADD_PAYMENT_SUCCESS },
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
            }
        });
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
/* Need to add reimbursement and disburesments */
module.exports = resources_1.router;
