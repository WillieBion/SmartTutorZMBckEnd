import {
  app,
  responseHandler,
  router,
  errorMessages,
  successCodes,
  successMessages,
  errorCodes,
} from "../../appResources/resources";
import { generateToken } from "../../appResources/jwtToken";
import { LoginI } from "../../appResources/types/userDetailTypes";
import { database } from "../../instances/dbConfig";
import { db_query } from "../../instances/dbQuery";

import bcrypt from "bcrypt";
import db from "../../models";

router.post("/login", (req, res) => {
  console.log(req.body);
  const { msisdn, pin, device_id } = req.body;

  database.query(db_query.GET_SESSION_QRY, msisdn, (err, session) => {
    console.log(session)
    if (err) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else if (session[0]?.user_name === msisdn && session[0]?.device_id !== device_id) {
      // const {user_name, device_id, token, is_valid} = session[0];

      const respo = {
        statusCode: errorCodes.BAD_REQUEST,
        message: `User with phone number ${msisdn} is already logged in`,
      };
      const resp = responseHandler(respo);

      res.status(resp.statusCode).json(resp);
    } else if (session[0]?.user_name === msisdn && session[0].device_id === device_id) {
      database.query(db_query.LOGIN_QRY, msisdn, (err, result: LoginI[]) => {
        console.log(result);
        if (err) {
          const dbResp = {
            statusCode: errorCodes.INTERNAL_SERVER_ERROR,
            message: errorMessages.INTERNAL_SERVER_ERROR,
          };
          const resp = responseHandler(dbResp);
          res.status(resp.statusCode).json(resp);
        }
        if (result.length !== 0) {
          /*Compare bycrypt */
          bcrypt.compare(pin, result[0].password, (error, response) => {
            if (response) {
              const { password, ...user } = result[0];
              const { msisdn, user_name } = result[0]
              // tokenGenerator.device_id = device_id
              const tokenGenerator = { msisdn, user_name, password, device_id }

              const userAccToken = generateToken(tokenGenerator);
              // const is_valid = true;
              //Write the session to sessions table


              const respo = {
                statusCode: successCodes.SERVER_SUCCESS,
                message: {
                  description: successMessages.LOGIN_SUCCESS,
                  user_details: user,
                },
                jwtToken: userAccToken
              };
              const resp = responseHandler(respo);
              res.status(resp.statusCode).json(resp);



              //repetiton ====>>> needs refactoring

            } else {
              const respo = {
                statusCode: errorCodes.BAD_REQUEST,
                message: errorMessages.USER_CREDENTIALS_WRONG,
              };
              const resp = responseHandler(respo);

              res.status(resp.statusCode).json(resp);
            }
          });
        } else {
          //repetiton ====>>> needs refactoring

          const respo = {
            statusCode: errorCodes.NOT_FOUND_RESOURCE,
            message: errorMessages.USER_NOT_FOUND,
          };
          const resp = responseHandler(respo);

          res.status(resp.statusCode).json(resp);
        }
      });
    } else {
      /* QUery DB */
      database.query(db_query.LOGIN_QRY, msisdn, (err, result: LoginI[]) => {
        console.log(result);
        if (err) {
          const dbResp = {
            statusCode: errorCodes.INTERNAL_SERVER_ERROR,
            message: errorMessages.INTERNAL_SERVER_ERROR,
          };
          const resp = responseHandler(dbResp);
          res.status(resp.statusCode).json(resp);
        }
        if (result.length !== 0) {
          /*Compare bycrypt */
          bcrypt.compare(pin, result[0].password, (error, response) => {
            if (response) {
              const { password, ...user } = result[0];
              const { msisdn, user_name } = result[0]
              // tokenGenerator.device_id = device_id
              const tokenGenerator = { msisdn, user_name, password, device_id }
              const userAccToken = generateToken(tokenGenerator);
              const is_valid = true;
              //Write the session to sessions table
              database.query(db_query.ADD_SESSION_QRY, [msisdn, device_id, is_valid], (err, addSession) => {
                if (err) {
                  console.log(err)
                } else {
                  const respo = {
                    statusCode: successCodes.SERVER_SUCCESS,
                    message: {
                      description: successMessages.LOGIN_SUCCESS,
                      user_details: user,
                    },
                    jwtToken: userAccToken
                  };
                  const resp = responseHandler(respo);
                  res.status(resp.statusCode).json(resp);
                }
              })

              //repetiton ====>>> needs refactoring

            } else {
              const respo = {
                statusCode: errorCodes.BAD_REQUEST,
                message: errorMessages.USER_CREDENTIALS_WRONG,
              };
              const resp = responseHandler(respo);

              res.status(resp.statusCode).json(resp);
            }
          });
        } else {
          //repetiton ====>>> needs refactoring

          const respo = {
            statusCode: errorCodes.NOT_FOUND_RESOURCE,
            message: errorMessages.USER_NOT_FOUND,
          };
          const resp = responseHandler(respo);

          res.status(resp.statusCode).json(resp);
        }
      });
    }
  })
  return;


});

