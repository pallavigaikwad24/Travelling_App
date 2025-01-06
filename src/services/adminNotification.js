const admin = require("../utils/firebaseAdmin");
const HTTP_CODE = require("./enum");

const getAdminCall = async (message) => {
    await admin.messaging().send(message).then((response) => { console.log("Notification sent successfully:", response); })
        .catch((err) => {
            console.log("Error while sending notification!!!", err);
            return res.status(HTTP_CODE.BAD_REQUEST.code).send(HTTP_CODE.BAD_REQUEST.message)
        });
}

module.exports = { getAdminCall };