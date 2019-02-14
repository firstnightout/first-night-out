import axios from 'axios'

const initialState = {
    // users: {}
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    profilePic:''
}

// action types
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const UPDATE_CITY = 'UPDATE_CITY';
const UPDATE_STATE = 'UPDATE_STATE';
const UPDATE_ZIP = 'UPDATE_ZIP';
const UPDATE_PROFILE_PIC = 'UDATE_PROFILE_PIC';


// action creators
export function updateFirstName(firstName){
    return {
        type: UPDATE_FIRST_NAME,
        payload: firstName
    }
}
export function updateLastName(lastName){
    return {
        type:  UPDATE_LAST_NAME,
        payload: lastName
    }
}
export function updateUsername(username){
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}
export function updatePassword(password){
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}
export function updateAddress(address){
    return {
        type: UPDATE_ADDRESS,
        payload: address
    }
}
export function updateCity(city){
    return {
        type: UPDATE_CITY,
        payload: city
    }
}
export function updateState(state){
    return {
        type: UPDATE_STATE,
        payload: state
    }
}
export function updateZip(zip){
    return {
        type: UPDATE_ZIP,
        payload: zip
    }
}
export function updateProfilePic(url){
    return {
        type: UPDATE_PROFILE_PIC,
        payload: url
    }
}



export function login(username,password) {
    return {
        type: LOGIN,
        payload: axios.post('/api/auth/login', {username,password})
    }
}

export function register(firstName,lastName,username,password,address,city,state,zip,profilePic) {
    return {
        type: REGISTER,
        payload: axios.post('/api/auth/register',{firstName,lastName,username,password,
                                                    address,city,state,zip,profilePic})
    }
}


// reducer function
function reducer(state=initialState, action) {
    switch(action.type) {
        case `${LOGIN}_FULFILLED`:
            return {
                ...state, user: action.payload.data
            }
        case `${REGISTER}_FULFILLED`:
            return {
                ...state, user: action.payload.data
            }

        default: return state;
    }
}




export default reducer;