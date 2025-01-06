const express = require("express");
const route = require("./src/routes/index.js");
const app = express();
require("dotenv").config();
const passportAuthMiddleware = require("./src/middleware/passportAuth.js")
const pageNotFoundController = require("./src/controller/pageNotFoundMiddleware.js");
const serverCrashPreventMiddleware = require("./src/middleware/serverCrashPreventMiddleware.js");

app.use(express.urlencoded({ extended: false }));
app.use(passportAuthMiddleware)
app.use(serverCrashPreventMiddleware);
app.use(route);

app.use(pageNotFoundController);
app.listen(process.env.PORT || 3300, () => {
    console.log("SERVER LISTENING ON PORT", process.env.PORT)
});