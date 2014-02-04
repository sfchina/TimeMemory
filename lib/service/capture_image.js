// http://nodejs.org/api.html#_child_processes
var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

exports.captureImage=function(){
	var targetFolder=path.jon(global.conf.baseDir,'public/target');
	var curDateTime=new Date();
	
	var fileName=curDateTime.getFullYear()+'-'
		+(curDateTime.getMonth()+1)+'-'
		+curDateTime.getDate()+'-'
		+curDateTime.getHours()+'-'
		+curDateTime.getMinutes()+'-'
		+curDateTime.getSeconds()+'.jpg';
	
	var targetPath=path.jon(targetFolder,fileName);
	
	var cmd='fswebcam -d /dev/video0 -r 800x600 "'+targetPath+'"';
	
	console.info('now:['+curDateTime+']¥t¥t¥tcapture command:'+cmd);
	
	// executes `cmd`
	var child = exec(cmd, function (error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		sys.print('stderr: ' + stderr);
		if (error !== null) {
			console.info('exec error: ' + error);
		}
	});
};

