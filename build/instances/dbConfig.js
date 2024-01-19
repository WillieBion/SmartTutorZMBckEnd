"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.database = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = __importDefault(require("mysql"));
const applicationProperties_1 = require("../appResources/applicationProperties");
exports.database = mysql_1.default.createConnection({
    user: applicationProperties_1.properties.DB_USER,
    host: applicationProperties_1.properties.DB_HOST,
    password: applicationProperties_1.properties.DB_PASS,
    database: applicationProperties_1.properties.DB,
});
console.log(applicationProperties_1.properties);
exports.database.connect((err, conn) => {
    if (err) {
        console.log("Database connection error" + err);
    }
    else {
        console.log("Database connection smart_tutor_prod");
    }
});
const db = "smart_tutor_prod";
const username = "root";
const password = "root";
exports.sequelize = new sequelize_1.Sequelize(db, username, password, {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully. from 2");
})
    .catch((error) => {
    console.error("Unable to connect to the database from 2: ", error);
});
