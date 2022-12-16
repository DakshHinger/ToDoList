const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "This is my ToDoList"
});
const item2 = new Item({
    name: "This is my ToDoList2"
});
const item3 = new Item({
    name: "This is my ToDoList3"
});
const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

var items = [];
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let day = new Date().getDay();
    const DayArray=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            res.redirect("/");
        } else {
            res.render("index", { day: DayArray[day], newItem: foundItems })
        }

    })
    // let day = new Date().getDay();
    // res.render('index', { day: day, newItem: items });
});

app.post('/', (req, res) => {
    // item = req.body.newItem;
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });
    item.save();
    // items.push(item);
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 