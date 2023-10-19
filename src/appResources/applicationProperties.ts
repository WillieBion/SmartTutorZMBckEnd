import dotenv from "dotenv";
// const dotenv = env;
dotenv.config();

export const properties = {
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB: process.env.DB,
  ENC_KEY: process.env.SALT_ROUNDS,
  PAYMENT_API: process.env.PRIMENET_API_KEY,
  SMS_API: process.env.BULKSMS_API_KEY,
  SMS_SENDERID: process.env.SMS_SENDERID,
  OPENAI_KEY: process.env.OPENAI_API_KEY
};
