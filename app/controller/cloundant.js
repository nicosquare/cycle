var Cloudant = require('cloudant');
var extras = require('../extras.js');
var username = extras.username;
var password = extras.password;
var cloudant = Cloudant({account:username , password:password})

var database = cloudant.db.use('household_power_consumption');

module.exports={
	database,
	cloudant 
}
