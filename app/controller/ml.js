var async = require('async');
var request = require('request');
var extras = require('../extras.js');
var cloudant_controller = require('./cloundant.js');
var items = [];
var ml = function(d_id){
	var item1 = [request];
	var url = extras.urltoken +	d_id;
	async.each(item1, function (item ,callback) {
		item({url:extras.urlml},(error,response,body)=>{
			var json = JSON.parse(body);
			autho = json.token;
			callback();
			console.log("f1")
		})
	},function(){
		var item2 = [cloudant_controller];
		async.each(item2 , function(item,callback){
			item.database.find({selector:{}},(error,result)=>{
				if(error){
					throw error;
				}
				var length = result.docs.length;
				var ans = result.docs[length-1].d;
				for(item in ans){
					items.push(ans[item])
				}
				items = items.slice(0,7)
				console.log(items)
				callback()
			})

		},
	
		function(){
			console.log("hfaff")
			request({
				url : url,
				method : 'POST',
				auth : {
					'bearer' : autho

				},
				headers : extras.headers,
				json :{
					"fields" :["Global_active_power","Global_reactive_power","Voltage","Global_intensity","Sub_metering_1","Sub_metering_2","Sub_metering_3"] , "values" :[ items]
				}
			}
				,(error,response,body)=>{
					console.log(response.body.values)
					var ans = response.body;
					console.log(ans)	
				})



		})


})
};
module.exports = {
	ml
}