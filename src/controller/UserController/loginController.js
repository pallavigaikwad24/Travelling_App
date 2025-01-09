const logger = require("../../config/logger");
const HTTP_CODE = require("../../services/enum");
const { User } = require("../../models");
const { logErrorMessage, isEmailVerificationErrorMessage } = require("../../services/staticMessage");
const getModelInfo = require("../../services/getModelInfo");

function getArgument(value, param) {
    const arguments = {
        modelName: User,
        methodType: "findOne",
        args: { where: { [param]: value, is_deleted: false }, attributes: ['is_verified'] }
    }
    return arguments;
}


const loginController = async (req, res) => {
    try {
        const { username } = req.body;
        let argument = null;
        if (parseInt(username)) {
            argument = getArgument(username, "phone_number");
        } else {
            argument = getArgument(username, "email");
        }
        const userInfo = await getModelInfo(argument);
        if (!userInfo.is_verified) return res.status(HTTP_CODE.FORBIDDEN.code).send(isEmailVerificationErrorMessage());

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