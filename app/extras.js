// Cloudant Nosql db details
var username = "79c145d8-afcf-4923-946b-0bb16f7e647b-bluemix"
var password = "7884041f905025a0d8f762f43410a4f500875bf71979cae253b1e0a2b5294b43"
// ML service credentials for token retreiving
var usernameml = "0457b6fb-93c8-4049-81c3-807dc0d78368"
var passwordml = "914cc844-01dd-4274-a0cd-85b1e900d168"
var urlml = 'https://' + usernameml + ':' + passwordml + '@ibm-watson-ml.mybluemix.net/v3/identity/token';

// ML service details for the token bearer use
var urltoken = 'https://ibm-watson-ml.mybluemix.net/v3/wml_instances/146580e2-a115-4be3-9b14-025757725b76/published_models/3f73ee01-ea89-437e-b99d-d5763f9a9fbe/deployments/b76b2426-643b-4001-8574-84038d9845eb/online'
var headers = {
					'content-type': 'application/json',
					'Accept': 'application/json'
				}

module.exports={
	password,
	username,
	usernameml,
	passwordml,
	urlml,
	urltoken 
}
