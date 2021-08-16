const http = require('http');
const { MongoClient } = require("mongodb");
// config for webserver
const hostname = '127.0.0.1';
const port = 3000;
const server = require('./routes.js'); // imports the routing file

// Replace the following with your MongoDB deployment's connection string.
// const uri =
//     `mongodb://localhost:27017/`;
// // Create a new MongoClient
// const client = new MongoClient(uri);


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

// // Function to connect to the server
// async function run() {
//     try {
//         // Connect the client to the server
//         await client.connect();
//         // Establish and verify connection
//         await client.db("resthub").command({
//             ping: 1
//         });
//         console.log("Connected successfully to server");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});