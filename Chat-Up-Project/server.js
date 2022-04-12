const express = require("express");
const mysql = require("mysql");
const socketIo = require("socket.io");
const http = require("http");

let app = express();
let server = http.createServer(app);
let io = socketIo(server);

app.use(express.json());

app.use(express.static(__dirname + "/public"));

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
    res.sendFile(__dirname + "/index.html"); 
});

app.get("/index.css", (req, res) => {
    res.sendFile(__dirname + "/index.css");
});

app.get("/sign-in.css", (req, res) => {
    res.sendFile(__dirname + "/sign-in.css");
})

app.get("/sign-up.css", (req, res) => {
    res.sendFile(__dirname + "/sign-up.css");
})

app.get("/password-img.png", (req, res) => {
    res.sendFile(__dirname + "/password-img.png");
})

app.get("/user-img.png", (req, res) => {
    res.sendFile(__dirname + "/user-img.png");
})

app.get("/email-img.png", (req, res) => {
    res.sendFile(__dirname + "/email-img.png");
})

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

app.get("/chat.html", (req, res) => {
    res.sendFile(__dirname + "/chat.html");
});

app.get("/chat.css", (req, res) => {
    res.sendFile(__dirname + "/chat.css");
});

app.get("/chat.js", (req, res) => {
    res.sendFile(__dirname + "/chat.js");
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
                res.send("/chat.html");
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
            
            res.send("/chat.html");
        })
    }
});

io.on("connection", (socket) => {
    console.log("Socket connected");

    socket.on("message", (data)=> {
        console.log("data:" + data + "broadcasted");
        socket.broadcast.emit("message", data);
    });
});

server.listen(6969, () => {
    console.log("Server running on port 6969");
});
