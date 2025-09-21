const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  mobile: { type: String, match: /^[0-9]{10}$/ },
  state: String,
  city: String,
  address: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
