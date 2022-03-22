const admin = require('firebase-admin');
const serviceAccount = require('../platinumcapital-ffcb4-firebase-adminsdk-erw15-9c067243e7');

const fb = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://platinumcapital-ffcb4-default-rtdb.firebaseio.com',
});

exports.fb = fb;
