document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
           
            window.location.href = "home.html";
        })
        .catch(function(error) {
        
            alert("Registration failed. " + error.message);
        });
});