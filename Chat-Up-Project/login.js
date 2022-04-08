function signIn() {
    // Getting the username and password from the input elements
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Creating an HTTP request using JSON
    let xhr = new XMLHttpRequest();
    let url = "locaclhost::6969/sign-in";

    xhr.open("POST", url, true);
    
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            console.log(json);
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
        let url = "locaclhost::6969/sign-up";
    
        xhr.open("POST", url, true);
    
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                console.log(json);
            }
        };
        let data = JSON.stringify({"username": username, "password": password, "email": email});
        xhr.send(data);
}
