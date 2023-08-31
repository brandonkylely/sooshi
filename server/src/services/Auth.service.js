// Import our Dynamoose User model, Bcrypt for password hashing and uuidv4
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const {v4: uuidv4} = require("uuid")
const jwtAuth = require('../utils/JWTauth')

exports.registerUser = async function(newUserInfo) {
    // newUserInfo is req.body from the Auth.controller.js register function

    // First, check is there's already a user registered with this username
    let existingUser;
    try {
        // Runs a DynamoDB scan and returns the result
        existingUser = await User.scan({username: {eq: newUserInfo.username}}).exec()
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
    // If there already is a User, throw an Error
    if(existingUser.count > 0) {
        throw new Error("EXISTING_USER_ERROR")
    } 

    // User doesn't already exist, so let's register them
    var newUser 
    try {
        const uuid = uuidv4()
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(newUserInfo.password, salt)
        newUser = await User.create({
            "id": uuid,
            "username": newUserInfo.username,
            "email": newUserInfo.email,
            "password": hashedPass
        })
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

    var authToken = await exports.loginUser({"username": newUser.username, "password": newUserInfo.password})

    return authToken
    // return newUser
}

exports.loginUser = async function(userInfo) {
    // userInfo should be a JSON Object
    // First, Check if the User even exists - In contrast to the above, in this case we do want there to be an existing User
    var existingUser
    try {
        existingUser = await User.scan({username: {eq: userInfo.username}}).exec()
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
    // If User doesn't exist, throw an error
    if(existingUser.count == 0) {
        throw new Error("INVALID_LOGIN_CREDENTIALS")
    }

    // Check if the supplied password matches the bcrypt hashed password saved in the User record
    var validPass
    try {
        // bcyrpt.compare will return true / false depending on if the passwords match
        // User.scan() always returns an array, hence why we specify existingUser[0].password below
        validPass = await bcrypt.compare(userInfo.password, existingUser[0].password)
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }

    // If validPass is false, throw an error
    if(!validPass) {
        throw new Error("INVALID_LOGIN_CREDENTIALS")
    }


    var authToken = await jwtAuth.generateAccessToken(existingUser[0].username)
    
    return {token: authToken}
    // return {"message": "Login Successful"}
  }

  exports.generateUUID = async function() {
    const uuid = uuidv4();
    return uuid;
  }

  // exports.getUser = async function(userId) {
  //   // userId is the id of the User record we want to retrieve
  //   try {
  //       let user = await User.get(userId);
  //   } catch (err) {
  //       console.log(err);
  //       throw new Error(err);
  //   }
  //   return user;
  // }