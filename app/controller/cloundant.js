var Cloudant = require('cloudant');
var extras = require('../extras.js');
var username = extras.username;
var password = extras.password;
var cloudant = Cloudant({account:username , password:password})

var database = cloudant.db.use('household_power_consumption');
var did1 = cloudant.db.use('prediction-battery');
var did2 = cloudant.db.use('prediction-grid');
module.exports={
	database,
	cloudant, 
	did1,
	did2
}
