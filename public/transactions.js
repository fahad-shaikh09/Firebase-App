getUserData();

function getUserData(){
let userID = localStorage.getItem('userID')
// console.log("user ID from Transactions page: ", userID)

firebase.firestore().collection('users').doc(userID).get()
.then(function(snapshot){
    let userData = snapshot.data();
    // console.log("Snapshot: ", userData)
  document.getElementById("name").innerText = userData.fullname;
})
.catch(function(error){
  console.log("Error", error.message)
})
}

// ADD INCOME OR EXPENSE IN FIREBASE
document.getElementById("form").addEventListener("submit",addIncome)

function addIncome(e){
    e.preventDefault();
    const userID = localStorage.getItem('userID');
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").valueAsDate;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const file = document.getElementById("file").files[0]
    const storageRef = firebase.storage().ref(`expense ${new Date}`);
    storageRef.put(file).then(function(response){
        console.log("response: ", response)
        response.ref.getDownloadURL().then(function(url){
            console.log("URL: ", url)
            firebase.firestore().collection("transactions").add({
            amount, date, description, category, userID, url: url
    })
    .then(function(){
        alert("Transaction is added in Firebase");
        clearForm();
        displayTransactions();
    })
        })

    }).catch(function(error){
        console.log("error: ", error.message)
    })


    console.log("userID: ",  userID)
    console.log("Amount: ",  amount)
    console.log("Date: ",  date) 
    console.log("Desc: ",  description)
    console.log("Category: ",  category)
    console.log("File: ", file)

    


    // .catch(function(error){
    //     alert("Transaction is failed with Error: ", error.message);
    // })  
}

function clearForm(){
    document.getElementById("amount") = "";
    document.getElementById("date") = ""
    document.getElementById("description") = ""
    document.getElementById("category") = ""
}

 displayTransactions();

function displayTransactions() {
    let userID = localStorage.getItem('userID')
    
    const tableBody = document.getElementById("tbody")         

    firebase.firestore().collection("transactions")
    .where("userID", "==", userID)
    .get()
    .then(function(snaps){
        snaps.forEach(function(doc){
            console.log("doc.data(): ", doc.data())
            const data = doc.data()
            const row = document.createElement('tr')

            const amount = document.createElement('td')
            const description = document.createElement('td')
            const date = document.createElement('td')
            const category = document.createElement('td')
            const image = document.createElement('td')

            amount.innerHTML = data.amount;
            description.innerHTML = data.description;
            date.innerHTML = data.date.toDate();
            category.innerHTML = data.category;
            image.innerHTML = `<img src="${data.url}" width="100"/>`

            row.appendChild(amount)
            row.appendChild(description)
            row.appendChild(date)
            row.appendChild(category);
            row.appendChild(image);

            tableBody.appendChild(row)


        })
    })
}

function filterTransactions(){
    console.log("Filter Transactions is clicked")
    const initialTable = document.getElementById("tbody")
    initialTable.innerHTML = ""

    let userID = localStorage.getItem("userID")

    const type = document.getElementById("showIncomeExpense").value;
    console.log("Type: ", type)

    if(type == "all"){
        return displayTransactions();
    }

    firebase.firestore().collection("transactions")
    .where("category", "==", type)
    .where("userID", "==", userID)
    .get()
    .then(function(snaps){
        snaps.forEach(function(doc){
            // console.log("doc.data(): ", doc.data())
            const data = doc.data()
            const row = document.createElement('tr')

            const amount = document.createElement('td')
            const description = document.createElement('td')
            const date = document.createElement('td')
            const category = document.createElement('td')
            const image = document.createElement('td')

            amount.innerHTML = data.amount;
            description.innerHTML = data.description;
            date.innerHTML = data.date.toDate();
            category.innerHTML = data.category;
            image.innerHTML = `<img src="${data.url}" width="100"/>`

            row.appendChild(amount)
            row.appendChild(description)
            row.appendChild(date)
            row.appendChild(category);
            row.appendChild(image);

            initialTable.appendChild(row)

        })
    })
}


function logout(){
    location.replace("./index.html")
    localStorage.clear();
}