import axios from 'axios'

const initialState = {
    // users: {}
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    address: '',
    city: '',
    st: '',
    zip: '',
    profilePic: '',
    routeCreationStep: 1,
    places: []
}

// action types
const LOGIN = 'LOGIN';
// const REGISTER = 'REGISTER';
const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const UPDATE_CITY = 'UPDATE_CITY';
const UPDATE_STATE = 'UPDATE_STATE';
const UPDATE_ZIP = 'UPDATE_ZIP';
const UPDATE_PROFILE_PIC = 'UPDATE_PROFILE_PIC';
const UPDATE_PLACES = 'UPDATE_PLACES';
const RESET_PLACES = 'RESET_PLACES';

// action creators
export function resetPlaces() {
    return {
        type: RESET_PLACES,
    }
}
export function addPlaceToRoute(place) {
    return {
        type: UPDATE_PLACES,
        payload: place
    }
}
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
// export function register(firstName,lastName,username,password,address,city,state,zip,profilePic) {
//     return {
//         type: REGISTER,
//         payload: axios.post('/api/auth/register',{firstName,lastName,username,password,address,city,state,zip,profilePic})
//         .then( response => {
//             console.log('register response',response)
//         }).catch( err =>  console.log(err))
//     }
// }


// reducer function
function reducer(state=initialState, action) {
    switch(action.type) {
        case RESET_PLACES: 
            return {
                ...state,
                places: []
            }
        case `${LOGIN}_FULFILLED`:
            return {
                ...state, 
                user: action.payload.data
            }
        // case `${REGISTER}_FULFILLED`:
        //     return {
        //         ...state, 
        //         user: action.payload.data
        //     }
        case UPDATE_FIRST_NAME:
            return {
                ...state,
                firstName: action.payload
            }
        case UPDATE_LAST_NAME:
            return {
                ...state,
                lastName: action.payload
            }
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case UPDATE_PASSWORD: 
            return {
                ...state,
                password: action.payload
            }
        case UPDATE_ADDRESS: 
            return {
                ...state,
                address: action.payload
            }
        case UPDATE_CITY: 
            return {
                ...state,
                city: action.payload
            }
        case UPDATE_STATE: 
            return {
                ...state,
                st: action.payload
            }
        case UPDATE_ZIP: 
            return {
                ...state,
                zip: action.payload
            }
        case UPDATE_PROFILE_PIC:
            return {
                ...state,
                profilePic: action.payload
            }
        case UPDATE_PLACES:
            return {
                ...state,
                places: [...state.places, action.payload]
            }
        
        default: return state;
    }
}

export default reducer;