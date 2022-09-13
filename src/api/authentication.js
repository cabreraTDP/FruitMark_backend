
const { decodeJWT } = require('../utils/jwt');

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if(token){
        const info = decodeJWT(token);
        req.id = info.id;
        req.userType = info.userType;

        next();

    }else{
        return res.status(401).json({error: 'You are not authenticated.'})
    }
}