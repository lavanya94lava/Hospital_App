// this file contains all the methods used for getting reports of a certain type

const User = require('../../../models/doctor');
const Report = require('../../../models/report');
const Patient = require('../../../models/patient');

// this function gives you all the reports of all the patients filtered out by status. for eg. negative, travlled-quarantined etc.
module.exports.statusReports = async function(req,res){
    
    const report = await Report.find({status:req.params.status})
                        .sort('-createdAt')
                        .populate({
                            path:'doctor',
                        })
                        .populate({
                            path:'patient'
                        });

    if(report.length ==0){
        return res.json(200, {
            message: "no reports found for the status " + req.params.status
        })
    }

    return res.json(200, {
        data:{
            reports: report,
            status:req.params.status
        }
    });
}