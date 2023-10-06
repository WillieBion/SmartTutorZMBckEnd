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
import { IContentManagemnt } from "../../appResources/types/contentManagement";

router.post("/AddSubjects", (req, res) => {
  const {
    name,
    pictureURL,
    lesson_title,
    lesson_description,
    exam_title,
    exam_description,
  } = req.body;

  try {
    database.query(
      db_query.ADD_SUBJECT_QRY,
      [
        name,
        pictureURL,
        lesson_title,
        lesson_description,
        exam_title,
        exam_description,
      ],
      (error, results) => {
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
            message: { description: successMessages.ADD_SUBJECT_SUCCESS },
          };
          const resp = responseHandler(dbResp);
          res.status(successCodes.SERVER_SUCCESS).json(resp);
        }
      }
    );
  } catch (error) {
    if (error) {
      const dbResp = {
        statusCode: errorCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.INTERNAL_SERVER_ERROR,
      };
      const resp = responseHandler(dbResp);

      res.status(500).json(resp);
    }
  }
});

router.get("/getSubject/(:id)", (req, res) => {
  const { id } = req.params;
  database.query(
    db_query.GET_SUBJECT_QRY,
    id,
    (err, result: IContentManagemnt[]) => {
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
    }
  );
});

router.get("/getAllSubjects", (req, res) => {
  try {
    database.query(
      db_query.GET_ALL_SUBJECT_QRY,
      (error, result: IContentManagemnt[]) => {
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

module.exports = router;
