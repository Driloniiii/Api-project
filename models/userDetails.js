const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  additionalInfo: { type: String },
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);
