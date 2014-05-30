var IDUtils = require("../utils/IDUtils.js");
var clientInfoM = require("../models/clientInfo.js");
var mConsole = require("../utils/mConsole.js");

/**
 * received remote request to do something
 */
function response(context){
  
}

/**
 * path is the path get from tunnel
 * how to reach the remote target
 */
function request(context,path,cmd,callBack){
  var pathList = JSON.parse(path);
  var req = {
    type:"REQUEST",
    status:"OK",
    fromID:pathList[0],
    toID:pathList[pathList.length-1],//last ID is the target ID
    command:"REMOTE",
    content:cmd,
    path:JSON.stringify([pathList[0]]),
    callBack:callBack,
  }
  var clientInfo = clientInfoM.find(context,pathList[1]);
  context.client.sendMessage(req,clientInfo,callBack);
  mConsole.print("REMOTE:SEND");
}

function command(context,cmd){
  var cmdList = cmd.split(' ');
  cmdList.splice(0,1); //remote REMOTE cmd
  if(!context.dataBase.temp.path){
    mConsole.print("REMOTE:PLEASE RUN tunnel FIRST");
    return;
  }
  request(context,context.dataBase.temp.path,cmdList);
}


module.exports.cmd = command;
module.exports.request = request;
module.exports.response = response;