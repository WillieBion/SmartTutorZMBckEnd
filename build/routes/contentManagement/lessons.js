"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("../../appResources/resources");
const dbConfig_1 = require("../../instances/dbConfig");
const dbQuery_1 = require("../../instances/dbQuery");
resources_1.router.post("/AddLesson", (req, res) => {
    // const { title, description, topic, media_type, duration, link } = req.body;
    const { title, duration, media_type, media_value, subject_id } = req.body;
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.ADD_LESSON_QRY, [title, duration, media_type, media_value, subject_id], (error, result) => {
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
                    message: { description: resources_1.successMessages.ADD_LESSON_SUCCESS },
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
resources_1.router.get("/getLessonBySubject/(:id)", (req, res) => {
    const { id } = req.params;
    dbConfig_1.database.query(dbQuery_1.db_query.GET_LESSON_BY_SUBJECT, id, (err, result) => {
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
            res.status(resp.statusCode).json(resp);
        }
    });
});
module.exports = resources_1.router;
