const logger = require("../../config/logger");
const HTTP_CODE = require("../../services/enum");
const getModelInfo = require("../../services/getModelInfo");
const { FlightBookingModel, FlightModel } = require("../../models");
const { where } = require("sequelize");
const { logErrorMessage } = require("../../services/staticMessage");

const deleteFlightBookingController = async (req, res) => {
    try {

        const isOwnerArgument = {
            modelName: FlightModel,
            methodType: 'findOne',
            args: { where: { owner_id: req.user.id, is_deleted: false } }
        }

        const isOwner = await getModelInfo(isOwnerArgument);

        if (isOwner) {
            const argument = {
                modelName: FlightBookingModel,
                methodType: 'update',
                args: [
                    { is_deleted: true },
                    { where: { user_id: req.user.id } }
                ]
            }
            await getModelInfo(argument);
            return res.status(HTTP_CODE.NO_CONTENT.code).send(HTTP_CODE.NO_CONTENT.message)
        } else {
            return res.status(HTTP_CODE.FORBIDDEN.code).send(HTTP_CODE.FORBIDDEN.message);
        }


    } catch (error) {
        logger.error(logErrorMessage("deleting flight booking"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.message,
            stack: error.stack,
        });
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message)
    }
}

module.exports = deleteFlightBookingController;