const { body } = require("express-validator");
const { requiredErrorMessage, passwordErrorMessage, confirmMatchErrorMessage } = require("../services/staticMessage");

const forgetPasswordMiddlware = () => {
    let password = null;
    return [
        body("password").notEmpty().withMessage(requiredErrorMessage("Password")),
        body("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/)
            .withMessage(passwordErrorMessage("Password")),
        body("password").custom(async (value) => {
            if (value?.trim()?.length == 0) throw new Error(requiredErrorMessage("Password"));
            password = value;
            if (value.length < 8) throw new Error(passwordErrorMessage("Password"));
        }),
        body("confirm_password").notEmpty().withMessage(requiredErrorMessage("Confirm Password")),
        body("confirm_password").custom(async (value) => {
            if (value?.trim()?.length == 0) throw new Error(requiredErrorMessage("Confirm Password"));
            if (password !== value) throw new Error(confirmMatchErrorMessage("Confirm Password"));
        }),
    ]
}

module.exports = forgetPasswordMiddlware;