//Log out session 
router.post('/logout', (req, res) => {
  const { user_name } = req.body
  //Delete session
  database.query(db_query.DELETE_SESSION_QRY, [user_name], (err, result) => {
    if (err) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      console.log("result: :" + result[0])
      // if (typeof result[0] !== 'undefined') {
      const respo = {
        statusCode: successCodes.SERVER_SUCCESS,
        message: successMessages.LOGOUT_SUCCESS
      };
      const resp = responseHandler(respo);

      res.status(resp.statusCode).json(resp);
      // } else {
      //   const respo = {
      //     statusCode: errorCodes.BAD_REQUEST,
      //     message: errorMessages.USER_NOT_FOUND
      //   };
      //   const resp = responseHandler(respo);

      //   res.status(resp.statusCode).json(resp);
      // }

    }

  })
})

//Same as log out but for device log out
router.post('/devicelogout', (req, res) => {
  const { user_name } = req.body
  //Delete session
  database.query(db_query.DELETE_SESSION_QRY, [user_name], (err, result) => {
    if (err) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      console.log("result: :" + result[0])
      // if (typeof result[0] !== 'undefined') {
      const respo = {
        statusCode: successCodes.SERVER_SUCCESS,
        message: successMessages.LOGOUT_SUCCESS
      };
      const resp = responseHandler(respo);

      res.status(resp.statusCode).json(resp);
      // } else {
      //   const respo = {
      //     statusCode: errorCodes.BAD_REQUEST,
      //     message: errorMessages.USER_NOT_FOUND
      //   };
      //   const resp = responseHandler(respo);

      //   res.status(resp.statusCode).json(resp);
      // }

    }

  })
})

//Authenticated route
router.get('/authenticated', (req, res) => {
  // const {} = req.query;
  // console.log(req.headers.user_name);
  const { user_name, device_id } = req.headers;
  database.query(db_query.GET_SESSION_AUTH_STATUS_QRY, [user_name, device_id], (err, result) => {
    const isValid = result[0]?.is_valid === 1 ? true : false;
    console.log(isValid + " is_valid")
    if (err) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      if (user_name === result[0]?.user_name || device_id === result[0]?.device_id) {

        const respo = {
          statusCode: successCodes.SERVER_SUCCESS,
          message: {
            isAuthenticated: isValid,
            description: successMessages.USER_AUTHENTICATION_STATUS
          },
        };
        const resp = responseHandler(respo);

        res.status(resp.statusCode).json(resp);
      } else {
        const respo = {
          statusCode: errorCodes.BAD_REQUEST,
          message: {
            isAuthenticated: isValid,
            description: errorMessages.USER_AUTHENTICATION_STATUS_FAILED
          },
        };
        const resp = responseHandler(respo);

        res.status(resp.statusCode).json(resp);
      }
    }
  })

})

//Dashboard login

