const express = require("express");
const router = express.Router();
const db = require("../db");
router.get("/", (req, res) => {
    db.query("SELECT id, naam, email, admin FROM user",
    (err, results) => {
        res.json(results);
    });
});
router.post("/", (req, res) => {
    const { naam, email, admin } = req.body;
    
    // Zet de boolean om naar 1 of 0 voor MySQL
    const adminValue = admin === true ? 1 : 0; 

    const sql = "INSERT INTO user (naam, email, admin) VALUES (?, ?, ?)";
    db.query(sql, [naam, email, adminValue], (err, result) => {
        if (err) {
            console.error("DATABASE FOUT:", err); 
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: result.insertId, naam, email, admin });
    });
});

router.put("/:id", (req, res) => {
    const { naam, email, admin } = req.body;
    const id = req.params.id;
    const sql = "UPDATE user SET naam = ?, email = ?, admin = ? WHERE id = ?";
    db.query(sql, [naam, email, admin, id], (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            res.status(500).json({ message: "Error updating user" });
        } else {
            res.json({ id, naam, email, admin });
        }
    });
});

module.exports = router;