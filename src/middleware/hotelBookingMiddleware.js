const { body } = require("express-validator");
const { requiredErrorMessage, validErrorMessage, availableErrorMessage, notAvailableErrorMessage } = require("../services/staticMessage");
const { HotelModel, HotelBookingModel } = require("../models");
const getModelInfo = require("../services/getModelInfo");
const { where, Op } = require("sequelize");

function hotelBookingMiddleware() {
    let available = 0;
    let hotelName = null;
    return [
        body("hotel_id")
            .notEmpty()
            .withMessage(requiredErrorMessage("Hotel ID"))
            .isInt({ min: 1 })
            .withMessage(validErrorMessage("Hotel ID")),
        body("hotel_id").custom(async (value) => {
            const argument = {
                modelName: HotelModel,
                methodType: "findOne",
                args: { where: { id: value, is_deleted: false } }
            }

            const existUser = await getModelInfo(argument);
            if (!existUser) throw new Error(validErrorMessage("Hotel ID"))
        }),

        body("check_in_date")
            .notEmpty()
            .withMessage(requiredErrorMessage("Check-in Date"))
            .custom(async (value, { req }) => {
                const checkInDate = new Date(value);
                if (checkInDate < new Date()) {
                    throw new Error(validErrorMessage("Check-in Date"));
                }

                const argument = {
                    modelName: HotelModel,
                    methodType: 'findOne',
                    args: {
                        where: { id: req.body.hotel_id, is_deleted: false },
                        include: [
                            { model: HotelBookingModel, attributes: ['hotel_id', 'number_of_rooms', 'check_out_date', 'check_in_date'] }
                        ]
                    }
                }

                const info = await getModelInfo(argument);
                console.log(info);
                if (!info) throw new Error(notExistErrorMessage("This Hotel", "").split(",")[0]);
                hotelName = info.name;

                const getAvailableRooms = {
                    modelName: HotelModel, methodType: 'findOne',
                    args: { attributes: ['available_rooms'], where: { id: info?.id, is_deleted: false } }
                }
                const availbleRoomCount = await getModelInfo(getAvailableRooms);

                const startDate = new Date(value);
                let availbleCount = availbleRoomCount.available_rooms;

                // Checking room availability for start date
                info.HotelBookingModels.forEach((item) => {
                    const checkOutDate = new Date(item.check_out_date);
                    const checkInDate = new Date(item.check_in_date);
                    if (startDate < checkOutDate && startDate >= checkInDate)
                        availbleCount -= item.number_of_rooms
                });
                if (availbleCount <= 0)
                    throw new Error(notAvailableErrorMessage(hotelName, "Hotel Rooms for this date"))
                else
                    available = availbleCount;
                return true;

            }),

        body("check_out_date")
            .notEmpty()
            .withMessage(requiredErrorMessage("Check-out Date"))
            .custom((value, { req }) => {
                const checkOutDate = new Date(value);
                const checkInDate = new Date(req.body.check_in_date);
                if (checkOutDate <= checkInDate) {
                    throw new Error(validErrorMessage("Check-out Date"));
                }
                const startDate = new Date(req.body.start_date);
                const endDate = new Date(value);

                if (endDate <= startDate) throw new Error(validErrorMessage("End Date"));
                return true;
            }),

        body("number_of_rooms")
            .notEmpty()
            .withMessage(requiredErrorMessage("Number of Guests"))
            .isInt({ min: 1 })
            .withMessage(validErrorMessage("Number of Guests")),
        body("number_of_rooms").custom(async (value, { req }) => {
            const roomCount = parseInt(value);
            if (available == 0) throw new Error(notAvailableErrorMessage(hotelName, "Hotels"));
            if (roomCount > available && available > 0) throw new Error(availableErrorMessage(available, "Rooms"));
            return true;
        }),

        body("total_price")
            .notEmpty()
            .withMessage(requiredErrorMessage("Total Price"))
            .isNumeric()
            .withMessage(validErrorMessage("Total Price"))
            .custom(value => {
                if (value <= 0) {
                    throw new Error(validErrorMessage("Total Price"));
                }
                return true;
            }),
    ];
}

module.exports = hotelBookingMiddleware;
