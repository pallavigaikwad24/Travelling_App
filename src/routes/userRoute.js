const { Router } = require("express");
const { isAuth, isSuperAdmin } = require("../middleware/loginPassportMiddleware");
const { userController, userUpdateController, userDeleteController } = require("../controller/UserController/userController");
const registrationValidation = require("../middleware/registrationMiddleware");
const validationResultFun = require("../middleware/validationFun");
const emailAuthMiddleware = require("../middleware/emailAuthMiddleware");
const route = Router();

route.get("/all-user", isAuth, isSuperAdmin, userController);

route.put("/update-user", isAuth, isSuperAdmin, registrationValidation(), validationResultFun, userUpdateController);

route.delete("/delete-user", isAuth, isSuperAdmin, emailAuthMiddleware(), validationResultFun, userDeleteController)

module.exports = route;