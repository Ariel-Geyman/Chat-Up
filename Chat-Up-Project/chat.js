import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://localhost:6969");

socket.on("connection", () => {
    console.log("client socket connected");
});

socket.on("message", (data) => {
    console.log("data: " + data + "was received");

    let chatContainer = document.getElementById("chat-room");
    let message = JSON.parse(data);

    chatContainer.insertAdjacentText("beforeend", message.username + ": " + message.msg);
    chatContainer.appendChild(document.createElement("br"));
});

 document.getElementById("send-msg-btn").addEventListener("click", () => {
        let msgInput = document.getElementById("msg");
        let msg = msgInput.value;
        msgInput.value = "";

        socket.emit("message", JSON.stringify({"username": sessionStorage.getItem("username"), "msg": msg}));

        document.getElementById("chat-room").insertAdjacentText("beforeend", sessionStorage.getItem("username") + ": " + msg);
        document.getElementById("chat-room").appendChild(document.createElement("br"));
});
