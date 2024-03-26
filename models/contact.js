const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        first_name: String,
        second_name: String,
        fathers_name: String,
        citizenship: String,
        age: Number,
        email: String
    }
);
module.exports = mongoose.model("Contact", ContactSchema);