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

// title, duration, media_type, media_value, year, subject
router.post("/addExamPaper", (req, res) => {
  const { title, duration, media_type, media_value, year, subject } = req.body;

  try {
    database.query(
      db_query.ADD_EXAM_QRY,
      [title, duration, media_type, media_value, year, subject],
      (error, results) => {
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

    res.status(resp.statusCode).json(resp);
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


router.get("/getExamBySubject/(:id)", (req, res) => {
  const { id } = req.params;

  database.query(db_query.GET_EXAM_BY_SUBJECT_QRY, id, (err, result: IExam[]) => {
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
        message: result,
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

router.get("/getExamContent/(:id)", (req, res) => {
  //pass in exam ID to get the content
  const { id } = req.params;
  try {
    database.query(
      db_query.GET_EXAM_CONTENT_QRY,
      id,
      (err, result: IExam[]) => {
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
            message: result[0],
          };
          const resp = responseHandler(dbResp);
          res.status(resp.statusCode).json(resp);
        }
      }
    );
  } catch (error) {
    const dbResp = {
      statusCode: errorCodes.INTERNAL_SERVER_ERROR,
      message: errorMessages.INTERNAL_SERVER_ERROR,
    };
    const resp = responseHandler(dbResp);
    res.status(resp.statusCode).json(resp);
  }
});

router.get("/getAllExamContent", (req, res) => {
  try {
    database.query(
      db_query.GET_ALL_EXAM_CONTENT_QRY,
      (error, result: IExam[]) => {
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
    res.status(resp.statusCode).json(resp);
  }
});

/* Get exam by subject ID */
router.get("/getExamBySubject/(:id)", (req, res) => {
  const { id } = req.params;
  try {
    database.query(db_query.GET_EXAM_BY_SUBJECT_QRY, id, (err, result) => {
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
        res.status(successCodes.SERVER_SUCCESS).json(resp);
      }
    });
  } catch (error) {}
});

module.exports = router;
