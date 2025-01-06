const HTTP_CODE = require("../../services/enum");
const { HotelModel } = require("../../models");
const { where } = require("sequelize");
const getModelInfo = require("../../services/getModelInfo");
const logger = require("../../config/logger");
const { logErrorMessage } = require("../../services/staticMessage");

const deleteHotelController = async (req, res) => {
    try {
        const argument = {
            modelName: HotelModel, methodType: 'update', args: [{ is_deleted: true }, { where: { owner_id: req.user.id } }]
        }
        await getModelInfo(argument);
        return res.status(HTTP_CODE.NO_CONTENT.code).send(HTTP_CODE.NO_CONTENT.message)
    } catch (error) {
        logger.error(logErrorMessage("deleting hotel records"), {
            method: req.method, url: `${req.get("Host")}${req.originalUrl}`, message: error.message, stack: error.stack,
        });
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message)
    }
}

module.exports = deleteHotelController;