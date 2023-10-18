"use strict";
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
const jwtToken_1 = require("../../appResources/jwtToken");
const dbConfig_1 = require("../../instances/dbConfig");
const dbQuery_1 = require("../../instances/dbQuery");
const bcrypt_1 = __importDefault(require("bcrypt"));
resources_1.router.post("/login", (req, res) => {
    console.log(req.body);
    const { msisdn, pin } = req.body;
    /* QUery DB */
    dbConfig_1.database.query(dbQuery_1.db_query.LOGIN_QRY, msisdn, (err, result) => {
        console.log(result);
        if (err) {
            const dbResp = {
                statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
            };
            const resp = (0, resources_1.responseHandler)(dbResp);
            res.status(resp.statusCode).json(resp);
        }
        if (result.length !== 0) {
            /*Compare bycrypt */
            bcrypt_1.default.compare(pin, result[0].password, (error, response) => {
                if (response) {
                    const _a = result[0], { password } = _a, user = __rest(_a, ["password"]);
                    const _b = result[0], { user_role, user_status } = _b, tokenGenerator = __rest(_b, ["user_role", "user_status"]);
                    const userAccToken = (0, jwtToken_1.generateToken)(tokenGenerator);
                    //repetiton ====>>> needs refactoring
                    const respo = {
                        statusCode: resources_1.successCodes.SERVER_SUCCESS,
                        message: {
                            description: resources_1.successMessages.LOGIN_SUCCESS,
                            user_details: user,
                        },
                        jwtToken: userAccToken
                    };
                    const resp = (0, resources_1.responseHandler)(respo);
                    res.status(resp.statusCode).json(resp);
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
            //repetiton ====>>> needs refactoring
            const respo = {
                statusCode: resources_1.errorCodes.NOT_FOUND_RESOURCE,
                message: resources_1.errorMessages.USER_NOT_FOUND,
            };
            const resp = (0, resources_1.responseHandler)(respo);
            res.status(resp.statusCode).json(resp);
        }
    });
});
module.exports = resources_1.router;
