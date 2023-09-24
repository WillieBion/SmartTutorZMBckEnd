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
import {
  IExam,
  IExamContent,
} from "../../appResources/types/contentManagement";

router.post("/addExamPaper", (req, res) => {
  const { title, description, subject, year } = req.body;

  try {
    database.query(
      db_query.ADD_EXAM_QRY,
      [title, description, subject, year],
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
            message: { description: successMessages.ADD_EXAM_SUCCESS },
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

router.get("/getExam/(:id)", (req, res) => {
  const { id } = req.params;

  database.query(db_query.GET_EXAM_QRY, id, (err, result: IExam[]) => {
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

router.get("/getAllExam", (req, res) => {
  try {
    database.query(db_query.GET_ALL_EXAM_QRY, (error, results: IExam[]) => {
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
          message: results,
        };
        const resp = responseHandler(dbResp);
        res.status(successCodes.SERVER_SUCCESS).json(resp);
      }
    });
  } catch (error) {
    const dbResp = {
      statusCode: errorCodes.INTERNAL_SERVER_ERROR,
      message: errorMessages.INTERNAL_SERVER_ERROR,
    };
    const resp = responseHandler(dbResp);

    res.status(500).json(resp);
  }
});

/* Exam Content */

router.post("/addExamContent", (req, res) => {
  const { exam, exam_type, exam_link } = req.body;
  try {
    database.query(
      db_query.ADD_EXAM_CONTENT_QRY,
      [exam, exam_type, exam_link],
      (err, result: IExamContent) => {
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
            message: { description: successMessages.ADD_EXAM_CONTENT_SUCCESS },
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
