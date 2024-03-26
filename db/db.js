const mongoose = require("mongoose");

const dburl = "mongodb://localhost:27017/contactDB"
mongoose.connect(dburl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Failed to connect to database using " + dburl + " url for connection." ));
db.once('open', function() {
    console.log("Connected to the database.");
});
