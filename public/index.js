// console.log("Firestore",firebase.firestore)
// console.log("Auth",firebase.auth)


function signup() {
   let email=document.getElementById("email").value;
   let password=document.getElementById("password").value;
   let fullname=document.getElementById("fullname").value;
   let age=document.getElementById("age").value;

    console.log("id:", email)
    console.log("password:", password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response){
        console.log("Newly created User", response)
        const userID = response.user.uid;

        /*
            1) .add({}) (generates unique ID for the document)
            2) .doc(<id>).set({}) (you tell the ID to firebase)
        */
            
        // firebase.firestore().collection('users').add({
        firebase.firestore().collection('users').doc(userID).set({
            fullname,
            age,
            email,
        })
        // location.href = "./index.html"
        
    }).then(function(){
        alert("Successfully signed Up")        
    }).catch(function(){
        alert("Sign Up Failed")        

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
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
     console.log("emial", email)
     console.log("password", password)

     firebase.auth().signInWithEmailAndPassword(email, password)
     .then(function(responseFromApi){
        //  alert("Successfully logged in");
         console.log("Response: ", responseFromApi);
         let userID = responseFromApi.user.uid;
         localStorage.setItem("userID", userID)
         location.replace("./transactions.html")
     }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log("Error: ", errorMessage)
        alert(errorMessage)

      });
      
}

