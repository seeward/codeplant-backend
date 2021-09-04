fetch("https://codeplant-backend.glitch.me/logs").then(function(allLogs) {
  allLogs.json().then(function(all) {
    all.forEach(function(eachOne) {
      document.querySelector("#logs").innerHTML += `${getTableRow(eachOne)}`;
    });
  });
});

function getTableRow(r) {
  let text = "";
  if (typeof r.log === "object") {
    text = r.log.score;
  }

  return `<tr style='width: 100%'><td><h1>${r.user}</h1></td><td><h4>${
    r.type
  }</h4></td>${r.log.msg ? `<td>${r.log.msg}</td>` : ""}${
    text ? `<td>${text}</td>` : ""
  }<td>${new Date(r.createdAt).toLocaleString("en-US")}</td></tr>`;
}
