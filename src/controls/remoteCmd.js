var IDUtils = require("../utils/IDUtils.js");
var clientInfoM = require("../models/clientInfo.js");
var mConsole = require("../utils/mConsole.js");

/**
 * received remote request to do something
 */
function response(context){
  // exec remote command
  var consoleRes = context.route.cmd(context,context.message.content);
  var res = {
    type:"RESPONSE",
    status:"OK",
    fromID:IDUtils.getID(context),
    toID:context.message.fromID,
    command:"REMOTE",
    content:consoleRes,
    path:context.message.path,
    callBack:context.message.callBack,
  }
  var pathList = JSON.parse(context.message.path);
  var clientInfo = clientInfoM.find(context,pathList[pathList.length-2]);
  context.client.sendMessage(res,clientInfo);
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
    path:JSON.stringify(pathList),
    callBack:callBack,
  }
  var clientInfo = clientInfoM.find(context,pathList[1]);
  context.client.sendMessage(req,clientInfo,callBack);
  mConsole.print("REMOTE:SEND");
}

function command(context,cmd){
  var cmdList = cmd.split(' ');
  cmdList.splice(0,1); //remote REMOTE cmd
  cmd = cmdList.join(' ');
  if(!context.dataBase.temp.path){
    return mConsole.print("REMOTE:PLEASE RUN tunnel FIRST");
  }
  request(context,context.dataBase.temp.path,cmd,function(context){
    mConsole.print("REMOTE:\n"+context.message.content);
  });
}


module.exports.cmd = command;
module.exports.request = request;
module.exports.response = response;