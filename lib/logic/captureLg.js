var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var captureImage=function(next){
	var curDateTime=new Date();
	console.info('captureImage'+curDateTime);
	var targetFolder=path.join(global.conf.baseDir,'public/target');
	var fileName=curDateTime.getFullYear()+'-'
		+(curDateTime.getMonth()+1)+'-'
		+curDateTime.getDate()+'-'
		+curDateTime.getHours()+'-'
		+curDateTime.getMinutes()+'-'
		+curDateTime.getSeconds()+'.jpg';
	
	var targetPath=path.join(targetFolder,fileName);
	
	//var cmd='fswebcam -d /dev/video0 -r 800x600 "'+targetPath+'"';
	var cmd='ls "'+targetFolder+'"';
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

exports.captureImage=captureImage;