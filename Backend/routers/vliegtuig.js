const express = require("express");
const router = express.Router();
const db = require("../db");
router.get("/",(req,res) =>{
    db.query("SELECT id, naam FROM vliegtuig",
        (err,results) =>{
            res.json(results);
    });
});
router.post("/",(req,res) =>{
    const {naam} = req.body;
    const sql = "INSERT INTO vliegtuig VALUES (?)";
    db.query(sql,[naam],(err,result) =>{
        if (err) {
            console.error("DATABASE FOUT:", err);
            return res.status(500).json({message: err.message});
        }
        res.status(201).json({id: result.insertId,naam})
    })
})
module.exports = router;