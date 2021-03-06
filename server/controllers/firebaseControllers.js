const bcrypt = require('bcryptjs');
const firebase = require('firebase');
//INITIALIZING FIREBASE
let hidden = process.env;
//HERE WE INITIALIZE THE CONFIGURATION FOR FIREBASE
var config = {
    apiKey: "AIzaSyC4xQuKAX5zj5TuVO0GUFNfzJA_bC1zfW0",
    // hidden.REACT_APP_API_KEY,
    authDomain: "first-night-out.firebaseapp.com",
    // hidden.REACT_APP_AUTH_DOMAIN,
    databaseURL: "https://first-night-out.firebaseio.com",
    // hidden.REACT_APP_DATABASE_URL,
    projectId: "first-night-out",
    // hidden.REACT_APP_PROJECT_ID,
    storageBucket: "first-night-out.appspot.com",
    // hidden.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: "146896437188"
    // hidden.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const login = (req, res) =>{
    //WE CHECK TO SEE IF THE USER EXISTS IN THE DATABASE
    let db = firebase.database();
        db.ref('users').once('value').then( response => {
            let user = response.val().find( user => user.username === req.body.username)
            if(!user){
                res.status(401).json("USER NOT FOUND")
            }
            let isAuthenticated = bcrypt.compareSync(req.body.password, user.password)
            //IF THEY DO BUT THE PASSWORD WAS INCORRECT WE SEND BACK AN ERROR
            if(!isAuthenticated) {
                res.status(403).json('INCORRECT PASSWORD')
            } else { //OTHERWISE WE LOG THEM IN AND STORE THEM ON THE SESSION
                req.session.user = {
                    city: user.city,
                    username: req.body.username,
                    userId : user.userId,
                    address: user.address,
                    state: user.state
                }
                res.status(200).json(req.session.user);
            }
        }).catch( err => console.log( err ));
}



const register = (req, res) =>{
    // connect to the database
    let db = firebase.database();
    let test = db.ref('users')
    //WE CHECK TO SEE IF THE USERNAME ALREADY EXISTS
    test.once('value').then(response => {
        let user = response.val();
        for(let i = 0; i < user.length; i++){
            if(user[i].username === req.body.username){
                res.status(500).json('USERNAME ALREADY EXISTS.')
            }
        }
        //IF NOT WE FIND THE HIGHEST CURRENTLY EXISTING USERID AND ADD 1 TO BE USED AS THE NEW USER ID
        let max = -1;
        let users = response.val();
        for(let i = 0; i < users.length; i++){
            if(users[i].userId > max){
                max = users[i].userId
            }
        }
        let id = max + 1;
        //WE HASH THE PASSWORD
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(req.body.password, salt);
        //AND THEN SET THEM IN THE DATABASE
        db.ref(`users/${id}`).set({
                userId: id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hash,
                profilePic: 'A',
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                address: req.body.address
        });
        //LASTLY WE STORE THEM ON SESSION AND THEN SEND THEM BACK
        req.session.user = {
            city: req.body.city,
            username: req.body.username,
            userId : id,
            address: req.body.address,
            state: req.body.state
        }
        res.status(200).json(req.session.user);
    }).catch(err => console.log( err ));
}

const signout = (req, res) => {
    //HERE WE LOGOUT
    req.session.destroy();
    res.status(200).json('SESSION TERMINATED...BUT HE WILL BE BACK..');
}

const createRoute = async (req, res) => {
    const { place1, place2, place3, userID, creationDate, isPublic, city } = req.body; //WE DESTRUCTURE ALL THE NECESSARY DATA OFF OF THE BODY
    try {
        let newRouteKey = await firebase.database().ref('/routes').push({'a': 'a'}).key 
        let updateObj = {
            place1,
            place2,
            place3,
            userID,
            creationDate,
            isPublic,
            routeID: newRouteKey,
            city,
            likes: 0
        }
        //WE SET THE ROUTE IN THE DATABASE
        await firebase.database().ref(`routes`).child(newRouteKey).set(updateObj)
        res.sendStatus(200)
    } catch {
        res.status(400).json({error: "REQUEST_FAILED"})
    }
}

