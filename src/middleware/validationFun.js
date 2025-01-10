const { validationResult } = require("express-validator");
const HTTP_CODE = require("../services/enum");
const logger = require("../config/logger");
const { logErrorMessage, loginFailedErrMsg, validErrorMessage } = require("../services/staticMessage");
const { where } = require("sequelize");
const getModelInfo = require("../services/getModelInfo");
const { LoginAuthModel } = require("../models");

async function validationResultFun(req, res, next) {
    const result = validationResult(req);
    let error = null;
    if (!result.isEmpty()) {
        error = result.array();
        logger.error(logErrorMessage("Login Authentication"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.msg,
            stack: error.stack,
        });

        if (result.errors[0].msg == validErrorMessage("Password") && result.errors[0].path == 'password') {

            const argument = {
                modelName: LoginAuthModel,
                methodType: 'findOrCreate',
                args: { where: { user_id: req.user.id }, defaults: { failed_attempts: 1 } }
            }
            const [newEntry, created] = await getModelInfo(argument);

            const now = new Date();
            const lockTime = new Date(Date.now() + 10 * 60 * 1000);

            if (newEntry.lock_until && now < newEntry.lock_until) {
                const remainingTime = Math.ceil((newEntry.lock_until - now) / 1000 / 60);
                return res.status(HTTP_CODE.FORBIDDEN.code).send({ msg: loginFailedErrMsg(remainingTime) })
            } else if (newEntry.lock_until && now >= newEntry.lock_until) {
                newEntry.failed_attempts = 0;
                newEntry.lock_until = null;
                await newEntry.save();
                return;
            }

            if (!created)
                newEntry.failed_attempts += 1;

            if (newEntry.failed_attempts >= 5) {
                newEntry.lock_until = lockTime;
            }
            await newEntry.save();
        }
        return res.status(HTTP_CODE.FORBIDDEN.code).send(error);
    }
    next();
}

module.exports = validationResultFun;
