getUserData();

function getUserData(){
let userID = localStorage.getItem('userID')
console.log("user ID: ", userID)

firebase.firestore().collection('users').doc(userID).get()
.then(function (snapshot){
  console.log("Snapshot: ", snapshot.data())
  let userData = snapshot.data();
  document.getElementById("email").innerText = userData.email;
  document.getElementById("fullname").innerText = userData.fullname;
  document.getElementById("age").innerText = userData.age;

})

.catch(function(error){
  console.log("Error", error.message)
})
}

