getUserData();

function getUserData(){
let userID = localStorage.getItem('userID')
// console.log("user ID: ", userID)

firebase.firestore().collection('users').doc(userID).get()
.then(function (snapshot){
  // console.log("Snapshot: ", snapshot.data())
  let userData = snapshot.data();
  document.getElementById("name").innerText = userData.fullname;

  document.getElementById("email").innerText = userData.email;
  document.getElementById("fullname").innerText = userData.fullname;
  document.getElementById("age").innerText = userData.age;
})
.catch(function(error){
  console.log("Error", error.message)
})
}
// --------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", filterData)

function filterData() {
let userID = localStorage.getItem("userID");

var totalIncome = 0;
var totalExpense = 0;
var remaining = 0;

firebase.firestore().collection("transactions")
    .where("userID", "==", userID)
    .get()
    .then(function(snaps){
      // console.log("snaps", snaps)
        snaps.forEach(function(doc){
            // console.log("doc.data(): ", doc.data())
            const data = doc.data()

          let amount = parseInt(data.amount);
          // console.log("amount", amount)


          if(amount > 0 ){
            totalIncome+= amount;
          }
          else {
            totalExpense+= amount;
          }
         remaining = totalIncome + totalExpense;

          // console.log("Total Income: ", totalIncome)
          // console.log("Total Expense: ", totalExpense)     
        document.getElementById("totalIncome").innerText = totalIncome;
        document.getElementById("totalExpense").innerText = totalExpense;
        document.getElementById("remaining").innerText = remaining;     
          })
        })
       
        

          }

function logout(){
  location.replace("index.html")
  localStorage.clear();
}