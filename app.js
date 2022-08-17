// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = new mongoose.Schema({
    name : String
});

const Item = mongoose.model("Item", itemSchema);

const item1  = new Item({
    name : "item1"
});
const item2  = new Item({
    name : "item2"
});
const item3  = new Item({
    name : "item3"
});

const defaultItems = [item1, item2, item3];



app.get("/", function(req, res){

    Item.find(function(err, item){
        if(item.length === 0){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("success");
                }
            });
            res.redirect("/");
        }else
            res.render("index", {kindOfDay : "Today", newItem : item});

    })
});


app.post("/", function(req, res){
  // item.push(req.body.item);

  console.log(req.body);
  // dono ki alag alag post request bana kar aasani se kiya ja sakta tha.

  if(req.body.cBox === "add"){
      let object = new Item({
          name : req.body.item
      })

      object.save();
      res.redirect("/");
  }else{
  Item.deleteOne({_id : req.body.cBox}, function(err){
      if(err){
          console.log(err);
      }else{
          console.log("successfully deleted");
      }
  });
  res.redirect("/");
}
  // Item.insertMany([object], function(err){
  //     if(err){
  //         console.log(err);
  //     }else{
  //         console.log("success");
  //     }
  // })
  // // console.log(item);
  //
  //   res.redirect("/");
})

app.listen(3000, function(req, res){
    console.log("server started on port 3000");
});
