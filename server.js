const http = require('http');
const mongo = require("mongoose");
// config for webserver
const hostname = '127.0.0.1';
const port = 3000;
const server = require('./routes.js'); // imports the routing file


// Connect to Mongoose and set connection variable
mongo.connect('mongodb://localhost/resthub', {
    useNewUrlParser: true
});
var db = mongo.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});