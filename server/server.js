const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then( doc => {
    res.send(doc);
  }, e => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({todos});
  }, e => {
    res.status(400).send(e);
  });
});

//GET /todos/23412334
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then( todo => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch( e => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;


  // valide the id => not valid return 404
  //remove todo by id
  Todo.findByIdAndRemove(id).then( todo => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch( e => {
    res.status(400).send();
  });
  // success
    //if no doc, send id
    //if doc send doc with 200
  // error 400 empty body
});


app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  //subset of things user passed to us
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  //updated completed and completedAt properties
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
//database query
  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then( todo => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch(e => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});



module.exports = {app};
