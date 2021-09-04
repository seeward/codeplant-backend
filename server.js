const express = require("express");
const cors = require('cors');
const app = express();
const _db_controller = require("./controllers/db_controller.js");
const fetch = require("fetch").fetchUrl;
const bodyParser = require("body-parser");

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true, limit: "50mb"}));
app.use(express.static("public"));
app.use(cors());

// routes
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/public/home/index.html");
});

// admin pages
app.get("/regis", async (request, response) => {
    
  response.sendFile(__dirname + "/public/registrations/index.html");

});
app.get("/mess", async (request, response) => {
  response.sendFile(__dirname + "/public/messages/index.html");
});

// api - fetch data
app.get("/registers", async (request, response) => {
  response.send(await _db_controller.fetchAllRegistrations());
});
app.get("/allmess", async (request, response) => {
  response.send(await _db_controller.fetchAllMessages());
});
app.get("/allcode", async (request, response) => {
  response.send(await _db_controller.fetchAllCode());
});

app.post("/addcode", async(request,response) => {
  console.log(request.body.password)
  if(request.body.password === 'jesus'){
    delete request.body.password
    response.send(await _db_controller.code(request.body))
  } else {
    response.send({error: "WRONG PASSWORD"})
  }
  
});



app.get("/questions", async (request, response) => {
  response.send(await _db_controller.fetchAllQuestions());
});

app.post("/addquestion", async(request,response) => {
  console.log(request.body.password)
  if(request.body.password === 'jesus'){
    delete request.body.password
    response.send(await _db_controller.question(request.body))
  } else {
    response.send({error: "WRONG PASSWORD"})
  }
  
});




app.post("/addlog", async(request,response) => {
  console.log(request.body.password)
  if(request.body.password === 'jesus'){
    delete request.body.password
    response.send(await _db_controller.log(request.body))
  } else {
    response.send({error: "WRONG PASSWORD"})
  }
  
});

app.get("/logs", async (request, response) => {
  let query = {};
  if(request.query.from){
    query.from = request.query.from;
  }
  if(request.query.to){
    query.to = request.query.to
  }
  if(request.query.type){
    query.type = request.query.type
  }
  response.send(await _db_controller.fetchAllLogs({}));
});

app.get("/errors", async (request, response) => {
  let query = {};
  if(request.query.from){
    query.from = request.query.from;
  }
  if(request.query.to){
    query.to = request.query.to
  }
  if(request.query.type){
    query.type = request.query.type
  }
  response.send(await _db_controller.fetchErrorLogs({}));
});
app.get("/archives", async (request, response) => {
  response.send(await _db_controller.fetchAllArchiveStreams());
});

app.get("/allusers", async (request, response) => {
  response.send(await _db_controller.fetchAllUsers());
});

app.post("/user", async (request, response) => {
  
  let id = request.body.id;
  response.send(await _db_controller.fetchUser(id));
  
});

app.post("/addbadgetouser", async (request, response) => {
  
  let id = request.body.id;
  let badge = request.body.badge;
  // console.log(id,badge)
  if(request.body.badge.password === 'jesus'){
    response.send(await _db_controller.addBadgeToUser(id, badge));
  } else {
    response.send({error: "WRONG PASSWORD"})
  }
        
});


app.get("/allexercises", async (request, response) => {
  response.send(await _db_controller.fetchAllArchiveExercises());
});

app.post("/addStream", async(request,response) => {
  console.log(request.body.password)
  if(request.body.password === 'jesus'){
    delete request.body.password
    response.send(await _db_controller.stream(request.body))
  } else {
    response.send({error: "WRONG PASSWORD"})
  }
  
});

app.post("/addUser", async(request,response) => {
  console.log(request.body.password)
  if(request.body.password === 'jesus'){
    delete request.body.password
    response.send(await _db_controller.user(request.body))
  } else {
    response.send({error: "WRONG PASSWORD"})
  }
  
});


app.post("/addExercise", async(request,response) => {
  console.log(request.body.password)
  if(request.body.password === 'jesus'){
    delete request.body.password
    response.send(await _db_controller.exercise(request.body))
  } else {
    response.send({error: "WRONG PASSWORD"})
  }
  
});

app.post("/islive", async(request,response) => {
  console.log(request.body.password)
  if(request.body.password === 'jesus'){
    delete request.body.password
    response.send(await _db_controller.isLive(request.body))
  } else {
    response.send({error: "WRONG PASSWORD"})
  }
  
});
app.post("/notlive", async(request,response) => {
  console.log(request.body.password)
  if(request.body.password === 'jesus'){
    delete request.body.password
    response.send(await _db_controller.notLive(request.body))
  } else {
    response.send({error: "WRONG PASSWORD"})
  }
  
});

app.get("/livestatus", async (request,response)=>{
  response.send(await _db_controller.liveStatus())
});
// api - ost data
app.post("/register", async(request,response) => {
  
  response.send(await _db_controller.register(request.body))
});


app.post("/message", async (request, response)=>{
  response.send(await _db_controller.message(request.body))
});

// api - utility
app.get("/reset", async (request,response)=>{
  response.send(await _db_controller.clearDB({}))
});

// start server
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
