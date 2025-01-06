const HTTP_CODE = require("../../services/enum");
const { HotelModel } = require("../../models");
const getModelInfo = require("../../services/getModelInfo");
const logger = require("../../config/logger");
const { logErrorMessage } = require("../../services/staticMessage");

const hotelController = async (req, res) => {
    const { name, location, address, country, price_per_night, available_rooms, services } = req.body;
    try {
        const arguments = {
            modelName: HotelModel,
            methodType: 'create',
            args: { owner_id: req.user.id, name, location, address, country, price_per_night, available_rooms, services }
        }

        const newHotelInfo = await getModelInfo(arguments);
        return res.status(HTTP_CODE.ACCEPTED.code).send(newHotelInfo);
    } catch (error) {
        logger.error(logErrorMessage("Adding Hotel Details"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.message,
            stack: error.stack,
        });
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = hotelController;