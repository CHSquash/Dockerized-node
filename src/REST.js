var mysql = require("mysql");
function REST_ROUTER(router,pool) {
    var self = this;
    self.handleRoutes(router,pool);
}

REST_ROUTER.prototype.handleRoutes = function(router,pool) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get('/api/:tableName', function (req, res) {
       console.log("Got a GET request for the list of companies");
       pool.getConnection(function(err, connection) {
         connection.query('SELECT * FROM ' + req.params.tableName, function(err, rows, fields) {
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
}

module.exports = REST_ROUTER;
