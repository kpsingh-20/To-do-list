// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require('mongoose');
const app = express();
const _ = require('lodash');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect("mongodb+srv://kpsingh_20:Test-123@cluster0.clnldqj.mongodb.net/todolistDB");
// mongoose.connect("mongodb://kpsingh_20:Test-123@cluster0.clnldqj.mongodb.net/todolistDB");      //when lan is connected


const itemSchema = new mongoose.Schema({
    name : String
});

const Item = mongoose.model("Item", itemSchema);

const item1  = new Item({
    name : "Welcome!"
});
const item2  = new Item({
    name : "Hit the + to add new item"
});
const item3  = new Item({
    name : "<- Hit the checkBox to delete"
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
            res.render("index", {List : "Today", newItem : item});

    })
});


app.post("/", function(req, res){
  // item.push(req.body.item);

  console.log(req.body);


      let object = new Item({
            name : req.body.item
      })

      const dbName = _.lowerCase(req.body.submit);

      if(dbName === "today"){
          Item.insertMany([object], function(err){
              if(err){
                  console.log(err);
              }
          });
          res.redirect("/");
      }else{
          const ITEMX = mongoose.model(dbName, itemSchema);

          ITEMX.insertMany([object], function(err){});
          res.redirect("/" + dbName);
      }
      // object.save();
      // res.redirect("/");
});

app.post("/delete", function(req, res){

    const itemId = req.body.checkBox;
    let dbName = _.lowerCase(req.body.listName);

    console.log(itemId);

    if(dbName === _.lowerCase("Today")){
        Item.deleteOne({_id : req.body.checkBox}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("successfully deleted");
            }
        });
        res.redirect("/");
    }else {
    const ItemDb = mongoose.model(dbName, itemSchema);
    ItemDb.deleteOne({_id : itemId}, function(err){

    });
    res.redirect("/" + dbName);
}

});

app.get("/:name", function(req, res){
    const name = _.lowerCase(req.params.name);

    const ItemList = mongoose.model(name, itemSchema);

    ItemList.find(function(err, item){
        if(item.length === 0){
            ItemList.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("success");
                }
            });
            res.redirect("/" + name);
        }else
        res.render("index", {List : name, newItem:item});

    });

})

app.listen(3000, function(req, res){
    console.log("server started on port 3000");
});
