import axios from 'axios'

const initialState = {
    users: {}
}

// action types
const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'


// action creators
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