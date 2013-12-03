// var bcrypt = require('bcrypt'),
var db = require('./db');

// User

exports.find_user = function  (username, callback) {
  db.user.findOne({username: username}, function  (err, doc) {
    callback(doc);
  });
};

exports.create_user = function  (username, password, callback) {

  // var salt = bcrypt.genSaltSync(10);
  // var hash = bcrypt.hashSync(password, salt);

  var user = new db.user({
    username: username, 
    password: password
  });

  user.save(function  (err) {
    if (err) {
      throw "Create user: " + err;
    }

    callback();
  });

};

exports.get_all_usernames = function  (callback) {
  db.user
    .find()
    .exec(callback);
};

// Gift

exports.save_gift = function (vars, callback) {
  if (!vars.username_to) {
    throw "Must specify a recipient!";
  }

  var gift = db.giftidea(vars);
  
  gift.save(function  (err) {
    if (err) {
      throw "Create gift: " + err;
    }

    callback();
  });
  
};

exports.find_gifts_aside = function  (exclude, callback) {
  db.giftidea
    .find()
    .where('username_to')
    .ne(exclude)
    .exec(callback);
};

exports.buy_gift = function  (id, username, callback) {
  db.giftidea.findById(id, function  (err, doc) {
    if (err) {
      throw "Buy gift: " + err;
    }

    if (doc.username_from.indexOf(username) === -1) {
      doc.username_from.push(username);
      
      doc.save(function  (err) {
        if (err) {
          throw "Buy gift: " + err;
        }
        
        callback();
      });
    } else {
      callback();
    }
  });
};

// Events

exports.save_event = function (vars, callback) {
  var an_event = db.eventidea(vars);
  
  an_event.save(function  (err) {
    if (err) {
      throw "Create event: " + err;
    }

    callback();
  });
  
};

exports.find_events = function  (callback) {
  db.eventidea
    .find()
    .exec(callback);  
};

exports.vote_event = function  (id, username, callback) {
  db.eventidea.findById(id, function  (err, doc) {
    if (err) {
      throw "Vote event: " + err;
    }

    if (doc.votes.indexOf(username) === -1) {
      doc.votes.push(username);
      
      doc.save(function  (err) {
        if (err) {
          throw "Vote event: " + err;
        }
        
        callback();
      });
    } else {
      callback();
    }
  });
};

// Plans

exports.save_plans = function (vars, callback) {
  db.plans.findOneAndUpdate({ username: vars.username }, vars, {upsert: true}, callback);  
};

exports.find_plans = function  (callback) {
  db.plans
    .find()
    .exec(callback);  
};
