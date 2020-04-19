const express = require("express");
const _router = express.Router();
const con = require("../db");
const { convertToClaimsLoadData } = require("./helperfunctions");

_router.get("/getAllUsersClaims", (req, res) => {
    con.query("SELECT * FROM claims ORDER BY creationdate DESC", (error, rows) => {
        if (!error) {
            let claims = convertToClaimsLoadData(rows);
            res.send(claims);
        }
        else {
            res.send({ error: error });
        }
    });
});

module.exports = _router;