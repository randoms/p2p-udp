var IDUtils = require("../utils/IDUtils.js");
var pathUtils = require("../utils/spreadPath.js");
var mConsole = require("../utils/mConsole.js");
var clientInfoM = require("../models/clientInfo.js");

function response(context){
  // add remote client to client list
  var clientInfo = {
    ID:context.remoteInfo.ID,
    info:context.remoteInfo.info,
  }
  clientInfoM.add(context,clientInfo);
  var res = {
    type:"RESPONSE",
    status:"OK",
    fromID:IDUtils.getID(context),
    toID:clientInfo.ID,
    content:"",
    command:"HAND_SHAKE",
    path:pathUtils.push(context.message.path,IDUtils.getID(context)),
    callBack:context.message.callBack,
  }
  mConsole.print(JSON.stringify(clientInfo));
  context.client.sendMessage(res,clientInfo);
}

function success(context){
  // add remote server to client list
  var clientInfo = {
    ID:context.remoteInfo.ID,
    info:context.remoteInfo.info,
  }
  
  clientInfoM.add(context,clientInfo);
  mConsole.print("HAND_SHAKE:SUCCCESS");
}

function request(context,ip,port,callBack){
  var req = {
    type:"REQUEST",
    status:"OK",
    fromID:IDUtils.getID(context),
    toID:"",
    content:"",
    command:"HAND_SHAKE",
    path:JSON.stringify([IDUtils.getID(context)]),
  }
  var clientInfo = {
    ID:"",
    info:{
      address:ip,
      port:port,
      family:"ipv4",
      size:0,
    }
  }
  context.client.sendMessage(req,clientInfo,callBack);
  return mConsole.print("HAND_SHAKE:SEND");
}

function command(context,cmd){
  var cmdList = cmd.split(' ');
  var ip = cmdList[1];
  var port = parseInt(cmdList[2]);
  request(context,ip,port);
}


module.exports.response = response;
module.exports.success = success;
module.exports.request = request;
module.exports.cmd = command;