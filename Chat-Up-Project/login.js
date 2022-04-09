function signIn() {
    // Getting the username and password from the input elements
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Creating an HTTP request using JSON
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:6969/auth";

    xhr.open("POST", url, true);
    
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        // Checking if the login was successful
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.replace(xhr.responseText);
        } else if (xhr.readyState == 4 && xhr.status == 401) {
            document.write(xhr.responseText);
        }
    };
    let data = JSON.stringify({"username": username, "password": password});
    xhr.send(data);
}

function signUp() {
        // Getting the username, password and Email from the input elements
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;
    
        // Creating an HTTP request using JSON
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:6969/add";
    
        xhr.open("POST", url, true);
    
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.location.replace(xhr.responseText);
            } else {
                document.write(xhr.responseText);
            }
        };
        let data = JSON.stringify({"username": username, "password": password, "email": email});
        xhr.send(data);
}
