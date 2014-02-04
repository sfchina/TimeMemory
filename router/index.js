
exports.serv=function(req,res){
	var cmd=req.params.serv;
	if(cmd=='cpimg'){
		res.send('Hello World');
	}else{
		res.send('Hello World');
	}
};