import {
  app,
  responseHandler,
  router,
  errorMessages,
  successCodes,
  successMessages,
  errorCodes,
} from "../../appResources/resources";
import { LoginI } from "../../appResources/types/userDetailTypes";
import { database } from "../../instances/dbConfig";
import { db_query } from "../../instances/dbQuery";

import bcrypt from "bcrypt";

router.post("/login", (req, res) => {
  console.log(req.body);
  const { msisdn, pin } = req.body;

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
        if (response){
            const {password, ...user} = result[0];

            //repetiton ====>>> needs refactoring
            const respo = {
                statusCode: successCodes.SERVER_SUCCESS,
                message: {description: successMessages.LOGIN_SUCCESS, user_details: user}, 
            }
            const resp = responseHandler(respo)
            res.status(resp.statusCode).json(resp);
        }else{
            const respo = {
                statusCode: errorCodes.BAD_REQUEST,
                message: errorMessages.USER_CREDENTIALS_WRONG
            }
            const resp = responseHandler(respo);

            res.status(resp.statusCode).json(resp);

        }
      });
    }else{
        const respo = {
            statusCode: errorCodes.NOT_FOUND_RESOURCE,
            message: errorMessages.USER_NOT_FOUND
        }
        const resp = responseHandler(respo);

        res.status(resp.statusCode).json(resp);
    }
  });
});

module.exports = router;