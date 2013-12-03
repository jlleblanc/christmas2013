var mongoose = require('mongoose');

var user = new mongoose.Schema({
  username: String,
  password: String
});

exports.user = mongoose.model('user', user);

var eventidea = new mongoose.Schema({
  description: String,
  votes: Array,
  username_proposed: String
});

exports.eventidea = mongoose.model('eventidea', eventidea);

var giftidea = new mongoose.Schema({
  gift: String,
  username_proposed: String,
  username_from: Array,
  username_to: String
});

exports.giftidea = mongoose.model('giftidea', giftidea);

var plans = new mongoose.Schema({
  username: String,
  plans: String
});

exports.plans = mongoose.model('plans', plans);

var connect = function (url) {
  mongoose.connect(url);
};

exports.connect = connect;