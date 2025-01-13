const { Router } = require("express");
const { isAuth, isSuperAdmin } = require("../middleware/loginPassportMiddleware");
const { userController, userUpdateController, userDeleteController } = require("../controller/UserController/userController");
const route = Router();

route.get("/all-user", isAuth, isSuperAdmin, userController);

route.put("/update-user", isAuth, isSuperAdmin, userUpdateController);

route.delete("/delete-user", isAuth, isSuperAdmin, userDeleteController)

module.exports = route;