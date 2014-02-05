var serv=require('./serv');

exports.serv=function(req,res,next){
	var cmd=req.params.serv; 
	console.info(serv); 
	serv.executes(req,res,next);
};