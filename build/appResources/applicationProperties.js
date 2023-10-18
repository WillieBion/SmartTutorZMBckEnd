"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.properties = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// const dotenv = env;
dotenv_1.default.config();
exports.properties = {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST,
    DB: process.env.DB,
    ENC_KEY: process.env.SALT_ROUNDS,
    PAYMENT_API: process.env.PRIMENET_API_KEY,
    SMS_API: process.env.BULKSMS_API_KEY,
    SMS_SENDERID: process.env.SMS_SENDERID
};
