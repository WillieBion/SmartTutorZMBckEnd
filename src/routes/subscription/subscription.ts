import axios from "axios";
import { properties } from "../../appResources/applicationProperties";
import {
  BASE_URL,
  errorCodes,
  errorMessages,
  generateTransId,
  paymentMessages,
  responseHandler,
  router,
  successCodes,
  successMessages,
} from "../../appResources/resources";

import { database } from "../../instances/dbConfig";
import { db_query } from "../../instances/dbQuery";

router.post("/subscribe", (req, res) => {
  const { user_name, amount, msisdn, subscription } = req.body;
  /* Use MSISDN as identifier */
  const transID = generateTransId();

  try {
    database.query(
      db_query.ADD_SUBSCRIPTION_QRY,
      [user_name, transID, subscription],
      async (error, result) => {
        if (error) {
          const dbResp = {
            statusCode: errorCodes.INTERNAL_SERVER_ERROR,
            message: error.code,
          };
          const resp = responseHandler(dbResp);
          res.status(resp.statusCode).json(resp);
        } else {
          // const dbResp = {
          //   statusCode: successCodes.SERVER_SUCCESS,
          //   message: { description: successMessages.ADD_PAYMENT_SUCCESS },
          // };
          // const resp = responseHandler(dbResp);
          // res.status(successCodes.SERVER_SUCCESS).json(resp);

          /* Axios Headers */
          const headers = {
            "X-Authorization": properties.PAYMENT_API,
            "Content-Type": "application/json",
          };

          /* dataToPost */
          const dataToPost = {
            payer_number: msisdn,
            external_reference: transID,
            payment_narration: paymentMessages.NARRATION_MSG,
            currency: "ZMW",
            amount: amount,
          };

          /* Make primeNet post  */
          const primeResponse = await axios.post(
            `${BASE_URL}/api/v2/transaction/collect`,
            dataToPost,
            { headers }
          );
          if (primeResponse.status === 202) {
            console.log("Prompt was successfully sent");
            const dbResp = {
              statusCode: successCodes.SERVER_SUCCESS,
              message: { description: primeResponse.data.message },
            };

            const resp = responseHandler(dbResp);
            res.status(resp.statusCode).json(resp);
          } else {
            const dbResp = {
              statusCode: errorCodes.INTERNAL_SERVER_ERROR,
              message: { description: primeResponse.data.message },
            };

            const resp = responseHandler(dbResp);
            res.status(resp.statusCode).json(resp);
          }
        }
      }
    );
  } catch (error) {
    const dbResp = {
      statusCode: errorCodes.INTERNAL_SERVER_ERROR,
      message: errorMessages.INTERNAL_SERVER_ERROR,
    };
    const resp = responseHandler(dbResp);

    res.status(500).json(resp);
  }
});

/* Get Subscription details */

router.get("/getSubscriptionDetails", (req, res) => {
  // const { id } = req.params;

  database.query(db_query.GET_SUBSCRIPTION_DETAILS_QRY, (error, result) => {
    if (error) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      const dbResp = {
        statusCode: successCodes.SERVER_SUCCESS,
        message: result,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    }
  });
});

// Get Subscription status
router.get("/getSubscription/status/(:username)", (req, res) => {
  const { username } = req.params;

  database.query(db_query.GET_USER_DETAILS, [username], (error, result) => {
    const isValid = result[0]?.user_status === 2 ? true : false;
    console.log(isValid + " is_valid")
    if (error) {
      const dbResp = {
        success: false,
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      const { user_status } = result[0]

      const dbResp = {
        success: true,
        statusCode: successCodes.SERVER_SUCCESS,
        message: {
          isSubscribed: isValid,
        }
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);



    }
  });
});

router.post("/smartTutor/callback", (req, res) => {
  const {
    amount,
    final_status,
    transaction_id,
    payer_number,
    status_message,
    order_id,
  } = req.body;
  console.log("i am  body" + req.body);

  if (final_status === 300) {
    try {
      database.query(
        db_query.GET_USER_ID_BY_TRANSID,
        [order_id],
        (err, result) => {
          console.log(result);
          if (err) {
            const dbResp = {
              statusCode: errorCodes.INTERNAL_SERVER_ERROR,
              message: err.code,
            };
            const resp = responseHandler(dbResp);
            res.status(resp.statusCode).json(resp);
          } else {
            // const dbResp = {
            //   statusCode: successCodes.SERVER_SUCCESS,
            //   message: successMessages.UPDATED_SUBSCRIPTION_SUCCESS,
            // };
            // const resp = responseHandler(dbResp);
            // res.status(resp.statusCode).json(resp);
            // console.log("I am result: " + result[0]);
            database.query(
              db_query.UPDATE_USER_STATUS_QRY,
              [2, result[0].user_id],
              (err, result) => {
                if (err) {
                  const dbResp = {
                    statusCode: errorCodes.INTERNAL_SERVER_ERROR,
                    message: err.code,
                  };
                  const resp = responseHandler(dbResp);
                  res.status(resp.statusCode).json(resp);
                  return;
                } else {
                  const dbResp = {
                    statusCode: successCodes.SERVER_SUCCESS,
                    message: successMessages.UPDATED_SUBSCRIPTION_SUCCESS,
                  };
                  const resp = responseHandler(dbResp);
                  res.status(resp.statusCode).json(resp);
                }
              }
            );
          }
        }
      );
    } catch (error) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    }
  } else {
    const dbResp = {
      statusCode: errorCodes.INTERNAL_SERVER_ERROR,
      message: errorMessages.INTERNAL_SERVER_ERROR,
    };
    const resp = responseHandler(dbResp);
    res.status(resp.statusCode).json(resp);
  }
});
module.exports = router;
