// Import express 
const express = require("express");
const app = express();

const cors = require('cors');
const nodemailer = require('nodemailer');
app.use(cors());

// Initializing database
require("./db/db");

// Import body-parser
const bodyParser = require("body-parser");

// Import model
const Contact = require("./models/contact");

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'infa00004@gmail.com',
        pass: 'cbzbssuudauaevfp'
    }
});

app.post("/addContact", async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
});

app.post("/addContact1", async (req, res) => {
    console.log("addContact1");
    res.status(201).json({});
});

app.post("/app/sendEmail", async (req, res) => {
    console.log("Anything .");
    const { to, subject, text } = req.body;
    const mailOptions = { from: 'infa00004@gmail.com', to, subject, text };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.get("/getContacts", async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

app.patch("/updateContact/:id", async (req, res) => {
    try {
        const result = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: 'Contact with such ID not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.delete("/deleteContact/:id", async (req, res) => {
    try {
        const result = await Contact.findByIdAndDelete(req.params.id);
        if(result)
        {
            res.send({ message: 'Book is deleted.', deletedBook: result });
        } else {
            res.status(404).send({ message: 'Book with such ID not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("Server is running.");
});


