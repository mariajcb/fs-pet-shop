'use strict';
//part 3
var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 8000;
var petPath = path.join(__dirname, 'pets.json');
let pets;

//read pets.JSON
fs.readFile(petPath, (err, data) => {
    if (err) {
        console.error('Error', err);
    }
    pets = JSON.parse(data);
});

//get all
app.get('/pets', (req, res) => {
    res.send(pets);
});

//get one
app.get('/pets/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (id >= 0 && id < pets.length) {
        res.send(pets[id]);
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, function() {
    console.log('Listening on port', port);
})

app.get(`/*`, (req, res) => {
    res.set(`Content-Type`, `text/plain`);
    res.sendStatus(404);
});
