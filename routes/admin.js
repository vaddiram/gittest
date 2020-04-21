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

_router.post("/search", (req, res) => {
    con.query("SELECT * FROM claims WHERE user = ?", [req.body.user], (error, rows) => {
        console.log(req.body.date, req.body.status, req.body.name);
        // if (!error) {
        //     let filteredClaims = rows.filter(claim => {
        //         return claim.creationdate === req.body.date && claim.status === req.body.status && JSON.parse(claim.detailsofprimaryinsured).name === req.body.name
        //     });
        //     let searchClaims = convertToClaimsLoadData(filteredClaims);
        //     res.send(searchClaims);
        // }
        // else {
        //     res.send({ error: error });
        // }
    });
});

module.exports = _router;