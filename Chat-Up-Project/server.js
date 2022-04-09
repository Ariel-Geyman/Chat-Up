const express = require("express");
const sessions = require("express-session")
const mysql = require("mysql");

let app = express();

app.use(express.json());

app.use(sessions({
    secret: "chatupsecret",
    saveUninitialized: true,
    resave: true
}));

// Connecting to the MySQL server
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "chat-up-db",
    port: 3306
});

conn.connect((err) => {
    if(err){
        throw err;
    }

    console.log("Database connected");
});

// http://chat-up/
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");  // Sending the index.html file
});

// http://chat-up/login.js
app.get("/login.js", (req, res) => {
    res.sendFile(__dirname + "/login.js");
});

// http://chat-up/sign-in.html
app.get("/sign-in.html", (req, res) => {
    res.sendFile(__dirname + "/sign-in.html");
});

app.get("/sign-up.html", (req, res) => {
    res.sendFile(__dirname + "/sign-up.html");
});

// http://chat-up/auth
app.post("/auth", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // Checking if the username and password are not empty
    if(username && password) {
        let sql_query = "SELECT * FROM accounts WHERE username LIKE ? AND password LIKE ?;";

        conn.query(sql_query, [username, password], (err, results) => {
            if(err) {
                throw err;
            }
            
            // If there were any results, then the username and the password are correct
            if(results.length > 0){
                req.session.cookie.loggedIn = true;
                req.session.cookie.username = username;

                res.send("/");
            } else {
                res.status(401).send("Invalid username or password");
            }
        });
    }
});

// http://chat-up/add
app.post("/add", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    // Checking if the username, the password and the Email aren't empty
    if(username && password && email) {
        let sql_query = "INSERT INTO accounts (username, password, email) VALUES(?, ?, ?);";

        conn.query(sql_query, [username, password, email], (err) => {
            if(err) {
                throw err;
            }
            
            req.session.cookie.loggedIn = true;
            req.session.cookie.username = username;

            res.send("/");
        })
    }
});

app.listen(6969, () => {
    console.log("Server running on port 6969");
});
