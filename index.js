console.log(firebase)

function signup() {
   let email=document.getElementById("email").value;
   let password=document.getElementById("password").value;
    console.log("id:", email)
    console.log("password:", password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        alert("Successfully signed Up")
        // location.href = "./index.html"

    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log("Error: ", errorMessage)
      });
}
///////////////////////////////////////////////////////////////////////////////////////////////

function signin() {
    let email=document.getElementById("email").value;
    let  password=document.getElementById("password").value;
     console.log("emial", email)
     console.log("password", password)
     firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
         console.log("Successfully loged in")
         location.href = "./dashboard.html"
     }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log("Error: ", errorMessage)
        alert(errorMessage)

      });
      

}