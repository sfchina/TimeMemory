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
			var realPath=path.join(params.dir,result.data.img_pt);
			fs.readFile(realPath,function(err,imgData){
				
				if(err){
					console.debug(err);
					result.rc=consts.status.rc_ng;
					result.rm="can't read file data:"+err;
					res.send(500,'exec error: '+result.rm);
				}else{
					console.info(result.data.img_pt);
					console.info(imgData);
				    var base64Image=imgData.toString('base64');
				    result.data.img=base64Image;
				    res.send(200,JSON.stringify(result));
				}
			});
		}
	});
	
};

exports.executes=executes;


