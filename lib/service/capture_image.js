// http://nodejs.org/api.html#_child_processes
 
var captureLg=require('../logic/captureLg');

var executes=function(req,res,next){
	captureLg.captureImage(function(result){
		if (result.rc!=global.conf.rc_ok) {
			console.info('exec error: ' + result.rm);
			res.send(500,'exec error: ' + result.rm);
		}else{
			res.send(200,'capture Image over!<img src="/target/'+result.data.img_pt+'" />');
		}
	});
	
};

exports.executes=executes;


