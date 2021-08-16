const http = require('http');

const Contact = require("./controller");
const { getReqData } = require("./utils");

const server = http.createServer(async (req, res) => {
    //set the request route
    if (req.url === "/api" && req.method === "GET") {
        //response headers
        res.writeHead(200, { "Content-Type": "application/json" });
        //set the response
        res.write("Hi there, This is a Vanilla Node.js API");
        //end the response
        res.end();
    }

    if (req.url === "/api/contacts" && req.method === "GET") {
        // get the contacts.
        const contacts = await new Contact().getContacts();
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(contacts));
    }

    // /api/contacts/:id : GET
    else if (req.url.match(/\/api\/contacts\/([a-zA-Z]+)/) && req.method === "GET") {
        try {
            // get id from url
            const id = req.url.split("/")[3];
            // get contact
            const contact = await new Contact().getContact(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(contact));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/contacts/:id : DELETE
    else if (req.url.match(/\/api\/contacts\/([a-zA-Z]+)/) && req.method === "DELETE") {
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete contact
            let message = await new Contact().deleteContact(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message }));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/contacts/:id : UPDATE
    else if (req.url.match(/\/api\/contacts\/([a-zA-Z]+)/) && req.method === "PATCH") {
        try {
            // get the id from the url
            const id = req.url.split("/")[3];
            // get the data sent along
            let contact_data = await getReqData(req);
            // update contact
            let updated_contact = await new Contact().updateContact(id, contact_data);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify(updated_contact));
        } catch (error) {
            // set the status code and content type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/contacts/ : POST
    else if (req.url === "/api/contacts" && req.method === "POST") {
        // get the data sent along
        let contact_data = await getReqData(req);
        // create the contact
        let contact = await new Contact().createContact(JSON.parse(contact_data));
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the contact
        res.end(JSON.stringify(contact));
    }
        
    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

module.exports = server;
