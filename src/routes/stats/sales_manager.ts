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


router.get('/getteachersundersalesmanager', (req, res) => {
    database.query(db_query.GET_TEACHERS_UNDER_SALES_MANAGER, (err, data) => {
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
 router.get('/getcountofteachersundersalesmanager/(:id)', (req, res) => {
    const { id } = req.params;

    database.query(db_query.GET_COUNT_TEACHERS_UNDER_SALES_MANAGER, [id], (err, data) => {
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
  router.get('/getcountofreferralsundersalesmanager', (req, res) => {
    // const { id } = req.params;

    database.query(db_query.GET_COUNT_REFERRALS_USED_UNDER_SALES_MANAGER, (err, data) => {
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
  module.exports = router