const express = require("express");
const _router = express.Router();
const con = require("../db");
const { convertToClaimsLoadData, saveActivity } = require("./helperfunctions");

/**
 * @DESC: Route to get all claims based on logged in user
 */
_router.post("/getAllClaims", (req, res) => {
    con.query("SELECT * FROM claims WHERE user = ? AND is_deleted = 0 ORDER BY creationdate DESC", [req.body.user], (error, rows) => {
        if (!error) {
            let claims = convertToClaimsLoadData(rows);
            res.send(claims);
        }
        else {
            res.send({ error: error });
        }
    });
});

/**
 * @DESC: Route to add new claim
 */
_router.post("/addClaim", (req, res) => {
    let date = new Date(req.body.creationDate);
    
    let detailsOfPrimaryInsured = JSON.stringify(req.body.detailsOfPrimaryInsured);
    let detailsOfHospitalization = JSON.stringify(req.body.detailsOfHospitalization);
    let detailsOfClaim = JSON.stringify(req.body.detailsOfClaim);
    let detailsOfPrimaryInsuredBankAccount = JSON.stringify(req.body.detailsOfPrimaryInsuredBankAccount);
    let creationDate = date;
    let status = req.body.status;
    let user = req.body.user;

    con.query("INSERT INTO claims (detailsofprimaryinsured, detailsofhospitalization, detailsofclaim, detailsofprimaryinsuredbankaccount, creationdate, status, user) VALUES(?, ?, ?, ?, ?, ?, ?)", [detailsOfPrimaryInsured, detailsOfHospitalization, detailsOfClaim, detailsOfPrimaryInsuredBankAccount, creationDate, status, user], (error, result) => {
        if (!error) {
            saveActivity(result.insertId, "Inserted")
                .then(success =>
                    res.send({
                        inserted: true,
                        msg: "Your claim saved successfully"
                    })
                )
                .catch(failure =>
                    res.send({
                        inserted: true,
                        msg: "Claim saved, but unable to save the inserted activity in history"
                    })
                );
        }
        else {
            res.send({ error: error });
        }
    });
});

/**
 * @DESC: Route to get single claim based on id
 */
_router.get("/singleClaim/:id", (req, res) => {
    con.query("SELECT * FROM claims WHERE id = ? AND is_deleted = 0", [req.params.id], (error, rows) => {
        if (!error) {
            let selectedClaim = {
                detailsOfPrimaryInsured: JSON.parse(rows[0].detailsofprimaryinsured),
                detailsOfHospitalization: JSON.parse(rows[0].detailsofhospitalization),
                detailsOfClaim: JSON.parse(rows[0].detailsofclaim),
                detailsOfPrimaryInsuredBankAccount: JSON.parse(rows[0].detailsofprimaryinsuredbankaccount),
            }
            res.send(selectedClaim);
        }
        else {
            res.send({ error: error });
        }
    });
});

/**
 * @DESC: Route to update claim
 */
_router.put("/updateClaim/:id", (req, res) => {
    let detailsOfPrimaryInsured = JSON.stringify(req.body.detailsOfPrimaryInsured);
    let detailsOfHospitalization = JSON.stringify(req.body.detailsOfHospitalization);
    let detailsOfClaim = JSON.stringify(req.body.detailsOfClaim);
    let detailsOfPrimaryInsuredBankAccount = JSON.stringify(req.body.detailsOfPrimaryInsuredBankAccount);

    con.query("UPDATE claims SET detailsofprimaryinsured = ?, detailsofhospitalization= ?, detailsofclaim = ?, detailsofprimaryinsuredbankaccount = ? WHERE id = ?", [detailsOfPrimaryInsured, detailsOfHospitalization, detailsOfClaim, detailsOfPrimaryInsuredBankAccount, req.params.id], (error) => {
        if (!error) {
            saveActivity(req.params.id, "Updated")
                .then(success =>
                    res.send({
                        isUpdated: true,
                        msg: "Your claim updated successfully"
                    })
                )
                .catch(failure =>
                    res.send({
                        isUpdated: true,
                        msg: "Claim updated, but unable to save the updated activity in history"
                    })
                );
        }
        else {
            res.send({ error: error });
        }
    });
});

/**
 * @DESC: This route gets the claims based on logged in user and filters the final result based on serach form fields
 */
_router.post("/search", (req, res) => {
    con.query("SELECT * FROM claims WHERE user = ? AND is_deleted = 0 ORDER BY creationdate DESC", [req.body.user], (error, rows) => {
        // console.log(req.body.date, req.body.status, req.body.name);
        if (!error) {
            let filteredClaims = rows.filter(claim => {
                let date = claim.creationdate.getMonth() + 1 + "-" + claim.creationdate.getDate() + "-" + claim.creationdate.getFullYear();
                
                return date === req.body.date && claim.status === req.body.status && JSON.parse(claim.detailsofprimaryinsured).name === req.body.name;
            });
            let searchClaims = convertToClaimsLoadData(filteredClaims);
            res.send(searchClaims);
        }
        else {
            res.send({ error: error });
        }
    });
});

/**
 * @DESC: Route to soft delete a claim
 */
_router.put("/delete/:id", (req, res) => {
    con.query("UPDATE claims SET is_deleted = ? WHERE id = ?", [req.body.deleted, req.params.id], (error) => {
        if (!error) {
            saveActivity(req.params.id, "Deleted")
                .then(success =>
                    res.send({
                        isDeleted: true,
                        msg: "Claim deleted successfully."
                    })
                )
                .catch(failure =>
                    res.send({
                        isDeleted: true,
                        msg: "Claim deleted, but unable to save the deleted activity in history."
                    })
                );
        }
        else {
            res.send({ error: error });
        }
    });
});

_router.get("/get-action-history/:id", (req, res) => {
    con.query("SELECT * FROM activity_log WHERE claim_id = ? ORDER BY performed_at DESC", [req.params.id], (error, rows) => {
        if (!error) {
            res.send(rows);
        }
        else {
            res.send({ error: error });
        }
    });
});

module.exports = _router;