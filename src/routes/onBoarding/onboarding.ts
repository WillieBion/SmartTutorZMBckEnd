// const express = require('express');
import { error } from "console";
import {
  app,
  responseHandler,
  router,
  errorMessages,
  successCodes,
  successMessages,
  errorCodes,
  generateOTP,
} from "../../appResources/resources";
import { database } from "../../instances/dbConfig";
import bcrypt from "bcrypt";
import { properties } from "../../appResources/applicationProperties";
import { db_query } from "../../instances/dbQuery";
import axios from "axios";
import { generateToken } from "../../appResources/jwtToken";
// const db = require('../../models');

router.post("/register", (req: any, res: any) => {
  console.log("Here I am " + req.body);
  const { msisdn, user_name, password, user_role, user_status } = req.body;

  bcrypt
    .hash(password, Number(properties.ENC_KEY))
    .then((hash) => {
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
              statusCode: errorCodes.INTERNAL_SERVER_ERROR,
              message: errorMessages.INTERNAL_SERVER_ERROR,
            };
            const resp = responseHandler(dbResp);
            res.status(resp.statusCode).json(resp);
          } else {
            console.log("We are a success, Welcome onboard");
            const { password, ...userDetails } = req.body;
            const tokenGenerator = { msisdn, user_name, password: hash };

            const userAccToken = generateToken(tokenGenerator);

            console.log(userDetails);
            const dbResp = {
              statusCode: successCodes.SERVER_SUCCESS,
              message: {
                description: successMessages.WELCOME_ABOARD,
                user_details: userDetails,
              },
              jwtToken: userAccToken
            };
            const resp = responseHandler(dbResp);
            res.status(resp.statusCode).json(resp);
          }
        }
      );
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
    });

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

/* Change Password */

router.post("/verifypassword/(:msisdn)", (req, res) => {
  const { msisdn } = req.params;
  const { current_password } = req.body;

  // let
  try {
    database.query(db_query.GET_PASSWORD_QRY, [msisdn], (err, result) => {
      if (err) {
        const dbResp = {
          statusCode: errorCodes.INTERNAL_SERVER_ERROR,
          message: errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = responseHandler(dbResp);
        res.status(resp.statusCode).json(resp);
      }

      // res.status(200).json(result[0])
      if (result.length !== 0) {
        bcrypt.compare(
          current_password,
          result[0].password,
          (error, response) => {
            if (response) {
              // database.query(db_query.UPDATE_PASSWORD_QRY, [])
              const dbResp = {
                statusCode: successCodes.SERVER_SUCCESS,
                message: {
                  success: true,
                  description: successMessages.MATCHING_PASSWORD_SUCCESS,
                },
              };
              const resp = responseHandler(dbResp);
              res.status(successCodes.SERVER_SUCCESS).json(resp);
            } else {
              const respo = {
                statusCode: errorCodes.BAD_REQUEST,
                message: errorMessages.USER_CREDENTIALS_WRONG,
              };
              const resp = responseHandler(respo);

              res.status(resp.statusCode).json(resp);
            }
          }
        );
      } else {
        const respo = {
          statusCode: errorCodes.NOT_FOUND_RESOURCE,
          message: errorMessages.USER_NOT_FOUND,
        };
        const resp = responseHandler(respo);

        res.status(resp.statusCode).json(resp);
      }
    });
  } catch (error) {
    const respo = {
      statusCode: errorCodes.INTERNAL_SERVER_ERROR,
      message: errorMessages.INTERNAL_SERVER_ERROR,
    };
    const resp = responseHandler(respo);

    res.status(resp.statusCode).json(resp);
  }
});

router.put("/updatepassword/(:msisdn)", (req, res) => {
  const { msisdn } = req.params;
  const { password } = req.body;

  bcrypt
    .hash(password, Number(properties.ENC_KEY))
    .then((hash) => {
      database.query(
        db_query.UPDATE_PASSWORD_QRY,
        [hash, msisdn],
        (error, result) => {
          if (error) {
            const dbResp = {
              statusCode: errorCodes.INTERNAL_SERVER_ERROR,
              message: error.code,
            };
            const resp = responseHandler(dbResp);
            res.status(resp.statusCode).json(resp);
          } else {
            const dbResp = {
              statusCode: successCodes.SERVER_SUCCESS,
              message: { description: successMessages.UPDATE_PASSWORD_SUCCESS },
            };
            const resp = responseHandler(dbResp);
            res.status(successCodes.SERVER_SUCCESS).json(resp);
          }
        }
      );
    })
    .catch((error) => {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);

      res.status(500).json(resp);
    });

  // try {
  //   database.query(
  //     db_query.UPDATE_PASSWORD_QRY,
  //     [password, msisdn],
  //     (error, result) => {
  //       if (error) {
  //         const dbResp = {
  //           statusCode: errorCodes.INTERNAL_SERVER_ERROR,
  //           message: error.code,
  //         };
  //         const resp = responseHandler(dbResp);
  //         res.status(resp.statusCode).json(resp);
  //       } else {
  //         const dbResp = {
  //           statusCode: successCodes.SERVER_SUCCESS,
  //           message: { description: successMessages.UPDATE_PASSWORD_SUCCESS },
  //         };
  //         const resp = responseHandler(dbResp);
  //         res.status(successCodes.SERVER_SUCCESS).json(resp);
  //       }
  //     }
  //   );
  // } catch (error) {
  //   const dbResp = {
  //     statusCode: errorCodes.INTERNAL_SERVER_ERROR,
  //     message: errorMessages.INTERNAL_SERVER_ERROR,
  //   };
  //   const resp = responseHandler(dbResp);

  //   res.status(500).json(resp);
  // }
});

