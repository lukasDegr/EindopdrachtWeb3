require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/",(req,res) =>{
    const { email, wachtwoord } = req.body;

    db.query("SELECT * FROM user WHERE email = ?", [email], async (err,results) =>{
        if (err || results.length ===0) {
            return res.status(401).json({message: "Ongeldige logingegevens"});
        }
        const gebruiker = results[0];

        const token = jwt.sign(
            { id:gebruiker.id, admin: gebruiker.admin },
            JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.json({token, gebruiker: {naam: gebruiker.naam, admin: gebruiker.admin}});
    });
});
module.exports = router;