var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
// For better efficient design
var extras = require('./extras.js')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Setting the cloudant service newly
var Cloudant = require('cloudant');
var me = extras.username;
var password = extras.password;
var cloudant = Cloudant({account:me, password:password});

database = cloudant.db.use('mydb');
database.find({selector:{}},(error,result)=>{
	if(!error)
	{
		console.log(result.docs)
	for(var i = 0 ; i < result.docs.length ; i++){
		console.log(result.docs[i]._id)
	}
}
else{
	console.log(error)
}
})
/* Endpoint to greet and add a new visitor to database.
* Send a POST request to localhost:3000/api/visitors with body
* {
* 	"name": "Bob"
* }
*/

app.post("/api/visitors", function (request, response) {
  var userName = request.body.name;
  if(!mydb) {
    console.log("No database.");
    response.send("Hello " + userName + "!");
    return;
  }
  // insert the username as a document
    
	database.insert({"name" : userName} , (err,result)=>{
		if(err){
			return console.log(err)
		}
		response.send("hello")
	})
});

/**
 * Endpoint to get a JSON array of all the visitors in the database
 * REST API example:
 * <code>
 * GET http://localhost:3000/api/visitors
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 */
app.get("/api/visitors", function (request, response) {
  var names = [];
	if(!database){
		response.send(names)
	}
	database.find({ selector:{} }, function(err, result) {
    if (!err) {
          console.log(result.docs[0].name)
		names.push(result.docs[0].name)
      }
console.log(names) 
      response.json(names);
})
  });



// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
     // CF service named 'cloudantNoSQLDB'
     var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
     // user-provided service with 'cloudant' in its name
     var cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }

  //database name
  var dbName = 'mydb';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use(dbName);
}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));



var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
   
