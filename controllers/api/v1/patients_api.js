const User = require('../../../models/doctor');
const Report = require('../../../models/report');
const Patient = require('../../../models/patient');

// create report
module.exports.createReport = async function(req,res){

    // find patient whose report needs to be created
    let patient = await Patient.findOne({_id:req.params.id});

    //if no patient exist of such id then return
    if(!patient){
        return res.json(400,{
            message:"no patient found with this id"
        });
    }

    //find the doctor who needs to create this report
    let doctor = await User.findOne({_id:req.user});
    const newReport = await Report.create({
        doctor:doctor,
        patient:patient,
        status:req.body.status
    });
    
    //push this report in the array of reports of patient as a patient can have multiple reports
    patient.reports.push(newReport);
    patient.save();

    return res.json(200,{
        message:"congrats!!you have created the report"
    });
}


module.exports.all_reports = async function(req,res){
    //populate all the fields of the patient from the DB to use them later
    try{
        let patient = await Patient
                            .findOne({_id:req.params.id})
                            .populate({
                                path:"reports",
                                populate:{
                                    path:"doctor"
                                },
                                populate:{
                                    path:"patient"
                                },
                                populate:{
                                    path:"status"
                                }
                            })
                            .sort('-createdAt');
        
        if(!patient){
            return res.json(422,{
                message:"check your id"
            });
        }
        // finally , if all goes well, send all reports of a user
        return res.json(200,{
            data:{
                patient_reports: patient.reports
            }
        });
    }
    catch(err){
        return res.json(500, {
            message:"internal server error"
        });
    }
}