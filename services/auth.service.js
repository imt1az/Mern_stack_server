
const {User} = require('../models/user')
const {ApiError} = require('../middleWare/apiError')
const httpStatus = require('http-status')
const userService = require('./user.Service')


const createUser = async(email,password)=>{
    try{

       if(await User.emailTaken(email)){
        console.log('Same Email Error');
        throw new ApiError(httpStatus.BAD_REQUEST,'Sorry Email takens')
        
       }

       const user = new User({
        email,password
       })
       await user.save();
       return user;
    }
    catch(error){
        console.log('Create User Error')
         throw error;
    }
}

const getAuthToken = async(user)=>{
   const token = user.generateAuthToken();
   return token;
}
const signInWithEmailAndPassword = async(email,password)=>{
    try{
            const user = await userService.findUserByEmail(email);
            if(!user){
                throw new ApiError(httpStatus.UNAUTHORIZED,'Can not find the User')
            }
            if(!(await user.comparedPassword(password))){
                throw new ApiError(httpStatus.UNAUTHORIZED,'Wrong Password')
            }

            return user;
    }
    catch(error){
            throw error;
    }
}

module.exports = {
    createUser,getAuthToken,signInWithEmailAndPassword
}