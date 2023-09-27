const mongoose = require('mongoose');

const issuesSchema = new mongoose.Schema({
    initiatorID:{
        type:String,
        required:true,
    },
    issueTitle:{
        type:String,
        required:true,
    },
    issueDescription:{
        type:String,
        required:true,
    },
    parkingNumber:{
        type:String,
        required:true,
    },
    vehicleNumber:{
        type:String,
        required:true,
    },
    img:{
        type:String
    },
    issuedAgainst:{
        type:String,
    },
    issuedTime:{
        type: Date,
        required:true,
        default:Date.now,
    },
    resolvedTime:{
        type: Date,
        required:true,
        default:null,
    },
    issueStatus:{
        type:String,
        required:true,
        default:"Open"
    }
})

// ----------------- CREATING MODEL -----------------
const issuesModel = mongoose.model(
    "issuesSchema",
    issuesSchema
)

// ----------------- EXPORTING MODEL -----------------
module.exports={
    ISSUESMODEL:issuesModel,
};