const firebase = require('firebase');
let hidden = process.env;
var config = {
    apiKey: hidden.API_KEY,
    authDomain: hidden.AUTH_DOMAIN,
    databaseURL: hidden.DATABASE_URL,
    projectId: hidden.PROJECT_ID,
    storageBucket: hidden.STORAGE_BUCKET,
    messagingSenderId: hidden.MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

module.exports = {
    
}