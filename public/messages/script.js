fetch("https://codeplant-backend.glitch.me/allmess").then(function(
  allRegistrations
) {
  console.log("hello");
  allRegistrations.json().then(function(all) {
    all.forEach(function(eachOne) {
      document.querySelector(
        "#messages"
      ).innerHTML += `<br /><div style='border:1px solid black;padding: 15px;border-radius:15px'>${getTableRow(
        eachOne
      )}</div>`;
    });
  });
});

function getTableRow(row) {
  return `Name: <strong><a href="mailto:${row.email}">${row.name}</a></strong> <hr />Email: ${row.email} 
  <br />Message: ${row.message} <br />
`;
}
