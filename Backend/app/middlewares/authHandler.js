const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authHandler = async (req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];

            let decode = jwt.decode(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");

            next()
        }
        catch(err){
            res.status(400).json({
                message: "token failed"
            });
        }
    }

    if(!token){
        res.status(400).json({
            message: "token not found"
        });
    }
}

module.exports = authHandler;