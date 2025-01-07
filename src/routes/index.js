const { Router } = require("express");
const loginRoute = require("../routes/loginRoute");
const hotelRoute = require("../routes/hotelRoute");
const fligtRoute = require("../routes/flightRoute");
const searchRoute = require("../routes/searchRoute");
const firebaseRoute = require("../routes/firebaseNotificationRoute");
const paymentRoute = require("../routes/paymentRoute.js");
const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("../config/swaggerConfig.js");
const route = Router();

const swaggerSpec = swaggerJSDOC(swaggerConfig);
route.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

route.use("/", loginRoute);
route.use("/", hotelRoute);
route.use("/", fligtRoute);
route.use("/", searchRoute);
route.use("/", firebaseRoute);
route.use("/", paymentRoute);

module.exports = route;