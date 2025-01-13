const { Router } = require("express");
const { isAuth, isSuperAdmin } = require("../middleware/loginPassportMiddleware");
const { userController, userUpdateController } = require("../controller/UserController/userController");
const route = Router();

route.get("/all-user", isAuth, isSuperAdmin, userController);

route.put("/update-user", isAuth, isSuperAdmin, userUpdateController);

module.exports = route;