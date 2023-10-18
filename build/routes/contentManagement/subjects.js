"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("../../appResources/resources");
const dbConfig_1 = require("../../instances/dbConfig");
const dbQuery_1 = require("../../instances/dbQuery");
resources_1.router.post("/AddSubjects", (req, res) => {
    const { name, pictureURL, lesson_title, lesson_description, exam_title, exam_description, } = req.body;
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.ADD_SUBJECT_QRY, [
            name,
            pictureURL,
            lesson_title,
            lesson_description,
            exam_title,
            exam_description,
        ], (error, results) => {
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
                    message: { description: resources_1.successMessages.ADD_SUBJECT_SUCCESS },
                };
                const resp = (0, resources_1.responseHandler)(dbResp);
                res.status(resources_1.successCodes.SERVER_SUCCESS).json(resp);
            }
        });
    }
    catch (error) {
        if (error) {
            const dbResp = {
                statusCode: resources_1.errorCodes.INTERNAL_SERVER_ERROR,
                message: resources_1.errorMessages.INTERNAL_SERVER_ERROR,
            };
            const resp = (0, resources_1.responseHandler)(dbResp);
            res.status(500).json(resp);
        }
    }
});
resources_1.router.get("/getSubject/(:id)", (req, res) => {
    const { id } = req.params;
    dbConfig_1.database.query(dbQuery_1.db_query.GET_SUBJECT_QRY, id, (err, result) => {
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
resources_1.router.get("/getAllSubjects", (req, res) => {
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.GET_ALL_SUBJECT_QRY, (error, result) => {
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
        res.status(500).json(resp);
    }
});
module.exports = resources_1.router;
