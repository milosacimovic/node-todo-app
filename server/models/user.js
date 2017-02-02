var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var UserSchema = new mongoose.Schema({
  email: {
    required: true,
    trim: true,
    type: String,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: '{VALUE} is not valid email'
    }
  },
  password: {
    type: 'String',
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: 'String',
      required: true
    },
    token: {
      type: 'String',
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['email', '_id']);
}
//because => doesn't bind this keyword -using regular function keyword
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  console.log(user);
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();

  user.tokens.push({access,token});
  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;//undefined at the moment
  try{
      decoded = jwt.verify(token, 'abc123');
  }catch(e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}
var User = mongoose.model('User',UserSchema);

module.exports = {User};
