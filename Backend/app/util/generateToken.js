const jwt = require("jsonwebtoken");

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "60s"
    })
}

module.exports = generateToken;