require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
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
// POST /users
app.post('/users', (req, res) => {
  var userObj = _.pick(req.body, ['email', 'password']);
  var user = new User(userObj);//use pick
  user.save().then(() => {
      return user.generateAuthToken();
  }).then(token => {
    res.header('x-auth', token).send(user);
  }).catch(e => {
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
});

// PATCH /todos/:id
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

// app.get('/users/ne', (req, res) => {
//   var token = req.header();
// });

app.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`);
});



module.exports = {app};
