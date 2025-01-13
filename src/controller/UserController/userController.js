const { where } = require("sequelize");
const HTTP_CODE = require("../../services/enum");
const getModelInfo = require("../../services/getModelInfo");
const { updateSuccessMessage } = require("../../services/staticMessage");

const userController = async (req, res) => {
    try {
        const argument = {
            modelName: 'User',
            methodType: 'findAll',
            args: { where: { is_deleted: false } }
        }
        const allUsers = await getModelInfo(argument);
        return res.status(HTTP_CODE.OK.code).send(allUsers)
    } catch (error) {
        logger.error(logErrorMessage("Getting User Info"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.message,
            stack: error.stack,
        });
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send({ message: error.message });
    }
}

const userUpdateController = async (req, res) => {
    try {
        const { first_name, last_name, email, password, country, phone_number, user_type } = req.body;

        const argument = {
            modelName: 'User',
            methodType: 'update',
            args: [
                { first_name, last_name, email, password, country, phone_number, user_type },
                { where: { user_type: 'superAdmin' } }
            ]
        }

        await getModelInfo(argument);
        return res.status(HTTP_CODE.OK.code).send({ message: updateSuccessMessage() })
    } catch (error) {
        logger.error(logErrorMessage("Updating User Info"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.message,
            stack: error.stack,
        });
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send({ message: error.message });
    }
}

const userDeleteController = async (req, res) => {
    try {

        const { email } = req.body;
        const argument = {
            modelName: 'User',
            methodType: 'update',
            args: [
                { is_deleted: true },
                { where: { email } }
            ]
        };

        await getModelInfo(argument);
        return res.status(HTTP_CODE.OK.code).send(HTTP_CODE.OK.message);
    } catch (error) {
        logger.error(logErrorMessage("Deleting User Info"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.message,
            stack: error.stack,
        });
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send({ message: error.message });
    }
}

module.exports = { userController, userUpdateController, userDeleteController };