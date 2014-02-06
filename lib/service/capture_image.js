var fs=require('fs');
var path=require('path');
var captureLg=require('../logic/captureLg');

var executes=function(req,res,next){
	var params={'dir':'public/temp'};
	captureLg.captureImage(params,function(result){
		if (result.rc!=consts.status.rc_ok){
			console.info('exec error: '+result.rm);
			res.send(500,'exec error: '+result.rm);
		}else{
			fs.readFile(result.data.img_pt,function(err,imgData){
				if(!err){
					result.rc=consts.status.rc_ng;
					result.rm="can't read file data";
				}else{
				    var base64Image=imgData.toString('base64');
				    result.data.img=base64Image;
				}
			    res.send(200,JSON.stringify(result));
			});
		}
	});
	
};

exports.executes=executes;


