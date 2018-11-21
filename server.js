var express = require('express');
var app = express();
var port = process.env.port || 1337;
 
app.get("/product",function(request,response)
{
    response.json({"Message":"Welcome to Node js"});
});
 
app.listen(port, function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});

var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user: 'adminmegacasting',
        password: 't4tX38CwrHQJbDWkl2qr',
        server: 'megacasting.database.windows.net',
        database: 'MEGACASTING',
        options: {encrypt: true}
    });
 
    return conn;
};

module.exports = connect;