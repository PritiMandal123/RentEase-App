document.getElementById("logoutButton").addEventListener("click", function() {
    firebase.auth().signOut()
        .then(function() {
            
            window.location.href = "index.html";
        })
        .catch(function(error) {
            
            alert("Logout failed. " + error.message);
        });
});
