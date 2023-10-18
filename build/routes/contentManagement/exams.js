"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("../../appResources/resources");
const dbConfig_1 = require("../../instances/dbConfig");
const dbQuery_1 = require("../../instances/dbQuery");
// title, duration, media_type, media_value, year, subject
resources_1.router.post("/addExamPaper", (req, res) => {
    const { title, duration, media_type, media_value, year, subject } = req.body;
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.ADD_EXAM_QRY, [title, duration, media_type, media_value, year, subject], (error, results) => {
            if (error) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: error.code,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                const dbResp = {
                    statusCode: resources_1.successCodes.SERVER_SUCCESS,
                    message: { description: resources_1.successMessages.ADD_EXAM_SUCCESS },
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
            }
        });
    }
    catch (error) {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(resp.statusCode).json(resp);
    }
});
resources_1.router.get("/getExam/(:id)", (req, res) => {
    const { id } = req.params;
    dbConfig_1.database.query(dbQuery_1.db_query.GET_EXAM_QRY, id, (err, result) => {
        if (err) {
            const dbResp = {
                statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
            };
            const resp = (0, resources_1.responseHandler)(dbResp);
            res.status(resp.statusCode).json(resp);
        }
        else {
            const dbResp = {
                statusCode: resources_1.successCodes.SERVER_SUCCESS,
                message: result[0],
            };
            const resp = (0, resources_1.responseHandler)(dbResp);
            res.status(resp.statusCode).json(resp);
        }
    });
});
// router.get("/getExamBySubject/(:id)", (req, res) => {
//   const { id } = req.params;
//   database.query(
//     db_query.GET_EXAM_BY_SUBJECT_QRY,
//     id,
//     (err, result: IExam[]) => {
//       if (err) {
//         const dbResp = {
//           statusCode: errorCodes.INTERNAL_SERVER_ERROR,
//           message: errorMessages.INTERNAL_SERVER_ERROR,
//         };
//         const resp = responseHandler(dbResp);
//         res.status(resp.statusCode).json(resp);
//       } else {
//         const dbResp = {
//           statusCode: successCodes.SERVER_SUCCESS,
//           message: result,
//         };
//         const resp = responseHandler(dbResp);
//         res.status(resp.statusCode).json(resp);
//       }
//     }
//   );
// });
resources_1.router.get("/getAllExam", (req, res) => {
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.GET_ALL_EXAM_QRY, (error, results) => {
            if (error) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                const dbResp = {
                    statusCode: resources_1.successCodes.SERVER_SUCCESS,
                    message: results,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
            }
        });
    }
    catch (error) {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(500).json(resp);
    }
});
/* Exam Content */
resources_1.router.post("/addExamContent", (req, res) => {
    const { exam, exam_type, exam_link } = req.body;
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.ADD_EXAM_CONTENT_QRY, [exam, exam_type, exam_link], (err, result) => {
            if (err) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                const dbResp = {
                    statusCode: resources_1.successCodes.SERVER_SUCCESS,
                    message: { description: resources_1.successMessages.ADD_EXAM_CONTENT_SUCCESS },
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
            }
        });
    }
    catch (error) {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(500).json(resp);
    }
});
resources_1.router.get("/getExamContent/(:id)", (req, res) => {
    //pass in exam ID to get the content
    const { id } = req.params;
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.GET_EXAM_CONTENT_QRY, id, (err, result) => {
            if (err) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: err.code,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                const dbResp = {
                    statusCode: resources_1.successCodes.SERVER_SUCCESS,
                    message: result[0],
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
        });
    }
    catch (error) {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(resp.statusCode).json(resp);
    }
});
resources_1.router.get("/getAllExamContent", (req, res) => {
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.GET_ALL_EXAM_CONTENT_QRY, (error, result) => {
            if (error) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: error.code,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                const dbResp = {
                    statusCode: resources_1.successCodes.SERVER_SUCCESS,
                    message: result,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
            }
        });
    }
    catch (error) {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(resp.statusCode).json(resp);
    }
});
/* Get exam by subject ID */
resources_1.router.get("/getExamBySubject/(:id)", (req, res) => {
    const { id } = req.params;
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.GET_EXAM_BY_SUBJECT_QRY, id, (err, result) => {
            if (err) {
                const dbResp = {
                    statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                    message: err.code,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resp.statusCode).json(resp);
            }
            else {
                const dbResp = {
                    statusCode: resources_1.successCodes.SERVER_SUCCESS,
                    message: result,
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
            }
        });
    }
    catch (error) {
        const dbResp = {
            statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
            message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
        };
        const resp = (0, resources_1.responseHandler)(dbResp);
        res.status(resp.statusCode).json(resp);
    }
});
module.exports = resources_1.router;
