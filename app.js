const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const app = express();
const date = require(__dirname + "/date.js");

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  const day = date.getDate();

  res.render("list", { listTitle: day, newListItem: items });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running at port 3000");
});
