// firebaseConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('./vets_fireBase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vets-89ad4.firebaseio.com'
});

const db = admin.firestore();
module.exports = db;
