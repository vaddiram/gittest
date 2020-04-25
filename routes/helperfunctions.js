const con = require("../db");

const convertToClaimsLoadData = rows => {
    return rows.map(claim => (
        {
            id: claim.id,
            policyNo: JSON.parse(claim.detailsofprimaryinsured).policyNo,
            name: JSON.parse(claim.detailsofprimaryinsured).name,
            totalExpenses: parseInt(JSON.parse(claim.detailsofclaim).preHospitalizationExp) + parseInt(JSON.parse(claim.detailsofclaim).postHospitalizationExp) + parseInt(JSON.parse(claim.detailsofclaim).ambulanceCharges) + parseInt(JSON.parse(claim.detailsofclaim).hospitalizationExp),
            currentStatus: claim.status
        }
    ));
}

// const saveActivity = (claimId, activityPerformed) => {
//     // console.log(claimId, activityPerformed);
//     let result;
//     con.query("INSERT INTO activity_log (claim_id, action_type) VALUES (?, ?)", [claimId, activityPerformed], (error) => {
//         if(!error)
//             result = true;
//         else
//             result = false;
//     });

//     return result;
// }

const saveActivity = (claimId, activityPerformed) => {
    return new Promise((resolve, reject) => {
        con.query("INSERT INTO activity_log (claim_id, action_type) VALUES (?, ?)", [claimId, activityPerformed], (error) => {
            if (error)
                reject(false);
            resolve(true);
        });
    });
}

module.exports = {
    convertToClaimsLoadData,
    saveActivity
};