const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/",(req,res) =>{
    const sql = `SELECT v.id, v.naam,
                        vg.id as vliegtuigId, vg.naam as vliegtuigNaam,
                        u.id as userId, u.naam as userNaam, u.email
                        from vlucht v 
                        join vliegtuig vg on vg.id = v.vliegtuigId 
                        join user u on u.id = v.userId order by v.id`;
    db.query(sql,(err, results) =>{
        if(err){
            return res.status(500).json(err);
        }
        const formattedResults = results.map(row =>({
            id: row.id,
            naam: row.naam,
            Vliegtuig: {id: row.vliegtuigId, naam: row.vliegtuigNaam},
            Gebruiker: {id: row.userId, naam: row.userNaam, email: row.email}
        }));
        res.json(formattedResults);
    })
})
router.post("/",(req,res) =>{
    const {naam, vliegtuigId, userId} = req.body;

    const sql = "INSERT INTO vlucht(naam, vliegtuigId, userId)  VALUES (?,?,?)";
    db.query(sql,[naam,vliegtuigId,userId],(err,result) =>{
        if (err) {
            console.error("DATABASE FOUT:", err);
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({id: result.insertId})
    })
})

router.put("/:id",(req,res) =>{
    const {id} = req.params;
    const {naam, vliegtuigId, userId} = req.body;

    console.log("UPDATE POGING:", { id, naam, vliegtuigId, userId }); // VOEG DIT TOE
    const sql = `UPDATE vlucht SET naam = ?, vliegtuigId = ?, userId = ? WHERE id = ?`;

    db.query(sql, [naam, vliegtuigId,userId,id], (err,result) =>{
        if (err) {
            console.error("Error updating vlucht:",err);
            return res.status(500).json({error: err.message});
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "vlucht niet gevonden"});
        }
        res.json({message: "vlucht succesvol bijgewerkt"});
    });
});
module.exports = router;