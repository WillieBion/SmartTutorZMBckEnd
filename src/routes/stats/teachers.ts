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

// return students actively using referral teachers referral_id
router.get('/getstudentsactivelyusingreferral/(:id)', (req, res) => {
    const { id } = req.params;

    database.query(db_query.GET_STUDENTS_ACTIVELY_USING_REFERRAL_CODE, [id], (err, data) => {
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

  /////////
  router.get('/getcountandsubscriptionsofstudentusingteacherreferral/(:id)', (req, res) => {
    const { id } = req.params;

    database.query(db_query.GET_COUNT_OF_STUDENTS_SUBSCRIPTION_TEACHER_REFERRAL, [id], (err, data) => {
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