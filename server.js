//server.js
'use strict';
//this is different
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Dancer = require('./model/dancers');
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 5000;

//db config
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017';
mongoose.connect(mongoUri);

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

	//and remove cacheing so we get the most recent comments
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
	res.json({ message: 'API Initialized!'});
});

router.route('/dancers')
  .get(function(req, res) {
    Dancer.find({$and: [{studio: {'$regex': req.query.studio, '$options':'i'}},
                       {fullname: {'$regex': req.query.fullname, '$options':'i'}}]},
		function(err, dancers) {
      if (err)
        res.send(err);
		  res.json(dancers)
    });
  })

  .post(function(req, res) {
    var dancer = new Dancer();
	  dancer.fullname = req.body.fullname;
    dancer.studio = req.body.studio;
	  dancer.owed = req.body.owed;
    dancer.checkedin = false;

    dancer.save(function(err) {
      if (err)
        res.send(err);
		  res.json({ message: 'Dancer successfully added!' });
	  });
  })

  .put(function(req, res) {
    let dancers = req.body.params.dancers;
    for(let i = 0; i < dancers.length; i++) {
      Dancer.update({_id: dancers[i]}, {$set: { checkedin: true }},
        function (err, results){
          if (err)
            res.send(err);
        }
      );
    }
    res.json({message: 'Dancer(s) successfully checked in!'});
  });

app.use('/api', router);

app.listen(port, function() {
	console.log('api running on port ' + port);
});
