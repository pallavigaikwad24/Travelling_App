const { where } = require("sequelize");
const HTTP_CODE = require("../../services/enum");
const getModelInfo = require("../../services/getModelInfo");
const { logErrorMessage } = require("../../services/staticMessage");

const updateHotelController = async (req, res) => {
    try {

        const { name, location, count, price_per_night, available_rooms, services } = req.body;
        const argument = {
            modelName: 'HotelModel',
            methodType: 'update',
            args: [
                { name, location, count, price_per_night, available_rooms, services },
                { where: { owner_id: req.user.id, is_deleted: false } }
            ]
        }
        await getModelInfo(argument);
        return res.status(HTTP_CODE.ACCEPTED.code).send(HTTP_CODE.ACCEPTED.message);
    } catch (error) {
        logger.error(logErrorMessage("updating Hotel records"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.message,
            stack: error.stack,
        });

        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message)
    }
}

module.exports = updateHotelController;