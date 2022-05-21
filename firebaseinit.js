var admin = require("firebase-admin");

var serviceAccount = {
    "type": "service_account",
    "project_id": "cfdtc-7ab2e",
    "private_key_id": "2bb66ec00533579214f08f6ade4ee05baf580573",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDbBAvsO2AD2JpJ\nKT3G8Kmf4x2QX3jj+TKMnHqtzNjhsOno9X6Ev+JpPCO3R1pS4HhjQ2ockCT7x1SD\nVzWHHiE1YkbF7/UbhHvRCxdYRXeahXArHotE26Zui6UBbUi1Vwltd1hF95dkufW+\nHZEbNdmxoTq6KKQSPIc6N6olxdFMljBMfc4cDSpdIrL2G0WpwdG9gDRy4kPZ0YI6\nO8lTK+gd6GQdHP++2OjGGK5FCdGAhovy4+G3EpYk52DriE8NGWknPEMOk60h2WeJ\ncuLMNvF49kXhxvyYd2b+bHD31lRWxJE0VqZzJscW3MqDJL0zKbo+6gchCKbf00Gm\nKfLxZd5FAgMBAAECggEABnFwCFsW0AYnQ8+6yYd69gEwdXbZj5tdKVXRJhvIpZsW\nxouyVSVv+7iRNGsc9SM1Z3YsQPrcm6uZiOOf54GzaGajvl74zv5uxg+VeDtS8XDL\ng/k6D6SGmOnyyL/2S59r35SLPEO0aHowCI/GHQ7QgLFFkQRxDzhIoiXRE5tmNOKI\nSCY9IkLC0YhtRlaWFQ0rjUgaS/7kDDEYo8IUopNxW1IynjQ5P9l1QSMIfi+6tsdd\npMpDdNLioEW7XcIVCvJo5FzNiK0UtxAOnU1KjTgivzJX4+u4+BjdeWh5vuzQ8U9b\nNq2JyufA3InxApxIncXy190GVCU7zFfWvZkkHQMZYQKBgQD1wbBkql40CT7m2YWZ\nK9JxrrTYiMxW5pi6HNeRUDfIDljgTNDp/GJWIZr4dvsalkHE3ZLkJcauvfZbtfxN\nH2dmf+Jt2UyOgCEs0yR/2q1We51rjEUedIkgM8JJihNLccgp1F4gHjapmItBnVUH\nxk0lNPsYp1lQYo/gezISZUC7BwKBgQDkJQYSRiVCPSbgdUzav1y0tiSkqjGJwJ0N\nlABQ4xN4ZBFhxMQw1klH8O8nTX8xRVhffn2SZwbuaySWRdG+Vu4MYHyijiipPCxS\nbp4S8S5B2Z4FDduCR82rZxYVc0OVW+rOrFowOz0om7BmTTVBXi5K+PR7mRRCGO39\nqFQQl+8tUwKBgQCKgJFv+lBDFV7c7YSMsZTVuvdy/Y3j/+vdH/ohjEsTtXpDVyd6\nZ2HoVuIm269i6YHBeHqbl+qkeqzIPQUnVeaJbtNmw0uRGAcaYxiz8cM09U/f19rw\ncg8CFgmONoHvR/3eDTDK+xwlcrIw1YGhcxHxQS2uVEpSsmmRwvySP3w+qwKBgQDP\nMtDQx+QOxHsKX33tLN6FQOcGpYtYEBaSvleLHrAQJtGieZG0yOjE7YxFpZxeoxwf\nnkFtNSSWY7hWwhI7S7fmhbqr53AGQx/9vXjSuzfHllxtOqihKZUglf74fDZk75XR\nHbbLFwH0X3FVd8lmFKL2dCOWHPDJFtsOBFJUv6f5AQKBgAnh7bl3CnoeimOdfjb9\nZ1XwbN2IOjr/0GO6MRADM/RWjn2BKG6T3MiF7BiwYPDtwjbzwhAJdyhsxvKv+/tt\nDUHj8mKOgJddU6ydUGZmG+oKVhqQoEDiWlBi9QsmiQKWBN5/Ls5fMzQNXH4o0+E+\ndnfa8F0yfJIufThBKFmHLAcs\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-2596l@cfdtc-7ab2e.iam.gserviceaccount.com",
    "client_id": "112867820478585324180",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2596l%40cfdtc-7ab2e.iam.gserviceaccount.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cfdtc-7ab2e-default-rtdb.firebaseio.com/"
});



module.exports = {
    db: admin.database()
}
