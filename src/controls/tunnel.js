/**
 * @function
 * try to create a direct UDP connect to target
 */

var handShake = require("./handShake");
var clientInfoM = require("../models/clientInfo.js");
var mConsole = require("../utils/mConsole.js");
var remoteInfo = require("./remoteInfo.js");
var pathUtils = require("../utils/spreadPath.js");
var IDUtils = require("../utils/IDUtils.js");

function request(){
  
}

function response(){
  
}

function command(context,cmd){
  //check local
  var cmdList = cmd.split(' ');
  var ID = cmdList[1];
  var info = clientInfoM.find(context,ID);
  if(info){
    // find local record
    mConsole.print("TUNNEL:SUCCESS");
    var vaildPath = pathUtils.push(JSON.stringify([IDUtils.getID(context)]),ID); //save path to dataBase
    context.dataBase.temp.path = vaildPath;
    return;
  }
  //check remote
  var count = context.dataBase.clientList.length;
  if(count == 0)mConsole.print("TUNNEL:NOT_FOUND");
  for(var i=0;i<count;i++){
    remoteInfo.request(context,context.dataBase.clientList[i]['ID'],ID,function(context){
      if(context.message.status == "NOT_FOUND"){
	mConsole.print("TUNNEL:NOT_FOUND");
      }
      if(context.message.status == "OK"){
	mConsole.print("TUNNEL:VAILDPATH_FOUND");
	// target info found 
	// ask remote to send handShake package
	var vaildPath = pathUtils.push(context.message.path,ID);
	context.dataBase.temp.path = vaildPath;// save vaildPath to dataBase
      }
    });
  }
  
  //wait response
  //send handShake package
}


module.exports.cmd = command;