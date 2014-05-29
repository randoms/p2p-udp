var IDUtils = require("../utils/IDUtils.js");
var pathUtils = require("../utils/spreadPath.js");
var mConsole = require("../utils/mConsole.js");

function response(context){
  // add remote client to client list
  var clientInfo = {
    ID:context.remoteInfo.ID,
    info:context.remoteInfo.info,
  }
  context.dataBase.clientList.push(clientInfo);
  var res = {
    type:"RESPONSE",
    status:"OK",
    fromID:IDUtils.getID(context),
    toID:clientInfo.ID,
    content:"",
    command:"HAND_SHAKE",
    path:pathUtils.push(context.message.path,IDUtils.getID(context)),
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
  context.dataBase.clientList.push(clientInfo);
  mConsole.print("HAND_SHAKE:SUCCCESS");
}

function request(context,ip,port){
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
  context.client.sendMessage(req,clientInfo);
}

module.exports.response = response;
module.exports.success = success;
module.exports.request = request;