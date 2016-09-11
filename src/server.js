var mysql      = require('mysql');

// host should be localhost for local development env
// use nginx port mapping later.
var connection = mysql.createConnection({
  host     : 'mysql',
  user     : 'root',
  password : 'my-secret-pw',
  database : 'my_resume'
});

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/companies', function (req, res) {
   console.log("Got a GET request for the list of companies");
   connection.query('SELECT * FROM companies1', function(err, rows, fields) {
       if (err) {
         console.log(err);
       }
       res.json(rows);
   });
});

app.post('/api/generate/table', function (req, res) {
    console.log("Got a POST request to insert a company info");
    var table = "companies1";
    var name = "name";
    var city = "city";
    var state = "state";
    var info = "info";
    var start_date = "start_date";
    var end_date = "end_date";
    var query = 'CREATE TABLE ' + table + '(' + name + ' VARCHAR(30)' + ','
        + city + ' VARCHAR(20)' + ',' + state + ' VARCHAR(5)'+ ',' + info + ' VARCHAR(50)' + ','
        + start_date + ' VARCHAR(15)' + ',' + end_date + ' VARCHAR(15)' + ')';

    connection.query(query, function(err, rows, fields) {
        if (err) {
            console.log(err);
        }
        res.send("table created");
    });

});

app.post("/api/insert", function(req,res){
    var query = "INSERT INTO companies1(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
    var tables = [ "name","city","state","info","start_date","end_date", req.body.name, req.body.city, req.body.state, req.body.info, req.body.start_date, req.body.end_date ];
    query = mysql.format(query, tables);

    connection.query(query,function(err){
        if(err) {
            console.log(err);
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "User Added !"});
        }
    });
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
