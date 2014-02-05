var services=require('../lib/service');
services.initialize();
exports.executes=function(req,res,next){
	var cmd=req.params.serv;
//	logger.info(cmd);
	console.info(services);
	services.executes(cmd,req,res,next);
};