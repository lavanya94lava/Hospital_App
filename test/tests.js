const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.should();

chai.use(chaiHttp);

describe('POST /patients/register',()=>{
    it("to check if it returns the newly created patient or not", (done)=>{

        const newPatient = {
            name: 'Ajay',
            phone:'9000000000'
        };
        chai.request(app)
            .post('/doctors/login')
            .send({
                email:"singhlavanya94@gmail.com",
                password:"abc"
            })            
            .end((err,res)=>{
                console.log("res message", res.body.message);
                res.should.have.status(200);
                res.body.should.have.property("token");
                res.body.should.have.property("message"); 

                let token = res.body.token;
                
                chai.request(app)
                .post("/patients/register_patient")
                .set('content-type', 'application/x-www-form-urlencoded')
                .set("Authorization","Bearer"+token)
                .send(newPatient)
                .end((err,res)=>{
                    if(err){
                        done(err);
                        console.log("error is -->",err);
                    }
                    // console.log("hoi--->",res)
                    console.log("this is test",res.body.message);
                    res.should.have.status(200);
                    res.body.patient.should.have.property('name');
                    res.body.patient.should.have.property('phone');
                    done();
                });
            });
    });
});



describe('POST /:id/create_report', ()=>{
    it("it should check whether it returns the newly created report", (done)=>{
        const newReport = {
            doctor: "5eb6eb1801a15e1b558f217c",
            patient:'5eb6edbca57e301e27104a52',
            status:'Positive-Admit'
        }
        chai.request(app)
        .post('/doctors/login')
        .send({
            email:"singhlavanya94@gmail.com",
            password:"abc"
        })            
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property("token");
            res.body.should.have.property("message"); 
            
            let token = res.body.token;
            chai.request(app)
                .post(`/patients/${newReport.patient}/create_report`)
                .set('Authorization',"Bearer"+token)
                .send(newReport)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.report.should.have.property('status');
                    res.body.report.should.have.property('doctor');
                    res.body.report.should.have.property('patient');
                    done();
                });
            });
    });
});


describe("/GET all_reports",()=>{
    it("it should get all reports of a particular patient",(done)=>{
        let id = "5eb6edbca57e301e27104a52";
        chai.request(app)
            .get(`/patients/${id}/all_reports`)
            .end((err,res)=>{
                if(err){
                    done(err);
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});