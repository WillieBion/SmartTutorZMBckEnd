import dotenv from "dotenv";
// const dotenv = env;
dotenv.config();

export const properties = {
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  DB: process.env.DB,
  ENC_KEY: process.env.SALT_ROUNDS
};
