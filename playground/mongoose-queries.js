const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
// var id = '58922e3fb1616740200bac1c11';

// Todo.find({
//   _id: id
// }).then(todos =>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then(todo =>{
//   console.log('Todo', todo);
// });
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
// Todo.findById(id).then(todo =>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('TodoById', todo);
// }).catch( e => {
//   console.log(e);
// });
var id = '5891de376400777c0e557b90';

User.findById(id).then(user => {
  if(!user){
    return console.log('ID not found');
  }
  console.log('User By Id', user);
}).catch( e => {
  console.log(e);
})