const getRoutesByUserID = async (req, res) => {
    
    const response = await firebase.database().ref(`routes`).once('value');
    const routes = response.val();
    let filteredRoutes = [];
    for(let routeID in routes) {
        if(routes[routeID].userID == req.params.id) {
            filteredRoutes.push(routes[routeID]);
        }
    }
    if(filteredRoutes.length > 0) { 
        res.status(200).json(filteredRoutes);
    } else {
        res.status(404).json({error: 'NO_ROUTES_FOUND'});
    }
}

const getRoutesBasedOnCity = async (req, res) => {
    const response = await firebase.database().ref(`routes`).once('value');
    const routes = response.val();
    let filteredRoutes = [];
    for(let routeID in routes) {
        if(routes[routeID].city === req.params.city) {
            filteredRoutes.push(routes[routeID]);
        }
    }
    if(filteredRoutes.length > 0) { 
        res.status(200).json(filteredRoutes);
    } else {
        res.status(404).json({error: 'NO_ROUTES_FOUND'});
    }
}

const setPreferences = async (req, res) => {
    const { nonAlcoholic, familyFriendly } = req.body;
    const preferences = await firebase.database().ref('preferences').once('value');
    let userPreferenceID = null;
    for(let preferenceID in preferences) {
        if(preferences[preferenceID].userId == req.params.id) {
            userPreferenceID = preferenceID;
        }
    }
    if(userPreferenceID) {
        await firebase.database().ref(preferences).child(userPreferenceID).set({
            nonAlcoholic,
            familyFriendly,
            userID: req.params.id,
            preferenceId: userPreferenceID
        })
        res.sendStatus(200)
    } else {
        res.status(404).json({error: 'USER_NOT_FOUND'});
    }
}

const getUsers = async (req, res) => {
    let user = await firebase.database().ref(`users/${req.params.id}`).once('value');
    res.status(200).json(user.val());
}

const getUser = (req,res) => {
    res.status(200).json(req.session.user)
}

const getRoute = async (req, res) => {
    let route = await firebase.database().ref(`/routes/${req.params.id}`).once('value');
    res.status(200).json(route.val());
}

const setProfLink = async (req, res) => {
    try {
        await firebase.database().ref(`users/${req.body.userID}`).update({profilePic: req.body.downloadURL})
        res.status(200)
    } catch(e) {
        res.status(400).json({error: 'INVALID_REQUEST'});
    }
}

const getProfLink = async (req, res) => {
    let userInfo = await firebase.database().ref(`users/${req.params.id}`).once('value')
    let routes = await firebase.database().ref('routes').once('value');
    let returnArr = [];
    for(let prop in routes.val()) {
        if(+routes.val()[prop].userID === +req.params.id) {
            returnArr.push(routes.val()[prop]);
        }
    }
    if(userInfo.val().profilePic) {
        res.status(200).json({profilePicture: userInfo.val().profilePic, routes: returnArr});
    } else {
        res.status(404).json({error: 'USER_NOT_FOUND'});
    }
}
const getCity = (req, res) => {
    const db = firebase.database();
    db.ref('routes').once('value')
    .then(response => {
        let routes = response.val();
        let filterdCity = [];
        for(let route in routes){
            if(req.params.city.toUpperCase() === routes[route].city.toUpperCase()){
                filterdCity.push(routes[route])
            }
        }
        res.status(200).json(filterdCity)
    }).catch( err => console.log(err));
}

const getVotes = (req,res) => {
    const db = firebase.database()
    db.ref(`routes/${req.body.routeID}`).once('value')
    .then(response => {
        let likes = +response.val().likes
        if(req.body.vote > 0) {
            likes += 1
        }
        else if (req.body.vote < 0) {
            if(likes <= 0) {
                likes = 0
            }
            else {
                likes -= 1
            }
        }

        db.ref(`routes/${req.body.routeID}`).update({likes: likes})
            .then(() => {
                res.sendStatus(200)
            }).catch(() => {
                res.status(404).json('Could not update')
            })
            
    }).catch(err => {
        console.log(err);
    })
}



module.exports = {
    login,
    register,
    signout,
    createRoute,
    getRoutesByUserID,
    getRoutesBasedOnCity,
    setPreferences, 
    getUsers,
    getRoute,
    setProfLink,
    getProfLink,
    getCity,
    getVotes,
    getUser
}