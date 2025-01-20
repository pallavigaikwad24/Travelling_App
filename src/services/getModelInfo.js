/**
 * @param {Object} modelName
 * @param {Object} arguments
 * @param {String} methodType
 * @returns {Promise<Object>}
 */

const { sequelize } = require("../models");

const getModelInfo = async ({ modelName, methodType, args }) => {
  const getModel = sequelize.models[modelName];

  if (Array.isArray(args)) {
    args[1]['returning'] = true;
    args[1].where['is_deleted'] = false;
    return await getModel[methodType](...args);
  } else {
    args.where['is_deleted'] = false;
    return await getModel[methodType](args);
  }
};

module.exports = getModelInfo;


src/Authentication/passportAuth.js src/controller/FlightController/cancellingFlightBookingController.js src/controller/FlightController/deleteFlightBookingController.js
src/controller/FlightController/flightBookingController.js
src/controller/FlightController/flightSearchController.js
src/controller/FlightController/updateFlightController.js
src/controller/HotelController/cancellingHotelBookingController.js
src/controller/HotelController/deleteHotelBookingController.js
src/controller/HotelController/deleteHotelController.js
src/controller/HotelController/hotelBookingController.js
src/controller/HotelController/hotelRecordsController.js
src/controller/HotelController/hotelSearchController.js
src/controller/HotelController/updateHotelController.js
src/controller/HotelController/verifyHotelController.js
src/controller/UserController/emailForgetPasswordController.js
src/controller/UserController/emailVerificationController.js
src/controller/UserController/firebaseController.js
src/controller/UserController/forgetPasswordController.js
src/controller/UserController/loginController.js
src/middleware/emailAuthMiddleware.js
src/middleware/emailVerificationMiddleware.js
src/middleware/flightBookingMiddleware.js
src/middleware/flightSearchMiddleware.js
src/middleware/hotelBookingMiddleware.js
src/middleware/hotelSearchMiddleware.js
src/middleware/otpLoginMiddleware.js
src/middleware/registrationMiddleware.js
src/routes/searchRoute.js
src/services/getModelInfo.js
src/services/getUserInfo.js