// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

var item = [];
app.get("/", function(req, res){
    // res.send("Hello");
    // res.sendFile(__dirname + "/index.html");

    // res.write("<p> hello this is para </p>");
    // res.write("<h1> hello this is h1 </h1>");
    // res.send();

    var today = new Date();
    var currentDay = today.getDay();

    var options = {
      year : "numeric",
        weekday : "long",
        day : "numeric",
        month : "long",
        date : "numeric",
    };

    var day = today.toLocaleString("hi-IN", options);
    res.render("index", {kindOfDay : day, newItem : item});
});


app.post("/", function(req, res){
  item.push(req.body.item);
  // console.log(item);

    res.redirect("/");
})

app.listen(3000, function(req, res){
    console.log("server started on port 3000");
});
