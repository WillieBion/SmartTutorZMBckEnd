"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("../../appResources/resources");
const dbConfig_1 = require("../../instances/dbConfig");
const dbQuery_1 = require("../../instances/dbQuery");
resources_1.router.post("/AddTopic", (req, res) => {
    const { subject, title } = req.body;
    try {
        dbConfig_1.database.query(dbQuery_1.db_query.ADD_TOPIC_QRY, [subject, title], (error, result) => {
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
                    message: { description: resources_1.successMessages.ADD_TOPIC_SUCCESS },
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
resources_1.router.get("/getTopicBySubject/(:id)", (req, res) => {
    const { id } = req.params;
    dbConfig_1.database.query(dbQuery_1.db_query.GET_TOPIC_BY_SUBJECT, id, (err, result) => {
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
module.exports = resources_1.router;
