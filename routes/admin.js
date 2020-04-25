const express = require("express");
const _router = express.Router();
const con = require("../db");
const { convertToClaimsLoadData, saveActivity } = require("./helperfunctions");

_router.get("/getAllUsersClaims", (req, res) => {
    con.query("SELECT * FROM claims WHERE is_deleted = 0 ORDER BY creationdate DESC", (error, rows) => {
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
    con.query("SELECT * FROM claims WHERE is_deleted = 0 ORDER BY creationdate DESC", (error, rows) => {
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
            saveActivity(req.params.id, "Approved")
                .then(success =>
                    res.send({
                        isApproved: true,
                        msg: "Claim approved successfully"
                    })
                )
                .catch(failure =>
                    res.send({
                        isApproved: true,
                        msg: "Claim approved, but unable to save the approved activity in history"
                    })
                );
        }
        else {
            res.send({ error: error });
        }
    });
});

_router.put("/decline/:id", (req, res) => {
    con.query("UPDATE claims SET status = ? WHERE id = ?", [req.body.status, req.params.id], (error) => {
        if (!error) {
            saveActivity(req.params.id, "Rejected")
                .then(success =>
                    res.send({
                        isRejected: true,
                        msg: "Claim rejected successfully"
                    })
                )
                .catch(failure =>
                    res.send({
                        isRejected: true,
                        msg: "Claim rejected, but unable to save the rejected activity in history"
                    })
                );
        }
        else {
            res.send({ error: error });
        }
    });
});

module.exports = _router;