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

module.exports = {
    convertToClaimsLoadData
};