var admin = require("firebase-admin");

var serviceAccount = {
    
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});



module.exports = {
    db: admin.database()
}
