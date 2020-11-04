//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food" , "Cook Food", "Eat Food"];

const workItems = [];

app.set('view engine', 'ejs'); //this is used to help us use ejs to create html templates
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

const day = date.getDate();

//  var currentDay = today.getDay();
//  var day = "";

//  switch (currentDay) {
//  case 0:
//    day = "Sunday";
//  break;
//  case 1:
//    day = "Monday";
//  break;
//  case 2:
//    day = "Tuesday";
//  break;
//  case 3:
//    day = "Wednesday";
//  break;
//  case 4:
//    day = "Thursday";
//  break;
//  case 5:
//    day = "Friday";
//  break;
//  case 6:
//    day = "Saturday";
//  break;
//    default:
//    console.log("Error: current day = " + currentDay);
//  }
  res.render("list", {listTitle: day , newListItems: items});
   //this will work only if you have a views folder and a .ejs file
  //inside it called 'list'. This command will pass a variable called 'kindOfDay' whose value is day variable, to
  //the file 'list'
});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.listen(3000, function(){
  console.log("server started on port 3000");
});
