var admin = require("firebase-admin");

var serviceAccount = {
    
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cfdtc-7ab2e-default-rtdb.firebaseio.com/"
});



module.exports = {
    db: admin.database()
}
