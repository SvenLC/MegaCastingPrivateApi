const http = require('http');
const port=process.env.PORT || 3000
var express = require('express');
var app = express();

app.get("/utilisateur",function(request,response)
{
    response.json({"Message":"Retourne les utilisateurs"});
});

app.route('/').get(function(req, res) { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>API MegaCasting</h1>'); 
}); 
 
app.listen(port, function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});