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
            let user = response.val().find( user => user.username === req.body.username)
            if(!user){
                res.status(401).json("USER NOT FOUND")
            }
            let isAuthenticated = bcrypt.compareSync(req.body.password, user.password)
            if(!isAuthenticated) {
                res.status(403).json('INCORRECT PASSWORD')
            } else {
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
    test.once('value').then(response => {
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
                profilePic: 'A',
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                address: req.body.address
        });
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
    req.session.destroy();
    res.status(200).json('SESSION TERMINATED...BUT HE WILL BE BACK..');
}

const createRoute = async (req, res) => {
    const { place1, place2, place3, userID, creationDate, isPublic, city } = req.body;
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
        console.log(e);
        res.status(400).json({error: 'INVALID_REQUEST'});
    }
}

const getProfLink = async (req, res) => {
    let userInfo = await firebase.database().ref(`users/${req.params.id}`).once('value')
    if(userInfo.val().profilePic) {
        res.status(200).json(userInfo.val().profilePic);
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