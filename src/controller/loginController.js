const logger = require("../config/logger");
const HTTP_CODE = require("../services/enum");
const { logErrorMessage } = require("../services/staticMessage");

const loginController = async (req, res) => {
    try {
        
        return res.status(HTTP_CODE.ACCEPTED.code).send(HTTP_CODE.ACCEPTED.message);
    } catch (error) {
        logger.error(logErrorMessage("Login"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.message,
            stack: error.stack,
        });
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = loginController;