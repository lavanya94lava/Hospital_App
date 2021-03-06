// this file contains all the functionalities of a patient like getting all reports, registerng a patient, creating a report of a patient.

const User = require('../../../models/doctor');
const Report = require('../../../models/report');
const Patient = require('../../../models/patient');

// create report
module.exports.createReport = async function(req,res){

    try{

        if(!Report.schema.path('status').enumValues.includes(req.body.status)){
            console.log("enum values are -->", Report.schema.path('status').enumValues);
            return res.json(400,{
                message:"check enum values"
            });
        }

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
            message:"congrats!!you have created the report",
            report:newReport   
        });
    }
    catch(err){
        return res.json(500, {
            message:"internal server error"
        });
    }
}

// get all the report of a particular patient using the id passed in the paramaters.
module.exports.all_reports = async function(req,res){
    //populate all the fields of the patient from the DB to use them later
    try{
        let patient = await Patient
                            .findOne({_id:req.params.id})
                            .sort('-createdAt')
                            .populate({
                                path:"reports",
                                populate:{
                                    path:"doctor"
                                },
                                populate:{
                                    path:"patient",
                                }
                            })
                            ;
        
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


// register a new patient only if doctor is logged in
module.exports.registerPatient = async function(req,res){
    // fill up all the details    

    try{
        if(!req.body.name||!req.body.phone){
            return res.json(400,{
                message:"Fill All the fields"
            })
        }
        // find if the patient already exists or not
        const patient = await Patient.findOne({phone:req.body.phone});
        // return all the details if patients exsists
        if(patient){
            return res.json(200, {patient:patient});
        }   

        //find the doctor who is logged in
        const doctor = await User.findById({_id:req.user._id});

        console.log("doctor is ", doctor);
        // register a new patient
        const newPatient = await Patient.create({
            name:req.body.name,
            phone:req.body.phone,
            doctor:doctor._id,
        });
        return res.json(200,{
            message:"Congrats!! you just created a patient",
            patient:newPatient
        });
    }
    catch(err){
        return res.json(500,{
            message:"Internal server Error"
        });
    }
}