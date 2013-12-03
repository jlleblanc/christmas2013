
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var db = require('./lib/db'),
  auth = require('./lib/auth'),
  MongoStore = require('connect-mongo')(express);

if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  credentials = env['mongodb-1.8'][0]['credentials'].url;
} else {
  credentials = "mongodb://jlleblanc:asdfghjkl@paulo.mongohq.com:10006/christmas";
}


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

// Layouts

app.get('/layouts/plans', function (req, res) {
	res.render('plans');
});

app.get('/layouts/events', function (req, res) {
	res.render('events');
});

app.get('/layouts/yourgifts', function (req, res) {
	res.render('yourgifts');
});

app.get('/layouts/buygifts', function (req, res) {
	res.render('buygifts');
});

app.get('/layouts/index', function (req, res) {
	res.render('index');
});

// Traditional login process

app.post('/login', routes.login);
app.post('/register', routes.register);
app.get('/logout', routes.logout);

// API

app.get('/api/events', routes.events);
app.post('/api/events', routes.new_event);
app.get('/api/events/vote/:event_id', routes.vote_event);
app.get('/api/plans', routes.plans);
app.post('/api/plans', routes.save_plans);
app.get('/api/gifts', routes.gifts);
app.get('/api/gifts/buy/:gift_id', routes.buy_gift);
app.post('/api/gifts', routes.new_gift);

// server start

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