router.post("/forgotpassword/otp", (req, res) => {
  const { user_name } = req.body;

  database.query(
    db_query.VERIFY_USERNAME_QRY,
    [user_name],
    async (error, result) => {
      if (error) {
        const dbResp = {
          statusCode: errorCodes.INTERNAL_SERVER_ERROR,
          message: error.code,
        };
        const resp = responseHandler(dbResp);
        res.status(resp.statusCode).json(resp);
      }
      // res.status(200).json(result.length);
      if (result.length !== 0) {
        const { senderMessgae, otp } = generateOTP();
        /* Update password to OTP  */
        bcrypt.hash(otp, Number(properties.ENC_KEY)).then((hash) => {
          database.query(
            db_query.UPDATE_PASSWORD_QRY,
            [hash, user_name],
            async (err, response) => {
              if (err) {
                const dbResp = {
                  statusCode: errorCodes.INTERNAL_SERVER_ERROR,
                  message: err.code,
                };
                const resp = responseHandler(dbResp);
                res.status(resp.statusCode).json(resp);
                return;
              }

              const bulkSMSResponse = await axios.get(
                `https://bulksms.zamtel.co.zm/api/v2.1/action/send/api_key/${properties.SMS_API}/contacts/${user_name}/senderId/${properties.SMS_SENDERID}/message/${senderMessgae}`
              );

              if (bulkSMSResponse.data.success === true) {
                // res.status(200).json(bulkSMSResponse.data);
                const dbResp = {
                  statusCode: successCodes.SERVER_SUCCESS,
                  message: {
                    description: successMessages.FORGOT_PASSWORD_SUCCESS,
                  },
                };
                const resp = responseHandler(dbResp);
                res.status(successCodes.SERVER_SUCCESS).json(resp);
                console.log("OTP: " + otp, "\n " + "message: " + senderMessgae);
              }
            }
          );
        });
      }
    }
  );
});

router.get("/getUserDetails/(:id)", (req, res) => {
  const { id } = req.params;
  try {
    database.query(db_query.GET_USER_DETAILS, id, (err, result) => {
      if (err) {
        const dbResp = {
          statusCode: errorCodes.INTERNAL_SERVER_ERROR,
          message: err.code,
        };
        const resp = responseHandler(dbResp);
        res.status(resp.statusCode).json(resp);
      } else {
        const user = result[0];
        if (user) {
          const { password, ...user_details } = user;
          const dbResp = {
            statusCode: successCodes.SERVER_SUCCESS,
            message: {
              description: successMessages.RETREIVE_USER_DETAILS_SUCCESS,
              payload: user_details,
            },
          };

          const resp = responseHandler(dbResp);
          res.status(successCodes.SERVER_SUCCESS).json(resp);
        }
      }
    });
  } catch (error) {
    const dbResp = {
      statusCode: errorCodes.INTERNAL_SERVER_ERROR,
      message: errorMessages.INTERNAL_SERVER_ERROR,
    };
    const resp = responseHandler(dbResp);

    res.status(resp.statusCode).json(resp);
  }
});

module.exports = router;
