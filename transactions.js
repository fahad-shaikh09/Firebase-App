getUserData();

function getUserData(){
let userID = localStorage.getItem('userID')
console.log("user ID from Transactions page: ", userID)

firebase.firestore().collection('users').doc(userID).get()
.then(function(snapshot){
    let userData = snapshot.data();
    console.log("Snapshot: ", userData)
  document.getElementById("name").innerText = userData.fullname;
})
.catch(function(error){
  console.log("Error", error.message)
})
}

document.getElementById("form").addEventListener("submit",addIncome)

function addIncome(e){
    e.preventDefault();
    console.log("addIncome is clicked")
    const userID = localStorage.getItem('userID');
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    console.log("userID: ",  userID)
    console.log("Amount: ",  amount)
    console.log("Date: ",  date) 
    console.log("Desc: ",  description)
    console.log("Category: ",  category)

    firebase.firestore().collection("transactions").add({
        amount, date, description, category, userID,
    })
    .then(function(){
        alert("Transaction is added in Firebase")
        clearForm();
    })
    .catch(function(error){
        alert("Transaction is failed with Error: ", error.message)
    })  
}


function clearForm(){
    document.getElementById("amount") = "";
    document.getElementById("date") = ""
    document.getElementById("description") = ""
    document.getElementById("category") = ""
}