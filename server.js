'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: true
}));

app.get('/', function(req, res){
  res.send('Not found');
  // return res.sendStatus(404);
});

app.get('/:id', function(req, res){
  let id = req.params.id;
  if(id !== 'pets'){
    res.send('Not found');
    // return res.sendStatus(404);
  }else{
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if(err){
        throw err;
      }else{
        res.send(JSON.parse(data));
      }
    });
  }
});

app.get('/pets/:id', function(req, res){
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if(err){
      throw err;
      // return res.sendStatus(500);
    }
    let id = Number.parseInt(req.params.id);
    data = JSON.parse(data);
    if(id < 0 || id >= data.length || Number.isNaN(id)){
      res.send('Not found');
      // return res.sendStatus(404);
    }
    res.send(data[id]);
  });
});

app.post('/pets', function(req, res){
  if(req.body === '' || Object.keys(req.body).length < 3){
    res.send('Bad Request');
    // return res.sendStatus(404);
  }
  var qual = true;
  for(var key in req.body){
    if(key !== 'name' && key !== 'age' && key !== 'kind'){
      qual = false;
    }
  }
  if(qual === true){
    if(isNaN(parseInt(req.body.age)/1)){
      qual = false;
    }
  }
  if(qual === false){
    res.send('Bad Request');
    // return res.sendStatus(404);
  }else{
    fs.readFile(petsPath, 'utf8', (err, data) =>{
      if(err){
        throw err;
      }else{
        data = JSON.parse(data);
        data.push(req.body);
        fs.writeFile(petsPath, JSON.stringify(data), (err) =>{
          if(err){
            throw err;
          }
        });
      }
    });
    res.send(req.body);
  }
});

app.put('/pets/:id', function(req, res){
  if(req.body === '' || Object.keys(req.body).length < 3){
    res.send('Bad Request');
    // return res.sendStatus(404);
  }
  var qual = true;
  for(var key in req.body){
    if(key !== 'name' && key !== 'age' && key !== 'kind'){
      qual = false;
    }
  }
  if(qual === true){
    if(isNaN(parseInt(req.body.age)/1)){
      qual = false;
    }
  }
  if(qual === false){
    res.send('Bad Request');
    // return res.sendStatus(404);
  }else{
    fs.readFile(petsPath, 'utf8', (err, data) =>{
      if(err){
        throw err;
      }else{
        data = JSON.parse(data);
        data[parseInt(req.params.id)] = req.body;
        fs.writeFile(petsPath, JSON.stringify(data), (err) =>{
          if(err){
            throw err;
          }
        });
      }
    });
    res.send(req.body);
  }
});

app.delete('/pets/:id', function(req, res){
  fs.readFile(petsPath, 'utf8', (err,data) =>{
    if(err){
      throw err;
    }else{
      var elem;
      data = JSON.parse(data);
      elem = data[parseInt(req.params.id)];
      data.splice(parseInt(req.params.id), 1);
      fs.writeFile(petsPath, JSON.stringify(data), (err) =>{
        if(err){
          throw err;
        }
      });
      res.send(elem);
    }
  });
});

app.listen(port, function(){
  console.log('Listening on port', port);
});
