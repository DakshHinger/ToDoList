const express = require('express');
const bodyparser = require("body-parser");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    let day = new Date().getDay();
    res.render('index', { day: day });
});

app.post('/', (req, res) => {
    var item = req.body.newItem;
    console.log(item);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 