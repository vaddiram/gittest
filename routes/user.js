const express = require("express");
const _router = express.Router();
const con = require("../db");

_router.post("", (req, res) => {
    con.query("SELECT * FROM claims WHERE user = ?", [req.body.user], (error, rows) => {
        if (!error) {
            let claims = rows.map(claim => (
                {
                    id: claim.id,
                    policyNo: JSON.parse(claim.detailsofprimaryinsured).policyNo,
                    name: JSON.parse(claim.detailsofprimaryinsured).name,
                    totalExpenses: parseInt(JSON.parse(claim.detailsofclaim).preHospitalizationExp) + parseInt(JSON.parse(claim.detailsofclaim).postHospitalizationExp) + parseInt(JSON.parse(claim.detailsofclaim).ambulanceCharges) + parseInt(JSON.parse(claim.detailsofclaim).hospitalizationExp),
                    currentStatus: claim.status
                }
            ));
            res.send(claims);
        }
        else {
            res.send({ error: error });
        }
    });
});

_router.post("/addClaim", (req, res) => {
    let detailsOfPrimaryInsured = JSON.stringify(req.body.detailsOfPrimaryInsured);
    let detailsOfHospitalization = JSON.stringify(req.body.detailsOfHospitalization);
    let detailsOfClaim = JSON.stringify(req.body.detailsOfClaim);
    let detailsOfPrimaryInsuredBankAccount = JSON.stringify(req.body.detailsOfPrimaryInsuredBankAccount);
    let creationDate = req.body.creationDate;
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

module.exports = _router;