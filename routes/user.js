const express = require("express");
const _router = express.Router();
const con = require("../db");
const { convertToClaimsLoadData } = require("./helperfunctions");

/**
 * @DESC: Route to get all claims based on logged in user
 */
_router.post("/getAllClaims", (req, res) => {
    con.query("SELECT * FROM claims WHERE user = ? ORDER BY creationdate DESC", [req.body.user], (error, rows) => {
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

    con.query("INSERT INTO claims (detailsofprimaryinsured, detailsofhospitalization, detailsofclaim, detailsofprimaryinsuredbankaccount, creationdate, status, user) VALUES(?, ?, ?, ?, ?, ?, ?)", [detailsOfPrimaryInsured, detailsOfHospitalization, detailsOfClaim, detailsOfPrimaryInsuredBankAccount, creationDate, status, user], (error) => {
        if (!error) {
            res.send({
                inserted: true,
                msg: "Your claim saved successfully"
            });
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
    con.query("SELECT * FROM claims WHERE id = ?", [req.params.id], (error, rows) => {
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
            res.send({
                isUpdated: true,
                msg: "Your claim updated successfully"
            });
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
    con.query("SELECT * FROM claims WHERE user = ? ORDER BY creationdate DESC", [req.body.user], (error, rows) => {
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
 * @DESC: Route to delete a claim
 */
_router.delete("/delete/:id", (req, res) => {
    con.query("DELETE FROM claims WHERE id = ?", [req.params.id], (error, rows) => {
        if (!error) {
            res.send({
                isDeleted: true,
                msg: "Claim deleted successfully."
            });
        }
        else {
            res.send({ error: error });
        }
    });
});

module.exports = _router;