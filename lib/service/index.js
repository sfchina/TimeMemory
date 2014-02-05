var fs=require('fs');
var path=require('path');
var services=null;

var initialize=function(){
	services={};
	fs.readdir(__dirname, function(err,files){
		files.forEach(function(file){
			if(!file.match(/^index.js$/i)){
				var name=path.basename(file,'.js');
				services[name]=require('./'+name);
			}
		});
		console.info('services:');
		console.info(services);
	});
};
var executes=function(serv,req,res,next){
	if(services[serv]){
		services[serv].executes(req,res,next);
	}else{
		res.send(404,'not this service:'+serv);
	}
};

exports.initialize=initialize;
exports.executes=executes;