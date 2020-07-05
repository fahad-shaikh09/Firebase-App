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
// ADD INCOME ON FIREBASE
document.getElementById("form").addEventListener("submit",addIncome)

function addIncome(e){
    e.preventDefault();
    console.log("addIncome is clicked")
    const userID = localStorage.getItem('userID');
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").valueAsDate;
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
        alert("Transaction is added in Firebase");
        clearForm();
        getTransactions();
    })
    .catch(function(error){
        alert("Transaction is failed with Error: ", error.message);
    })  
}

function clearForm(){
    document.getElementById("amount") = "";
    document.getElementById("date") = ""
    document.getElementById("description") = ""
    document.getElementById("category") = ""
}

 getTransactions();

function getTransactions() {
    const table = document.getElementById("transactionTable")

    firebase.firestore().collection("transactions").get()
    .then(function(snaps){
        snaps.forEach(function(doc){
            // console.log("doc.data(): ", doc.data())
            const data = doc.data()
            const row = document.createElement('tr')
            const amount = document.createElement('td')
            const description = document.createElement('td')
            const date = document.createElement('td')
            const category = document.createElement('td')

            amount.innerHTML = data.amount;
            description.innerHTML = data.description;
            date.innerHTML = data.date.toDate();
            category.innerHTML = data.category;

            row.appendChild(amount)
            row.appendChild(description)
            row.appendChild(date)
            row.appendChild(category);

            table.appendChild(row)

        })
    })
}

