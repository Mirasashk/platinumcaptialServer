const admin = require('firebase-admin');
const serviceAccount = require('../platinumcapital-ffcb4-firebase-adminsdk-erw15-451c19981e.json');

const fb = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://platinumcapital-ffcb4-default-rtdb.firebaseio.com',
});

exports.fb = fb;
