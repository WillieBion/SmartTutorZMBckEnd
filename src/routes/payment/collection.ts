import {
  BASE_URL,
  errorCodes,
  errorMessages,
  responseHandler,
  router,
  successCodes,
  successMessages,
  paymentMessages,
  generateTransId,
} from "../../appResources/resources";
import { properties } from "../../appResources/applicationProperties";

import axios from "axios";

// const headers = {};

router.post("/collections", async (req, res) => {
  const { msisdn, amount } = req.body;

  const headers = {
    "X-Authorization": properties.PAYMENT_API,
    "Content-Type": "application/json",
  };
  const transID = generateTransId();
  const dataToPost = {
    payer_number: msisdn,
    external_reference: transID,
    payment_narration: paymentMessages.NARRATION_MSG,
    currency: "ZMW",
    amount: amount,
  };

  try {
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
    }
  } catch (error) {
    const dbResp = {
      statusCode: errorCodes.INTERNAL_SERVER_ERROR,
      message: errorMessages.INTERNAL_SERVER_ERROR,
    };
    const resp = responseHandler(dbResp);

    res.status(500).json(resp);
  }

  // else {
  //   // console.log("Prompt failed: " + primeResponse.status);
  //   res.status(500).json(primeResponse.data);
  // }
});

/* Need to add reimbursement and disburesments */

module.exports = router;
