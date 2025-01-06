const { validationResult } = require("express-validator");
const HTTP_CODE = require("../services/enum");

function validationResultFun(req, res, next) {
    const result = validationResult(req);
    let error = null;
    if (!result.isEmpty()) {
        error = result.array();
        return res.status(HTTP_CODE.FORBIDDEN.code).send(error);
    }
    next();
}

module.exports = validationResultFun;
