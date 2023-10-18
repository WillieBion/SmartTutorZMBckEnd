"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = (userobject) => {
    const { msisdn, user_name, password } = userobject;
    const token = (0, jsonwebtoken_1.sign)({ msisdn, user_name, password }, process.env.JSON_SECRET_KEY);
    return token;
};
exports.generateToken = generateToken;
const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({ error: "User is not authenticated" });
    }
    const accToken = authHeader.split(" ")[1];
    try {
        const validate = (0, jsonwebtoken_1.verify)(accToken, process.env.JSON_SECRET_KEY);
        if (validate) {
            req.authenticated = true;
            return next();
        }
    }
    catch (error) {
        return res.status(400).json({ error: error });
    }
};
exports.validateToken = validateToken;
// module.exports = { generateToken, validateToken };