/* Login */
router.post('/dashboard/login', (req, res) => {
  const { msisdn, pin, device_id } = req.body

  // bcrypt.compare()
  database.query(db_query.LOGIN_QRY, msisdn, (err, result: any) => {
    if (err) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      if (result.length !== 0) {
        bcrypt.compare(pin, result[0].password, (err, response) => {
          if (response) {
            const { password, ...user } = result[0];
            const { msisdn, user_name } = result[0];

            const tokenGenerator = { msisdn, user_name, password, device_id };

            const userAccToken = generateToken(tokenGenerator);

            if (user.user_role == 4){
              database.query(db_query.GET_TEACHER_REFERRAL_CODE, [msisdn], (err, result) => {
                if (err){
                  console.log(err)
                  const dbResp = {
                    statusCode: errorCodes.INTERNAL_SERVER_ERROR,
                    message: errorMessages.INTERNAL_SERVER_ERROR,
                  };
                  const resp = responseHandler(dbResp);
                  res.status(resp.statusCode).json(resp);
                  // return;
                }else if (result.length > 0 ) {
                  // user.referral
                   const code = result[0].code;
                  user.referralId = code
                  // const user_details = {
                  //   user,
                  //   code

                  // }
                 
                  const respo = {
                    statusCode: successCodes.SERVER_SUCCESS,
                    message: {
                      description: successMessages.LOGIN_SUCCESS,
                      user_details: user
                    },
                    jwtToken: userAccToken
                  };
                  const resp = responseHandler(respo);
                  res.status(resp.statusCode).json(resp);
                } else {
                  const respo = {
                    statusCode: errorCodes.NOT_FOUND_RESOURCE,
                    message: errorMessages.USER_NOT_FOUND,
                  };
                  const resp = responseHandler(respo);
          
                  res.status(resp.statusCode).json(resp);
                }
              })
            }else if (user.user_role == 3){
              database.query(db_query.GET_SALES_MANAGER_ID, [msisdn], (err, result) => {
                console.log(user.user_role + "user role\n")
                if (err){
                  console.log(err)
                  const dbResp = {
                    statusCode: errorCodes.INTERNAL_SERVER_ERROR,
                    message: errorMessages.INTERNAL_SERVER_ERROR,
                  };
                  const resp = responseHandler(dbResp);
                  res.status(resp.statusCode).json(resp);
                  // return;
                }else if (result.length > 0 ) {
                  // user.referral
                  const sales_manager_id = result[0].id;
                  user.userId = sales_manager_id
                  // const user_details = {
                  //   user,
                  //   sales_manager_id

                  // }
                  const respo = {
                    statusCode: successCodes.SERVER_SUCCESS,
                    message: {
                      description: successMessages.LOGIN_SUCCESS,
                      user_details: user
                    },
                    jwtToken: userAccToken
                  };
                  const resp = responseHandler(respo);
                  res.status(resp.statusCode).json(resp);
                }else {
                  const respo = {
                    statusCode: errorCodes.NOT_FOUND_RESOURCE,
                    message: errorMessages.USER_NOT_FOUND,
                  };
                  const resp = responseHandler(respo);
          
                  res.status(resp.statusCode).json(resp);
                }
              })
            }

        

          
          } else {
            const respo = {
              statusCode: errorCodes.BAD_REQUEST,
              message: errorMessages.USER_CREDENTIALS_WRONG,
            };
            const resp = responseHandler(respo);

            res.status(resp.statusCode).json(resp);
          }

        })


      } else {
        const respo = {
          statusCode: errorCodes.NOT_FOUND_RESOURCE,
          message: errorMessages.USER_NOT_FOUND,
        };
        const resp = responseHandler(respo);

        res.status(resp.statusCode).json(resp);
      }
    }
  })

})

//Delete user
router.get('/delete/account/(:username)', (req, res) => {
  const { username } = req.params
  //If session delete session first.
  //Delete session
  database.query(db_query.DELETE_SESSION_QRY, [username], (err, result) => {
    if (err) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: err.code,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      // console.log("result: :" + result[0])
      // // if (typeof result[0] !== 'undefined') {
      // const respo = {
      //   statusCode: successCodes.SERVER_SUCCESS,
      //   message: successMessages.LOGOUT_SUCCESS
      // };
      // const resp = responseHandler(respo);

      // res.status(resp.statusCode).json(resp);
      database.query(db_query.DELETE_USER_DETAILS, [username], (error, result) => {
        if (error) {
          const dbResp = {
            statusCode: errorCodes.INTERNAL_SERVER_ERROR,
            message: error.code,
          };
          const resp = responseHandler(dbResp);
          res.status(resp.statusCode).json(resp);
        } else {
          const respo = {
            statusCode: successCodes.SERVER_SUCCESS,
            message: successMessages.DELETE_USER
          };
          const resp = responseHandler(respo);
          res.status(resp.statusCode).json(resp);
        }

      })

    }

  })

})

//This is not how I write my endpoints. This is all Bion
router.get("/delete-request/(:username)", (req, res) => {
  const { username } = req.params;

  /* check db that the msisdn provided is there */

  if (username) {
    res
      .status(200)
      .json({
        message: `Request to delete account holder ${username} has been successfully submitted`,
      });
  } else {
    res.status(500).json({ message: "An error occured" });
  }
});
module.exports = router;
