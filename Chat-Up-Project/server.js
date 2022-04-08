const express = require("express");
const fs = require("fs");
const mysql = require("mysql");
let app = express();

// http://chat-up/
app.get("/", (res, req) => {
    res.sendFile(__dirname + "/index.html");  // Sending the index.html file
})

app.listen(6969, () => {
    console.log("Server running on port 6969");
})
