[
  {name:"Registrations", url: "/regis"}, 
 
 {name:"Messages", url: "/mess"},
  {name:"Add Stream", url: "/archive"},
   {name:"Add Exercise", url: "/exercises"},
   {name:"Go Live", url: "/livemonitor"},
   {name:"Current Stream Info", url: "/livestatus"},
  {name:"Log Viewer", url: "/logviewer"},
  {name:"Users", url: "/users"},

].forEach(function(eachOne) {
  document.querySelector(
    "#menu"
  ).innerHTML += `<br /><a class="btn" type="button" href="${eachOne.url}" style='border:1px solid black;padding: 15px;border-radius:15px'>${
    eachOne.name
  }</a>`;
});


