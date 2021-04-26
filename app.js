const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const secoundName = req.body.sName;
  const email = req.body.tName;

  const data = {
    email_address : email,
    status: "subscribed",
    merge_fields : {
      FNAME:firstName,
      LNAME:secoundName
    }
  }
  const jsData = JSON.stringify(data);
  const url = process.env.URL;
  const option = {
    mathod: "POST",
    auth: process.env.API_KEY
  }
  const Request = https.request(url ,option ,function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/succes.html");
    }else{
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
 Request.write(jsData);
 Request.end();

});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/singup.html");

});

app.post("/failure", function(req, res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
  console.log("Server 3000 run.");
})


