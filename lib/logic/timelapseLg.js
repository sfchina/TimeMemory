var fs = require('fs');
var path = require('path');
var captureLg=require('../logic/captureLg');

var executes=function(interval){
	var minite=60*1000;
	var houre=minite*60;
	var day=houre*24;
	var week=day*7;
	 
	var params={'dir':'public/target'};
	var inID=setInterval(function(){
		captureLg.captureImage(params,function(result){
			if (result.rc!=consts.status.rc_ok) {
				console.info('exec error: '+result.rm);
			}else{
				console.info('captured new image: '+result.data.img_pt);
				appendResult(result.data.img_pt);
			}
		});
	},interval);
	
	return inID;
};

var appendResult=function(imgPath){
	var targetFolder=path.join(global.conf.baseDir,'public/target');
	var resultFile=path.join(targetFolder,'captured.json');
	var result=null;
	if(fs.existsSync(resultFile)){
		//read captured result json
		var content=fs.readFileSync(resultFile,'utf-8');
		result=JSON.parse(content);
	}else{
		result={'datas':[]};
	}
	//append a new element
	result.datas.push(imgPath);
	//create captured result json file
	fs.writeFileSync(resultFile,JSON.stringify(result));
};
exports.executes=executes;

