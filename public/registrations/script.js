let regs = [];
let searchText = []
fetch("https://codeplant-backend.glitch.me/registers").then(function(
  allRegistrations
) {
  allRegistrations.json().then(function(all) {
    regs = all;
    regs.forEach(function(eachOne) {
      document.querySelector(
        "#registrations"
      ).innerHTML += `${getTableRow(
        eachOne
      )}`;
    });
  });
});

function getTableRow(row) {
  searchText.push(`${row.childsname}${row.childsage}${row.parentname}${row.parentemail}${row.childsemail}${row.codinglevel}${row.timeslot}${row.machine}${row.paid_registration_fee}`)
  return `<tr><td>${row.childsname}</td><td>${row.childsage}</td><td>${row.parentname}</td><td>${row.parentemail}</td><td>${row.childsemail}</td><td>${row.codinglevel}</td><td>${row.machine}</td><td>${row.paid_registration_fee}</td></tr>`
}

document.getElementById("filter").addEventListener("keyup", (e)=>{
  console.log(e.target.value);
  console.log(searchText.indexOf(e.target.value))
  if(searchText.indexOf(e.target.value) === -1){
    document.querySelector(
        "#registrations"
      ).innerHTML = '';
    
    regs.forEach(function(eachOne) {
      document.querySelector(
        "#registrations"
      ).innerHTML += `${getTableRow(
        eachOne
      )}`;
    });
  } else {
    
  }
  
})


