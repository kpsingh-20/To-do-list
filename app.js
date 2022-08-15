// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.get("/", function(req, res){
    // res.send("Hello");
    // res.sendFile(__dirname + "/index.html");

    res.write("<p> hello this is para </p>");
    res.write("<h1> hello this is h1 </h1>");
    res.send();
});

app.listen(3000, function(req, res){
    console.log("server started on port 3000");
});
