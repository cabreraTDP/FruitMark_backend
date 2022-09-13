const { encryptPassword, matchPassword } = require('../../utils/crypt')
const User = require('../../models/User');
const mongoose = require('mongoose');
const { createJWT } = require('../../utils/jwt');

const signIn = async(req, res) => {

    const {user, password} = req.body;

    const existingUser = await User.findOne({user});

    if(!existingUser){
        return res.status(400).json({
            error: 'User does not exist.' 
        });
    };

    const isPasswordCorrect = await matchPassword(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({
            error: 'Password is incorrect.' 
        });
    };

    info = {
        id: existingUser._id,
        userType: existingUser.userType
    };

    const token = createJWT(info);

    res.status(200).json({
        data: token
    })
};


const createUser = async(req, res) => {

    const {user, password, userType} = req.body;

    const existingUser = await User.exists({user});

    if(existingUser){
        return res.status(400).json({
            error: 'User already exists.' 
        });
    };

    const hashPassword = await encryptPassword(password);

    const newUser = new User({
        user,
        password: hashPassword,
        userType
    });

    const userCreated = await newUser.save();

    res.status(200).json({
        userID: userCreated._id
    });
}

module.exports = {
    signIn,
    createUser
}