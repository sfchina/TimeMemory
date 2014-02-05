/*!
 * TimeMemory
 * Copyright(c) 2014 Sfchina <sfchina@sina.com>
 * MIT Licensed
 */
var express=require('express');
var router=require('./router');
var app=express();
var conf=require('./conf');

var timelapseLg=require('./lib/logic/timelapseLg');

global.conf=conf.conf;

app.set('port', process.env.PORT || 5050);

app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
});
app.use(express.favicon());
app.use(express.static(__dirname + '/public'));
app.use(express.logger());
 
app.get('/serv/:serv?',router.serv);

app.listen(app.get('port'),function(){
  console.log('Time Memory server listening on port '+app.get('port'));
  timelapseLg.executes(global.conf.interval);
});