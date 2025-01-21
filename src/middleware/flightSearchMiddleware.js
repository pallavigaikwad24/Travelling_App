const { body } = require("express-validator");
const { requiredErrorMessage, notAvailableErrorMessage, validErrorMessage, availableErrorMessage } = require("../services/staticMessage");
const { where, Op } = require("sequelize");
const getModelInfo = require("../services/getModelInfo");
const { default: axios } = require("axios");
const { FlightBookingModel } = require("../models");

const flightSearchMiddleware = () => {
    let available = 0;
    return [
        body("departure_airport").notEmpty().withMessage(requiredErrorMessage("Departure Airport")),
        body("departure_airport").custom(async (value, { req }) => {
            if (value?.trim()?.length == 0) throw new Error(requiredErrorMessage("Departure Airport"));
            const response = await axios(`${process.env.API_URL}/airports?access_key=${process.env.AIRPORT_API_KEY}`);
            const result = response.data.data.find((item) =>
                item?.icao_code?.toLocaleLowerCase()?.startsWith(value?.toLocaleLowerCase())
            );
            if (!result) throw new Error(validErrorMessage("Departure Airport Name"));

            const argument = {
                modelName: 'FlightModel',
                methodType: "findAll",
                args: { where: { departure_airport: value } }
            }
            const existName = await getModelInfo(argument)
            if (!existName) throw new Error(notAvailableErrorMessage(value, "Flights"))

        }),
        body("destination_airport").notEmpty().withMessage(requiredErrorMessage("Destination Airport")),
        body("destination_airport").custom(async (value, { req }) => {
            if (value?.trim()?.length == 0) throw new Error(requiredErrorMessage("Destination Airport"));
            const response = await axios(`${process.env.API_URL}/airports?access_key=${process.env.AIRPORT_API_KEY}`);
            const result = response.data.data.find((item) =>
                item?.icao_code?.toLocaleLowerCase()?.startsWith(value?.toLocaleLowerCase())
            );
            if (!result) throw new Error(validErrorMessage("Destination Airport Name"));
        }),
        body("start_date").notEmpty().withMessage(requiredErrorMessage("Start Date")),
        body("start_date").custom(async (value, { req }) => {
            const argument = {
                modelName: 'FlightModel',
                methodType: 'findOne',
                args: {
                    where: {
                        [Op.and]: [{ departure_airport: req.body.departure_airport },
                        { arrival_airport: req.body.destination_airport }]
                    },
                    include: [
                        { model: FlightBookingModel, attributes: ['flight_id', 'number_of_seats',] }
                    ]
                }
            }
            const info = await getModelInfo(argument);
            const getAvailableSeats = {
                modelName: 'FlightModel', methodType: 'findOne',
                args: { attributes: ['seats_available'], where: { id: info.id } }
            }
            const availableSeatCount = await getModelInfo(getAvailableSeats);

            let availbleCount = availableSeatCount.seats_available;
            info.FlightBookingModels?.forEach((item) => {
                if (info.id == item.flight_id)
                    availbleCount = availbleCount - item.number_of_seats
            });

            if (info.departure_airport != req.body.departure_airport || info.arrival_airport != req.body.destination_airport
                || info.departure_date != value) {
                throw new Error(notAvailableErrorMessage(req.body.departure_airport, "Flights for this date"))
            }

            if (availbleCount <= 0)
                throw new Error(notAvailableErrorMessage(req.body.name, "Flight Seats for this date"))
            else
                available = availbleCount;

        }),
        body("total_seats").notEmpty().withMessage(requiredErrorMessage("Seats Count")),
        body("total_seats").isNumeric().withMessage(validErrorMessage("Seats Count")),
        body("total_seats").custom((value) => {
            if (value > available && available > 0)
                throw new Error(availableErrorMessage(available, "Flights"));
            else
                throw new Error(notAvailableErrorMessage(req.body.name, "Flights"))
        })
    ]
}

module.exports = flightSearchMiddleware;