export interface Claim {
    detailsOfPrimaryInsured: {
        policyNo: string,
        certificateNo: string,
        company: string,
        name: string,
        address: string
    },
    detailsOfHospitalization: {
        nameOfHospital: string,
        roomCategory: string,
        hospitalizationDueTo: string,
        injuryCause: string
    },
    detailsOfClaim: {
        preHospitalizationExp: string,
        postHospitalizationExp: string,
        ambulanceCharges: string,
        hospitalizationExp: string
    },
    detailsOfPrimaryInsuredBankAccount: {
        pan: string,
        accountNumber: string,
        bankName: string,
        cheque: string,
        ifsc: string
    },
    user: string
}
