const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then(result => {
//   console.log(result);
// });
// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove(id)

Todo.findOneAndRemove({_id: '58924b03353af9b24e1ab32a'}).then(todo => {
  console.log(todo);
});
