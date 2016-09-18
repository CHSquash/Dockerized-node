var mysql = require("mysql");
function REST_ROUTER(router,pool) {
    var self = this;
    self.handleRoutes(router,pool);
}

REST_ROUTER.prototype.handleRoutes = function(router,pool) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get('/api/companies', function (req, res) {
       console.log("Got a GET request for the list of companies");
       pool.getConnection(function(err, connection) {
         connection.query('SELECT * FROM companies1', function(err, rows, fields) {
           connection.release();
           if (err) {
             res.json({"Error" : true, "Message" : "Error executing MySQL query"});
             console.log(err);
           }else {
             res.json(rows);
           }
         });
       });
     });

    router.post('/api/generate/table', function (req, res) {
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


        pool.getConnection(function(err, connection) {
          connection.query(query, function(err, rows, fields) {
            connection.release();
            if (err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
              console.log(err);
            }else {
              res.send("table created");
            }
          });
        });

    });

    router.post("/api/insert", function(req,res){
        var query = "INSERT INTO companies1(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
        var tables = [ "name","city","state","info","start_date","end_date", req.body.name, req.body.city, req.body.state, req.body.info, req.body.start_date, req.body.end_date ];
        var query = mysql.format(query, tables);

        pool.getConnection(function(err, connection) {
          connection.query(query, function(err, rows, fields) {
            connection.release();
            if (err) {
              res.json({"Error" : true, "Message" : "Error executing MySQL query"});
              console.log(err);
            }else {
              res.json({"Error" : false, "Message" : "New Info Added !"});
            }
          });
        });

    });

}

module.exports = REST_ROUTER;
