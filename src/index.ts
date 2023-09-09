import express from "express";
const app = express();
// import * as db from './models';

// const router = express.Router();
// const Sequelize = require("sequelize");
import { Sequelize } from "sequelize";



//
app.use(express.json());

const PORT = 1430;

const sequelize = new Sequelize("edu_app", "root", "Willie#2045@1998", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database: ", error);
  });

//Routes Auth
const onbaording = require("./routes/onBoarding/onboarding");
const login = require("./routes/Auth/login")

// Routes Subjects
const contentManagement =  require("./routes/contentManagement/subjects")

//use routes
app.use("/", onbaording);
app.use("/", login)
app.use("/contentManagement", contentManagement)
// console.log("onbaording: " + db.user_details);
sequelize.sync().then(() => {
  app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`)
  })
}).catch((err: any) => {
  console.log("This could be the error ==>", err)
})
