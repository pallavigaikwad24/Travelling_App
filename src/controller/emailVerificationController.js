const { where } = require("sequelize");
const HTTP_CODE = require("../services/enum");
const { User, EmailVerificationToken } = require("../models");
const getModelInfo = require("../services/getModelInfo");
const logger = require("../config/logger");
const { logErrorMessage } = require("../services/staticMessage");

const emailVerificationController = async (req, res) => {
    try {
        const { token } = req.query;

        const tokenargs = {
            modelName: EmailVerificationToken,
            methodType: 'findOne',
            args: { attributes: ['user_id'], where: { token, is_deleted: false } }
        };

        const tokenInfo = await getModelInfo(tokenargs);

        const arguments = {
            modelName: User,
            methodType: 'update',
            args: [
                { is_verified: true },
                { where: { id: tokenInfo.user_id, is_deleted: false } }
            ]
        }

        await getModelInfo(arguments);
        return res.status(HTTP_CODE.ACCEPTED.code).send(HTTP_CODE.ACCEPTED.message);
    } catch (error) {
        logger.error(logErrorMessage("Password"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.message,
            stack: error.stack,
        });
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = emailVerificationController;