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

router.post("/AddTopic", (req, res) => {
  const { subject, title } = req.body;
  try {
    database.query(
      db_query.ADD_TOPIC_QRY,
      [subject, title],
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
            message: { description: successMessages.ADD_TOPIC_SUCCESS },
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

router.get("/getTopicBySubject/(:id)", (req, res) => {
    const { id } = req.params;
    database.query(db_query.GET_TOPIC_BY_SUBJECT, id, (err, result) => {
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
