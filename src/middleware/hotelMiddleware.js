const { body } = require("express-validator");
const { requiredErrorMessage, validErrorMessage, notAvailableErrorMessage } = require("../services/staticMessage");
const getModelInfo = require("../services/getModelInfo");
const { HotelModel } = require("../models");
const { default: axios } = require("axios");

function hotelValidation() {
    return [
        body("name")
            .notEmpty()
            .withMessage(requiredErrorMessage("Name"))
            .isString()
            .withMessage(validErrorMessage("Name")),

        body("location")
            .notEmpty()
            .withMessage(requiredErrorMessage("Location"))
            .isString()
            .withMessage(validErrorMessage("Location")),

        body("country").notEmpty().withMessage(requiredErrorMessage("Country")),
        body("country").custom(async (value) => {
            const response = await axios.get(`${process.env.COUNTRY_API}`);
            const countries = response.data.data.map(country => country.country);
            if (!countries?.includes(value)) throw new Error(validErrorMessage("Country"));
        }),

        body("price_per_night")
            .notEmpty()
            .withMessage(requiredErrorMessage("Price per Night"))
            .isNumeric()
            .withMessage(validErrorMessage("Price per Night"))
            .custom(value => {
                if (value <= 0) {
                    throw new Error(validErrorMessage("Price per Night"));
                }
                return true;
            }),

        body("available_rooms")
            .notEmpty()
            .withMessage(requiredErrorMessage("Available Rooms"))
            .isInt({ min: 1 })
            .withMessage(validErrorMessage("Available Rooms")),

        body("services")
            .notEmpty()
            .withMessage(requiredErrorMessage("Services"))
            .isJSON()
            .withMessage(validErrorMessage("Services"))
            .custom(services => {
                if (services?.length === 0) {
                    throw new Error(validErrorMessage("Services"));
                }
                return true;
            }),
    ];
}

module.exports = hotelValidation;
