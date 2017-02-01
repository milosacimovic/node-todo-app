const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
      return console.log('Unable to connect to mongo server',err);
  }
  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Todos')
  // .deleteMany({text: 'Eat lunch'})
  // .then(result => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos')
  // .deleteOne({text: 'Eat lunch'})
  // .then(result => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos')
  // .findOneAndDelete({completed: false})
  // .then(result => {
  //   console.log(result);
  // });
  // db.collection('Users')
  // .deleteMany({name: 'Nemanja Vicovac'})
  // .then(result => {
  //   console.log(result);
  // });
  db.collection('Users')
  .findOneAndDelete({_id: new ObjectID('5891cd8c353af9b24e1ab328')})
  .then(result => {
    console.log(result);
  });

  //db.close();
});
