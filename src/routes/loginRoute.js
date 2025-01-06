const { Router } = require("express");
const loginController = require("../controller/loginController");
const loginValidation = require("../middleware/loginMiddleware");
const validationResultFun = require("../middleware/validationFun");
const registrationValidation = require("../middleware/registrationMiddleware");
const registrationController = require("../controller/registrationController");
const { loginPassportMiddleware } = require("../middleware/loginPassportMiddleware");
const emailAuthMiddleware = require("../middleware/emailAuthMiddleware");
const emailAuthController = require("../controller/resetPasswordController");
const forgetPasswordController = require("../controller/forgetPasswordController");
const forgetPasswordMiddlware = require("../middleware/forgetPasswordMiddleware");
const emailVerificationController = require("../controller/emailVerificationController");
const route = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Logs in an existing user and returns an accepted status.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data::
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Mobile number or Email ID of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       202:
 *         description: User successfully logged in and access granted.
 *       400:
 *         description: Invalid credentials or input data.
 */

route.post("/login", loginValidation(), validationResultFun, loginPassportMiddleware, loginController);

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Register a new user
 *     description: Allows a new user to register by providing their personal details and email verification.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data::
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The first name of the user.
 *               last_name:
 *                 type: string
 *                 description: The last name of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account (hashed before storing).
 *               country:
 *                 type: string
 *                 description: The country of the user.
 *               phone_number:
 *                 type: string
 *                 description: The phone number of the user.
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - country
 *               - phone_number
 *     responses:
 *       202:
 *         description: Successfully registered the user. Email verification sent.
 *       400:
 *         description: Invalid input data or registration failure.
 *       500:
 *         description: Internal server error or unexpected error during registration.
 */

route.post("/registration", registrationValidation(), validationResultFun, registrationController);

/**
 * @swagger
 * /forgetPassword-email-auth:
 *   post:
 *     summary: Send password reset email
 *     description: Sends a password reset email to the user, allowing them to update their password.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data::
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user requesting the password reset.
 *     responses:
 *       200:
 *         description: Email successfully sent to the user with a reset link.
 *       400:
 *         description: Invalid email or failed to send email.
 *       500:
 *         description: Internal server error or unexpected error while processing the request.
 */

route.post("/forgetPassword-email-auth", emailAuthMiddleware(), validationResultFun, emailAuthController);

/**
 * @swagger
 * /forgetpassword/{token}:
 *   post:
 *     summary: Reset the password for a user
 *     description: This endpoint allows a user to reset their password using a valid token sent to their email.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The password reset token sent to the user's email.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user (hashed before storing).
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Password successfully updated.
 *       400:
 *         description: Invalid input data or password reset failure.
 *       404:
 *         description: Token not found or expired.
 *       500:
 *         description: Internal server error during the password reset process.
 */

route.post("/forgetpassword/:token", forgetPasswordMiddlware(), validationResultFun, forgetPasswordController);

/**
 * @swagger
 * /email-verification/{token}:
 *   post:
 *     summary: Verify the user's email address
 *     description: This endpoint allows a user to verify their email address by using a valid verification token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The email verification token sent to the user's email.
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Email successfully verified.
 *       400:
 *         description: Invalid input data or verification failure.
 *       404:
 *         description: Token not found or expired.
 *       500:
 *         description: Internal server error during the email verification process.
 */

route.post("/email-verification/:token", emailVerificationController);

module.exports = route;