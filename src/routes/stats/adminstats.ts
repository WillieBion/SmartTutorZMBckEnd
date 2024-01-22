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
  database.query(db_query.ADMIN_GET_USER_DATA_WITH_PRICE, (err, data) => {
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

router.get('/getweeklyappusers', (req, res) => {
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

//Return Daily number of new users, subscriptions and referrals_used
router.get('/getdailynewuser', (req, res) => {
  database.query(db_query.GET_DAILY_NUMBER_NEW_USERS_SUBS_RC, (err, data) => {
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

//Return msisdn, referral code, monthly subscription, termly subscription and commission. (Teacher)

router.get('/getteacherreferralsubscriptions', (req, res) => {
  database.query(db_query.GET_TEACHER_RC_SUBS, (err, data) => {
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


router.get('/getadminreferralsubscriptions', (req, res) => {
  database.query(db_query.GET_ADMIN_RC_SUBS, (err, data) => {
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

router.get('/getadmintotaluserssubscribersteacherssales', (req, res) => {
  database.query(db_query.GET_COUNT_USERS_ACTIVE_INACTIVE_TEACHERS, (err, data) => {
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

router.get('/getteacherdatamsisdnreferralmonthlytermly', (req, res) => {
  database.query(db_query.GET_SUBS_RC_TEACHER, (err, data) => {
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





module.exports = router;