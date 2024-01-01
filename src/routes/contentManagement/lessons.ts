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

router.post("/AddLesson", (req, res) => {
  // const { title, description, topic, media_type, duration, link } = req.body;
  const { title, duration, media_type, media_value, subject_id } = req.body;

  try {
    database.query(
      db_query.ADD_LESSON_QRY,
      [title, duration, media_type, media_value, subject_id],
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
            message: { description: successMessages.ADD_LESSON_SUCCESS },
          };
          const resp = responseHandler(dbResp);
          res.status(successCodes.SERVER_SUCCESS).json(resp);
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

router.get("/getLessonBySubject/(:id)", (req, res) => {
  const { id } = req.params;
  database.query(db_query.GET_LESSON_BY_SUBJECT, id, (err, result) => {
    if (err) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: err.code,
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

router.get('/delete/lessonByID/(:id)', (req, res) => {
  const { id } = req.params
  console.log("id is " + id)
  let removeQuery = db_query.deleteQuery("lessons", "id")
  console.log(removeQuery)
  database.query(removeQuery, id, (err, result) => {
    if (err) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      if (result.affectedRows > 0) {
        const dbResp = {
          statusCode: successCodes.SERVER_SUCCESS,
          message: {
            success: true,
            description: "Successfully Deleted"
          },
        };
        const resp = responseHandler(dbResp);
        res.status(successCodes.SERVER_SUCCESS).json(resp);
      }else {
        const dbResp = {
          statusCode: errorCodes.NOT_FOUND_RESOURCE,
          message: {
            success: false,
            description: "Record not found"
          },
        };
        const resp = responseHandler(dbResp);
        res.status(successCodes.SERVER_SUCCESS).json(resp);
      }
    }
  })
})

router.put('/update/lessonByID', (req, res) => {
  const { column, updateValue, condition, conditionValue } = req.body
  let updateQuery = db_query.updateQuery("lessons", column, "id",)
  console.log(updateQuery);
  console.log(JSON.stringify(req.body, null, 2) + "Boody")


  database.query(updateQuery, [updateValue, conditionValue], (err, result) => {
    if (err) {
      console.log(err)
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: err.code,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      console.log(result.affectedRows);
      if (result.affectedRows > 0) {
        const dbResp = {
          statusCode: successCodes.SERVER_SUCCESS,
          message: {
            success: true,
            description: "Successfully updated record"
          },
        };
        const resp = responseHandler(dbResp);
        res.status(successCodes.SERVER_SUCCESS).json(resp);
        return
      }else {
        const dbResp = {
          statusCode: errorCodes.NOT_FOUND_RESOURCE,
          message: {
            success: false,
            description: "Record not found"
          },
        };
        const resp = responseHandler(dbResp);
        res.status(successCodes.SERVER_SUCCESS).json(resp);
      }
   
    }
  })
})

module.exports = router;
