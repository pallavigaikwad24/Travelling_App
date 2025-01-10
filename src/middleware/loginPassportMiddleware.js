const passport = require("passport");
const HTTP_CODE = require("../services/enum");

const loginPassportMiddleware = (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) {
            return next(error);
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return next();
        });
    })(req, res, next);
};

const isAuth = (req, res, next) => {
    try {
        if (req.user) return next();
        else return res.status(HTTP_CODE.UNAUTHORIZED.code).send(HTTP_CODE.UNAUTHORIZED.message)

    } catch (error) {
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message)
    }
}

const isAdmin = (req, res, next) => {
    try {
        if (req.user.user_type == 'superAdmin' || req.user.user_type == 'admin') return next();
        else return res.status(HTTP_CODE.UNAUTHORIZED.code).send(HTTP_CODE.UNAUTHORIZED.message)
    } catch (error) {
        logger.error(logErrorMessage("Check Admin Authentication"), {
            method: req.method,
            url: `${req.get("Host")}${req.originalUrl}`,
            message: error.message,
            stack: error.stack,
        });
        console.log(error);
        return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message);
    }
}

module.exports = { loginPassportMiddleware, isAuth, isAdmin };