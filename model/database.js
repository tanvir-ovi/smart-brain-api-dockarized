const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

// create userInformationSchema
const userSchema = Schema({
	_id:Number,
  name: String,
  email: String,
  password: String,
  entries: Number,
  joined: String
}, {_id: false });
userSchema.plugin(AutoIncrement);

const User = mongoose.model('User', userSchema);

module.exports = {
  User
}