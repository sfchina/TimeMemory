// http://nodejs.org/api.html#_child_processes
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var captureImage=function(next){
	console.info(global.conf);
	var targetFolder=path.join(global.conf.baseDir,'public/target');
	var curDateTime=new Date();
	
	var fileName=curDateTime.getFullYear()+'-'
		+(curDateTime.getMonth()+1)+'-'
		+curDateTime.getDate()+'-'
		+curDateTime.getHours()+'-'
		+curDateTime.getMinutes()+'-'
		+curDateTime.getSeconds()+'.jpg';
	
	var targetPath=path.join(targetFolder,fileName);
	
	var cmd='fswebcam -d /dev/video0 -r 800x600 "'+targetPath+'"';
	console.info('now:['+curDateTime+']¥t¥t¥tcapture command:'+cmd);
	
	// executes `cmd`
	var child = exec(cmd, function (error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		sys.print('stderr: ' + stderr);
		var result={'rc':global.conf.rc_ok,'rm':null,'data':{}};
		if(error){
			result.rc=global.conf.rc_ng;
			result.rm=error;
		}else{
			result.data.img_pt=fileName;
		}
		next(result);
	});
};

var executes=function(req,res,next){
	captureImage(function(result){
		if (result.rc!=global.conf.rc_ok) {
			console.info('exec error: ' + result.rm);
			res.send(500,'exec error: ' + result.rm);
		}else{
			res.send(200,'capture Image over!<img src="/target/'+result.data.img_pt+'" />');
		}
	});
	
};

exports.executes=executes;
exports.captureImage=captureImage;

