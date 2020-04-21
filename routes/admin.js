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
    con.query("SELECT * FROM claims ORDER BY creationdate DESC", (error, rows) => {
        // console.log(req.body.policyNo, req.body.userEmail);
        if (!error) {
            let filteredClaims = rows.filter(claim => {
                return claim.user === req.body.userEmail && JSON.parse(claim.detailsofprimaryinsured).policyNo === req.body.policyNo
            });
            let searchClaims = convertToClaimsLoadData(filteredClaims);
            res.send(searchClaims);
        }
        else {
            res.send({ error: error });
        }
    });
});

_router.put("/approve/:id", (req, res) => {
    con.query("UPDATE claims SET status = ? WHERE id = ?", [req.body.status, req.params.id], (error) => {
        if (!error) {
            res.send({ isApproved: true });
        }
        else {
            res.send({ error: error });
        }
    });
});

_router.put("/decline/:id", (req, res) => {
    con.query("UPDATE claims SET status = ? WHERE id = ?", [req.body.status, req.params.id], (error) => {
        if (!error) {
            res.send({ isRejected: true });
        }
        else {
            res.send({ error: error });
        }
    });
});

module.exports = _router;