var express = require('express');
var mysql = require('mysql');
var connection = require('./connection');
var bodyParser = require('body-parser');
var app = express();
//set middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/students", function (request, response) {

     var sql = "Select * from students ";
     connection.con.query(sql, function (error, result) {

          if (error) {
               response.json([{ 'error': error.message }]);
          }
          else {

               // [{'param'}]
               var output = JSON.parse(JSON.stringify(result));
               let data = [
                    { 'error': 'no' },
                    { 'total': result.length },
                    { 'data': output }
               ];
               response.json(data);
          }
     });
});

app.get("/students/:id", function (request, response) {

     var id = request.params.id;
     var sql = `SELECT * from students where id = '${id}' `;
     connection.con.query(sql, function (error, result) {
          if (error) {
               response.json([{ 'error': error.message }]);
          }
          else {
               var output = JSON.parse(JSON.stringify(result));
               let data = [
                    { 'error': 'no' },
                    { 'total': result.length },
                    { 'data': output },
               ]
               response.json(data);
          }
     });
});
//used to insert new student
app.post("/students", function (request, response) {
     //add new student
     let name = request.body.name;
     let age = request.body.age;
     let gender = request.body.gender;
     let dob = request.body.dob;
     let address = request.body.address;
     let mobile = request.body.mobile;

     if (name === undefined || age === undefined || gender === undefined || dob === undefined || address === undefined || mobile === undefined) {
          response.json([{ 'error': 'input is missing' }]);
     }
     else {
          let sql = `insert into students (name,age,gender,dob,address,mobile) values ('${name}','${age}','${gender}','${dob}','${address}','${mobile}')`;

          connection.con.query(sql, function (error, result) {
               if (error != null)
                    response.json([{ 'error': error.message }]);
               else
                    response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'student added successfully' }]);
          });
     }
});

app.put("/students", function (request, response) {
     let name = request.body.name;
     let age = request.body.age;
     let gender = request.body.gender;
     let dob = request.body.dob;
     let address = request.body.address;
     let mobile = request.body.mobile;
     let studentid = request.body.studentid;

     if (studentid === undefined || name === undefined || age === undefined || gender === undefined || dob === undefined || address === undefined || mobile === undefined) {
          response.json([{ 'error': 'input is missing' }]);
     }
     else {
          let sql = `update students set name='${name}',age='${age}',gender='${gender}',dob='${dob}',address='${address}',mobile='${mobile}' where id=${studentid}`;
          connection.con.query(sql, function (error, result) {
               if (error != null)
                    response.json([{ 'error': error.message }]);
               else
                    response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'student updated successfully' }]);
          });
     }
});
app.delete("/students",function(request,response){
     let studentid = request.body.studentid;
     if (studentid === undefined)
          response.json([{ 'error': 'input is missing' }]);
     else 
     {
          let sql = `delete from students where id=${studentid}`;
          connection.con.query(sql, function (error, result) {
               if (error != null)
                    response.json([{ 'error': error.message }]);
               else
                    response.json([{ 'error': 'no' }, { 'success': 'yes' }, { 'message': 'student deleted successfully' }]);
          });
     }
});

app.all("*", function (request, response) {
     let data = [{ 'error': 'no such api defined' }]; //array of object
     // let data = JSON.stringify(output); //convert array of object into json strinfy object
     response.json(data);
})


app.listen(5000);
console.log("Server ready ");