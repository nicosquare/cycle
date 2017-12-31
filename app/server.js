var fs = require('fs')
var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server)
// For better efficient design
var http = require('http')
var extras = require('./extras.js')
var extras = require('./extras.js');
var async = require("async");
var request = require("request");
//JQuery
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")((new JSDOM('')).window);

// Uport imports

const Connect = require("uport-connect").Connect;
const SimpleSigner = require("uport-connect").SimpleSigner;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// UPort code from here

const uport = new Connect('Cycle', {
      clientId: '2ojxCynUCy1VWqWJNJSVFAoRRyCPZDkSPw1',
      network: 'rinkeby',
      signer: SimpleSigner('e42efa79fadf96bfb9e9c4b0f75ea010640f55adcdc3cbdfa13638fe361d923d')
    })

app.post('/authenticate', function (req, res) {
    
    // Request credentials to login
    uport.requestCredentials({
      requested: ['name', 'phone', 'country'],
      notifications: true // We want this if we want to recieve credentials
    })
    .then((credentials) => {
      console.log("Something good");
    })
});


//ML service things setup from here

app.get("/ml",(req,res)=>{
	var item1 = [request];
async.each(item1, function (item ,callback) {
	item({url:extras.urlml},(error,response,body)=>{
		var json = JSON.parse(body);
		autho = json.token;
		callback();
		console.log("fhjf")
	})
}
	,function(){
		request({
		url : 'https://ibm-watson-ml.mybluemix.net/v3/wml_instances/146580e2-a115-4be3-9b14-025757725b76/published_models/3f73ee01-ea89-437e-b99d-d5763f9a9fbe/deployments/b76b2426-643b-4001-8574-84038d9845eb/online',
		method : 'POST',
		auth : {
			'bearer' : autho
		
		},
			headers : {
				'content-type': 'application/json',
				'Accept': 'application/json'
			},
			json :{
				"fields" :["Global_active_power","Global_reactive_power","Voltage","Global_intensity","Sub_metering_1","Sub_metering_2","Sub_metering_3"] , "values" :[ [4.216,0.418,234.18,18.4,0,1,17]]
			}
			}
,(error,response,body)=>{
		console.log(response.body.values)
		var ans = response.body.values[0][6]
		console.log(ans)	
})
	
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
io.sockets.on('connection',function(socket){
	io.emit("message","You are connected");
})

var port = process.env.PORT || 3000
	server.listen(port, function() {
	console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
   
