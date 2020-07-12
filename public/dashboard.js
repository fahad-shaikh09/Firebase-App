getUserData();

function getUserData() {
  let userID = localStorage.getItem('userID')
  console.log("user ID: ", userID)

  firebase.firestore().collection('users').doc(userID).get()
    .then(function (snapshot) {
      console.log("Snapshot: ", snapshot.data())
      let userData = snapshot.data();
      // document.getElementById("name").innerText = userData.fullname;
      // document.getElementById("email").innerText = userData.email;
      // document.getElementById("fullname").innerText = userData.fullname;
      // document.getElementById("age").innerText = userData.age;
    })
    .catch(function (error) {
      console.log("Error: ", error)
    })
}
// --------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", filterData)

function filterData() {
  let userID = localStorage.getItem("userID");

  var totalIncome = 0;
  var totalExpense = 0;
  var remaining = 0;

  var incomeArray = []
  var expenseArray = []

  firebase.firestore().collection("transactions")
    .where("userID", "==", userID)
    .get()
    .then(function (snaps) {
      // console.log("snaps", snaps)
      snaps.forEach(function (doc) {
        // console.log("doc.data(): ", doc.data())
        const data = doc.data()

        let amount = parseInt(data.amount);
        console.log("amount", amount)


        if (amount > 0) {
          totalIncome += amount;
          incomeArray.push(amount)
          // console.log("Income Array: ", incomeArray)
          var incomeChart = document.getElementById('incomeChart').getContext('2d');
          var myChart = new Chart(incomeChart, {
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'Income',
                // data: [2000, 4000, 600, 8000, 100, 1200, 400, 1600, 800, 200, 2200, 400 ],
                data: incomeArray,
                backgroundColor: [
                  'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green',
                ],
                // borderColor: [
                //   'black','black','black','black','black','black','black','black','black','black','black','black',
                // ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });

        }
        else {
          totalExpense += amount;
          expenseArray.push(amount)
          // console.log("Expense Array: ", expenseArray)
          var expenseChart = document.getElementById('expenseChart').getContext('2d');
          var myChart = new Chart(expenseChart, {
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'Expense',
                // data: [200, 4000, 600, 600, 1000, 1200, 400, 1600, 800, 200, 2200, 400 ],
                data: expenseArray,
                backgroundColor: [
                  'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
                ],
                // borderColor: [
                //   'black','black','black','black','black','black','black','black','black','black','black','black',
                // ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
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

function logout() {
  location.replace("index.html")
  localStorage.clear();
}



/////////////////////CHART JS//////////////////////////////////////////////////////////
// --------------INCOME-------------------------

// var incomeChart = document.getElementById('incomeChart').getContext('2d');
// var myChart = new Chart(incomeChart, {
//     type: 'bar',
//     data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         datasets: [{
//             label: 'Income',
//             data: [2000, 4000, 600, 8000, 100, 1200, 400, 1600, 800, 200, 2200, 400 ],
//             backgroundColor: [
//                 'green','green','green','green','green','green','green','green','green','green','green','green',
//             ],
//             // borderColor: [
//             //   'black','black','black','black','black','black','black','black','black','black','black','black',
//             // ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });


// --------------EXPENSE-------------------------

// var expenseChart = document.getElementById('expenseChart').getContext('2d');
// var myChart = new Chart(expenseChart, {
//     type: 'bar',
//     data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         datasets: [{
//             label: 'Expense',
//             data: [200, 4000, 600, 600, 1000, 1200, 400, 1600, 800, 200, 2200, 400 ],
//             backgroundColor: [
//                 'red','red','red','red','red','red','red','red','red','red','red','red',
//             ],
//             // borderColor: [
//             //   'black','black','black','black','black','black','black','black','black','black','black','black',
//             // ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });



