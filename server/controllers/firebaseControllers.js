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
                console.log('WORKED');
                res.status(200).json(req.session.user);
            }
        }).catch( err => console.log( err ));
}



const register = (req, res) =>{
    // connect to the database
    let db = firebase.database();
    let test = db.ref('users')
    console.log(test);
    test.once('value').then(response => {
        console.log(register);
        let user = response.val();
        for(let i = 0; i < user.length; i++){
            if(user[i].username === req.body.username){
                res.status(500).json('USERNAME ALREADY EXISTS.')
            }
        }
        console.log(1)
        let max = -1;
        let users = response.val();
        console.log(1)  
        for(let i = 0; i < users.length; i++){
            if(users[i].userId > max){
                max = users[i].userId
            }
        }
        let id = max + 1;
        const salt = bcrypt.genSaltSync(12);
        console.log('password', req.body.password)
        console.log('salt: ', salt);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log(1)
        db.ref(`users/${id}`).set({
                userId: id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hash,
                // profilePic: req.body.profilePic,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                address: req.body.address
        });
        req.session.user = {
            city: req.body.city,
            username: req.body.username,
            userId : req.body.userId,
            address: req.body.address,
            state: req.body.state
        }
        console.log('MADE IT HERE')
        console.log('ALSO WORKED!')
        // firebase.database().ref('preferences').once('value').then(preferences => {
        //     firebase.database().ref(`preferences/${preferences.val().length}`).set({
        //         nonAlcoholic: false,
        //         familyFriendly: false,
        //         userId: id,
        //         preferenceId: preferences.val().length
        //     })
        //     res.status(200).json(req.session.user);  
        // }).catch(err => res.status(400).json({error: err}));
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
        console.log(newRouteKey);
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
    console.log(user.val())
    res.status(200).json(user.val());
}

const getRoute = async (req, res) => {
    let route = await firebase.database().ref(`/routes/${req.params.id}`).once('value');
    res.status(200).json(route.val());
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
    getRoute
}