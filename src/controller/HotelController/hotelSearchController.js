const HTTP_CODE = require("../../services/enum");
const getModelInfo = require("../../services/getModelInfo");
const logger = require("../../config/logger");
const { logErrorMessage } = require("../../services/staticMessage");
const { Op } = require("sequelize");

const hotelSearchController = async (req, res) => {
    try {
        const { name, topTenRecord } = req.body;
        let allResult = null;
        if (topTenRecord) {
            const argument = {
                modelName: 'HotelModel',
                methodType: 'findAll',
                args: { where: { [Op.or]: [{ name }, { country: name }], is_deleted: false }, offset: 0, limit: 10 }
            }
            allResult = await getModelInfo(argument);
            return res.status(HTTP_CODE.ACCEPTED.code).send(allResult);
        }
        const argument = {
            modelName: 'HotelModel',
            methodType: 'findAll',
            args: { where: { [Op.or]: [{ name }, { country: name }], is_deleted: false } }
        }
        allResult = await getModelInfo(argument)
        return res.status(HTTP_CODE.ACCEPTED.code).send(allResult);
    } catch (error) {
        logger.error(logErrorMessage("Searching Hotel"), {
            method: req.method, url: `${req.get("Host")}${req.originalUrl}`, message: error.message, stack: error.stack,
        });
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = hotelSearchController;