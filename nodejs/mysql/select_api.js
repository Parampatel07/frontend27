var express = require('express');
var mysql = require('mysql');
var connection = require('./connection');
var app = express();

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
app.post("/students",function(request,response){
     //add new student
     let sql = `insert into students (name,age,gender,dob,address,mobile) values ('ram','25','1','2000-12-25','hill drive, bhavnagar','1234567890')`;

     connection.con.query(sql,function(error,result){
          if(error!=null)
               response.json([{ 'error': error.message }]);
          else 
               response.json([{ 'error': 'no'},{'success':'yes'},{'message':'student added successfully'}]);
     });
});

app.all("*",function(request,response){
     let data = [{'error':'no such api defined'}]; //array of object
     // let data = JSON.stringify(output); //convert array of object into json strinfy object
     response.json(data);
})


app.listen(5000);
console.log("Server ready ");