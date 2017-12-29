var async = require('async');
var request = require('request');
var extras = require('../extras.js');
var cloudant_controller = require('./cloundant.js');
var ml = function(d_id){
	var item1 = [request];
	var url = extras.urltoken +	d_id;
	async.each(item1, function (item ,callback) {
		item({url:extras.urlml},(error,response,body)=>{
			var json = JSON.parse(body);
			autho = json.token;
			callback();
		})
	},/*function(){
		var item2 = [cloundant_controller];
		async.each(item2 , function(item,callback){
			item.find({selector:{}},(error,result)=>{
				if(error){
					throw error;
				}
				
			})

		}
	}*/
		function(){
			request({
				url : url,
				method : 'POST',
				auth : {
					'bearer' : autho

				},
				headers : extras.headers,
				json :{
					"fields" :["Global_active_power","Global_reactive_power","Voltage","Global_intensity","Sub_metering_1","Sub_metering_2","Sub_metering_3"] , "values" :[ [4.216,0.418,234.18,18.4,0,1,17]]
				}
			}
				,(error,response,body)=>{
					console.log(response.body.values)
					var ans = response.body;
					console.log(ans)	
				})



		})
}
module.exports = {
	ml
}
