/*!
 * TimeMemory
 * Copyright(c) 2014 Sfchina <sfchina@sina.com>
 * MIT Licensed
 */
var express=require('express');
var app=express();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(5050);