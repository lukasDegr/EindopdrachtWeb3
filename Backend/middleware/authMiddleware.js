require("dotenv").config();
// const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticatieToken = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Geen toegang: Token ontbreekt" });
    }
    jwt.verify(token,JWT_SECRET,(err,user) =>{
       if (err) {
        return res.status(403).json({message: "token niet geldig"})
       }
    req.user = user;
    next();
    });
};

module.exports = authenticatieToken;