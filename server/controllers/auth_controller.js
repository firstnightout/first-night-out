

const login = (req, res) =>{
    //connect to the database
    //check req.body against database credentials
        // compare hashed password against one in database
    //if no user, return error
    //if user is true, put user on session
    // return the req.session.user
}

const register = (req, res) =>{
    // connect to the database
    // hash password 
    // insert into database all required info from the req.body
    // put user on session
    // return the req.session.user
}





module.exports = {
    login,
    register
}