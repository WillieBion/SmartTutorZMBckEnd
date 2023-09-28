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
  const { title, description, topic, media_type, duration, link } = req.body;

  try {
    database.query(
      db_query.ADD_LESSON_QRY,
      [title, description, topic, media_type, duration, link],
      (error, result) => {
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

router.get("/getLessonByTopic/(:id)", (req, res) => {
  const { id } = req.params;
  database.query(db_query.GET_LESSON_BY_TOPIC, id, (err, result) => {
    if (err) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    } else {
      const dbResp = {
        statusCode: successCodes.SERVER_SUCCESS,
        message: result[0],
      };
      const resp = responseHandler(dbResp);
      res.status(resp.statusCode).json(resp);
    }
  });
});


module.exports = router;
