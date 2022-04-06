function signIn() {
    // Getting the username and password from the input elements
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Creating an HTTP request using JSON
    let xhr = new XMLHttpRequest();
    let url = "locaclhost::6969?data=" + encodeURIComponent(JSON.stringify({"username": username, "password": password}));

    xhr.open("GET", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };

    xhr.send();
}
