document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
    
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
    
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(userCredential) {
                
                var user = userCredential.user;
                window.location.href = "home.html";
               
            })
            .catch(function(error) {
                
                console.error("Login failed. Error:", error);
                alert("Login failed. Please check your email and password.");
               
            });
    });

