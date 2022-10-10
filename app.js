const express = require('express');
const bodyparser = require("body-parser");

const app = express();
const port = 3000;

var items = [];
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let day = new Date().getDay();
    res.render('index', { day: day, newItem: items });
});

app.post('/', (req, res) => {
    item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 