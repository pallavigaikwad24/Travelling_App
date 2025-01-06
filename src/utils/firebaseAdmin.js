const admin = require("firebase-admin");
const serviceAccount = require("../config/travelling-app-877c1-firebase-adminsdk-90d0o-ac426e3960.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

module.exports = admin;