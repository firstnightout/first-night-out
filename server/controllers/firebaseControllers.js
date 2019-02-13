const bcrypt = require('bcryptjs');
const firebase = require('firebase');
//INITIALIZING FIREBASE
let hidden = process.env;

var config = {
    apiKey: hidden.REACT_APP_API_KEY,
    authDomain: hidden.REACT_APP_AUTH_DOMAIN,
    databaseURL: hidden.REACT_APP_DATABASE_URL,
    projectId: hidden.REACT_APP_PROJECT_ID,
    storageBucket: hidden.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: hidden.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const login = (req, res) =>{
    let db = firebase.database();
        db.ref('users').once('value').then( response => {
            let user = response.val().find(user => user.username === req.body.username)
            if(!user){
                res.status(401).json("USER NOT FOUND")
            }
            let isAuthenticated = bcrypt.compareSync(req.body.password, user.password)
            if(!isAuthenticated){
                res.status(403).json('INCORRECT PASSWORD')
            } else {
                req.session.user = {
                    username: req.body.username
                }
                res.status(200).json(req.session.user);
            }
        }).catch( err => console.log( err ));
}




const register = (req, res) =>{
    // connect to the database
    let db = firebase.database();
    db.ref('users').once('value').then(response => {
        let user = response.val();
        for(let i = 0; i < user.length; i++){
            if(user[i].username === req.body.username){
                res.status(500).json('USERNAME ALREADY EXISTS.')
            }
        }
        
        let max = -1;
        let users = response.val();
        
        for(let i = 0; i < users.length; i++){
            if(users[i].userId > max){
                max = users[i].userId
            }
        }
        let id = max + 1;
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(req.body.password, salt);

        db.ref(`users/${id}`).set({
                userId: id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hash,
                profilePic: req.body.profilePic,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                address: req.body.address
        });
            req.session.user = {
                username: req.body.username
            }
            res.status(200).json(req.session.user);  
    }).catch(err => console.log( err ));
}

const signout = (req, res) => {
    req.session.destroy();
    res.status(200).json('SESSION TERMINATED...BUT HE WILL BE BACK..');
}

module.exports = {
    login,
    register,
    signout
}

