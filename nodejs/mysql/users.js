var express = require('express');
var connection = require('./connection');
var bodyParser = require('body-parser');
var app = express();
const ROUTENAME = "/users";
//set middleware
app.use(bodyParser.urlencoded({ extended: false }));
//arrow function 
let getErrMsg = () => [{ 'error': 'error occured' }];
let getInputMsg = () => [{ 'error': 'input is missing' }];
//create route 
//used to create new user 
// input (email,mobile,password) required 
//output 
app.post(ROUTENAME, function (request, response) {
    let email = request.body.email;
    let password = request.body.password;
    let mobile = request.body.mobile;
    if (email === undefined || password === undefined || mobile === undefined) {
        response.json(getInputMsg());
    }
    else {
        let sql = `INSERT INTO users(email,password,mobile) VALUES ('${email}','${password}','${mobile}')`;
        connection.con.query(sql, function (error, result) {
            if (error)
                response.json(getErrMsg());
            else {
                response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'student added successfully' }]);
            }
        });
    }

});
app.listen(5000);
console.log('ready to accept request....');