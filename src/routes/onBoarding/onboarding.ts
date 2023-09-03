// const express = require('express');
import { error } from "console";
import {
  app,
  responseHandler,
  router,
  errorMessages,
  successCodes,
  successMessages,
} from "../../appResources/resources";
import { database } from "../../instances/dbConfig";
import bcrypt from "bcrypt";
import { properties } from "../../appResources/applicationProperties";
// const db = require('../../models');

router.post("/register", (req: any, res: any) => {
  console.log("Here I am " + req.body);
  const { msisdn, user_name, password, user_role, user_status } = req.body;

bcrypt.hash(password, Number(properties.ENC_KEY)).then((hash) => {
  database.query(
    "INSERT INTO user_details (msisdn, user_name, password, user_role, user_status) VALUES (?,?,?,?,?)",
    [msisdn, user_name, hash, user_role, user_status],
    (error, result) => {
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
          statusCode: error!.errno,
          message: errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = responseHandler(dbResp);
        res.status(resp.statusCode).json(resp);
      } else {
        console.log("We are a success, Welcome onboard");
        const {password, ...userDetails} = req.body
        console.log(userDetails)
        const dbResp = {
          statusCode: successCodes.SERVER_SUCCESS,
          message: {description: successMessages.WELCOME_ABOARD, user_details: userDetails},
        };
        const resp = responseHandler(dbResp);
        res.status(resp.statusCode).json(resp);
      }
    }
  );
}).catch((err) => {
  if (err){
    res.status(400).json({error: err.message});
  }
})

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

module.exports = router;
