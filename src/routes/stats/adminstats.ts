import {
  errorCodes,
  errorMessages,
  responseHandler,
  router,
  successCodes,
  successMessages,
} from "../../appResources/resources";
import { database } from "../../instances/dbConfig";
import { db_query } from "../../instances/dbQuery";


router.get('/getuser/data', (req, res) => {
  //queryDB 
  database.query(db_query.ADMIN_GET_USER_DATA, (err, data) => {
    if (err) {
      console.log(err + "error")
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: err.code,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      const dbResp = {
        statusCode: successCodes.SERVER_SUCCESS,
        message: data,
      };

      const resp = responseHandler(dbResp);
      res.status(successCodes.SERVER_SUCCESS).json(resp);
    }
  })
})

/* Get new subscription adding up to a week */

router.get('/getweeklysubscriptions', (req, res) => {
  database.query(db_query.ADMIN_GET__WEEKLY_APP_SUBSCRIBERS, (err, data) => {
    if (err) {
      console.log(err + "error")
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: err.code,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      const dbResp = {
        statusCode: successCodes.SERVER_SUCCESS,
        message: data,
      };

      const resp = responseHandler(dbResp);
      res.status(successCodes.SERVER_SUCCESS).json(resp);
    }
  })
})

/* Get new users adding up to a week */

router.get('/getweeklysubscriptions', (req, res) => {
  database.query(db_query.ADMIN_GET_WEEKLY_APP_USERS, (err, data) => {
    if (err) {
      console.log(err + "error")
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: err.code,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      const dbResp = {
        statusCode: successCodes.SERVER_SUCCESS,
        message: data,
      };

      const resp = responseHandler(dbResp);
      res.status(successCodes.SERVER_SUCCESS).json(resp);
    }
  })
})

//

module.exports = router;