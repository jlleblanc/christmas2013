var model = require('../lib/model'),
  passport = require('passport');

exports.index = function(req, res){
  res.render('layout', { title: 'Christmas' });
};

exports.events = function  (req, res) {
  if (!req.user) {
    res.end(401);
  } else {
    model.find_events(function  (err, events) {
      for (var i=0; i < events.length; i++) {
        events[i].votes = events[i].votes.length;
      }

      res.json(events);
    });
  }
};

exports.vote_event = function  (req, res) {
  if (!req.user) {
	res.end(401);
  } else {
    model.vote_event(req.body.event_id, req.user.username, function  () {
      res.end(204);
    });
  }
};

exports.new_event = function  (req, res) {
  if (!req.user) {
  	res.end(401);
  } else {
    model.save_event({
      description: req.body.description,
      username_proposed: req.user.username
    } , function  () {
      res.end(204);
    });
  }
};

exports.plans = function  (req, res) {
  if (!req.user) {
	res.end(401);
  } else {
    model.find_plans(function  (err, plans) {
      
      var your_plans;
      
      for (var i=0; i < plans.length; i++) {
        if (plans[i].username == req.user.username) {
          your_plans = plans[i].plans;
        }
      }
      
      res.json({plans: plans, your_plans: your_plans});
    });
  }
};

exports.save_plans = function  (req, res) {
  if (!req.user) {
	res.end(401);
  } else {
    model.save_plans({
      plans: req.body.plans,
      username: req.user.username      
    }, function  () {
      res.end(204);
    });
  }
};


exports.gifts = function  (req, res) {
  if (!req.user) {
	res.end(401);
  } else {
    model.find_gifts_aside(req.user.username, function  (err, gifts) {
      model.get_all_usernames(function  (err, usernames) {
        res.json({gifts: gifts, usernames: usernames});
      });
    });
  }
};

exports.new_gift = function  (req, res) {
  if (!req.user) {
	res.end(401);
  } else {
    model.save_gift({
      gift: req.body.gift,
      username_to: req.body.username_to,
      username_proposed: req.user.username
    } , function  () {
      res.end(204);
    });
  }
};

exports.buy_gift = function  (req, res) {
  if (!req.user) {
	res.end(401);
  } else {
    model.buy_gift(req.params.gift_id, req.user.username, function  () {
      res.end(204);
    });
  }  
};

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
});

exports.register = function  (req, res) {
  passport.register(req.body.username, req.body.password, function  () {
    res.end(204);
  });
};

exports.logout = function  (req, res) {
  req.logOut();
  res.end(204);
};