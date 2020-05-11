# Hospital_API_Test

In this project, we make an API for a hospital which in which a doctor can login and after logging in, can add patient, add a patient's reports. get a patient's all reports and get all reports by a particular parameter of a patient. Later we test all the routes and fucntionalities using postman and also unit testing using chai and mocha.



# Software Requirements

1. Node.js 8 or above
2. Mongo 4+
3. Postman

# Dependencies Used
1. Express
2. chai
3. mocha
4. passport-jwt
5. passport
6. jsonwebtoken
7. body-parser

#setup

>      git clone https://github.com/lavanya94lava/Hospital_App.git
>      cd Hospital_App
>      run nodemon index.js

for tests

>      npm run test


# routes
1. Doctor register `http://localhost:8000/doctors/register`
2. Doctor Login `http://localhost:8000/doctors/login`
3. Register Patient `http://localhost:8000/patients/register_patient`
4. Create report of a patient `http://localhost:8000/patients/:id/create_report`
5. Get report by status `http://localhost:8000/reports/:status`

# How Application Works

1. First user(doctor) will register himself/herself using username and password.
2. Doctor will login using credentials and would send a json web token in response.
3. Doctor can register a patient if he is logged in, for that he needs to verfiy himself, i.e. passport-jwt-startegy would be used before calling the route.
4. Once verified,a new patient is created in MongoDb, patient and Doctor have models.
5. Once verified a doctor can also create a patient's report.
6. All reports can be viewed using the status of the patient.

