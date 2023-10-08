import { Sequelize } from "sequelize";
import mysql from "mysql";
import { properties } from "../appResources/applicationProperties";

export const database = mysql.createConnection({
  user: properties.DB_USER,
  host: properties.DB_HOST,
  password: properties.DB_PASS,
  database: properties.DB,
});
console.log(properties);
database.connect((err, conn) => {
    if (err){
        console.log("Database connection error" + err);
    }else{
        console.log("Database connection edu_app_prod"); 
    }
})
const db = "edu_app_prod";
const username = "root";
const password = "Willie#2045@1998";

export const sequelize = new Sequelize(db, username, password, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully. from 2");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database from 2: ", error);
  });
