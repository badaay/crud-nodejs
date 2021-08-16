// controller.js
// Logic behind the functionalities
const data = require("./data");
const Contact = require('./contacts');

class Controller {
    // getting all contacts
    async getContacts() {
        return new Promise((resolve, _) => {
            Contact.get(function (err, results) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                
                resolve(results);
            });
        });
    }

    // getting a single contact
    async getContact(id) {
        return new Promise((resolve, reject) => {
            // get the contact
            let contact = Contact.find({email: id});
            if (contact) {
                // return the contact
                resolve(contact);
            } else {
                // return an error
                reject(`Contact with email ${id} not found `);
            }
        });
    }

    // creating a Contact
    async createContact(contact) {
        return new Promise((resolve, _) => {
            var model = new Contact(contact);

            Contact.findOne({ email: contact.email }, function (err, result) {
                if (err) resolve(err);

                if (result) resolve({ message: `name "${contact.email}" already use`, data: null });

                    model.save(function (err) {
                        if (err) resolve(err);
                        
                        resolve({
                            message: "Create Contact Success",
                            data: model
                        });
                    });
            });

        });
    }

    // updating a contact
    async updateContact(id, contact) {
        return new Promise((resolve, reject) => {
            var Model = new Contact();

            const query = { email: id };
            Contact.findOne(query, function (err, result) {
                if (err) resolve(err);

                if (!result) resolve({ message: `email "${id}" doesnt exist`, data: null });

                console.log(result);

                Model.replaceOne(query, {name: contact.name} ,function (err, result) {
                    if (err) resolve(err);

                    resolve(result);
                });
            });
        });
    }

    // deleting a todo
    async deleteContact(id) {
        return new Promise((resolve, reject) => {

            // console.log({ email: id });
            new Contact().deleteOne({ email: id });
        });
    }
}
module.exports = Controller;