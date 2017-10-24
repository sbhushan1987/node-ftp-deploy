#! /usr/bin/env node
var NodeFtpDeploy = require('./deploy');

var arg = process.argv;
var host = arg[2];
var username = arg[3];
var password = arg[4];
var localFolder = process.env.PWD + arg[5];
var remoteFolder = arg[6];
// console.log(process.env.PWD + arg[5]);
// console.log(host, username, password, localFolder, remoteFolder);
new NodeFtpDeploy(host, username, password, localFolder, remoteFolder);
