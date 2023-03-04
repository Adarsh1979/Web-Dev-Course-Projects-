const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");        // Demo of how to use our own package.
const mongoose = require("mongoose");
const lodash = require("lodash");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log("Connection failed");
})


const itemsSchema = {
    name: String
}
const Item = mongoose.model("item", itemsSchema);


const item1 = new Item({
    name: "Welcome to your ToDolist!"
});

const item2 = new Item({
    name: "Hit the + button to add new item."
});

const item3 = new Item({
    name: "Hit this to delete an item."
});

const defaultItem = [item1, item2, item3];




const listSchema = {
    name: String,
    items: [itemsSchema]
}
const List = mongoose.model("list", listSchema);





app.get("/", function (req, res) {

    Item.find(function(err, foundItems){

        if (foundItems.length === 0) {
            Item.insertMany(defaultItem, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Successfully Inserted into DB.");
                }
            });
            res.redirect("/");
        }
        else{
            res.render("list", { listTitle: "Today", newListItems: foundItems });
        }
    });
});

app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if(listName === "Today"){
        item.save();
        res.redirect("/");
    }
    else {
        List.findOne({name: listName}, function(err, foundDocu){
            foundDocu.items.push(item);
            foundDocu.save();
            res.redirect("/" + listName);
        });
    }
});


app.post("/delete", function(req, res){
    const checkedItemid = req.body.checkbox;
    const listName= req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemid, function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Successfully removed from the database.");
                res.redirect("/");
            }
        });
    }
    else {

        // todolistDB (Database) --> 1.items   2.lists (Two collections) --> lists {name: ___, items:[___, ___] }   <-- this is model of all documents of lists collection.

        // We are using below findOneAndUpdate() method to delete the item from items array of particular document having _id as checkedItemId from lists collection.
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemid}}}, function(err, foundList){
            if(!err){
                res.redirect("/" + listName);
            }
        })
    }
});





app.get("/:customListName", function(req, res){
    const customListName = lodash.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundObj){
        if(!err){
            if(!foundObj){
                const list = new List({
                    name: customListName,
                    items: defaultItem
                });
            
                list.save();
                res.redirect("/" + customListName);
            }
            else {
                res.render("list", { listTitle: foundObj.name, newListItems: foundObj.items });
            }
        }
    });

});





app.get("/about", function (req, res) {
    res.render("about");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port, function() {
  console.log("Server started succesfully on port 3000.");
}); 
