var IDUtils = require("../utils/IDUtils.js");
var pathUtils = require("../utils/spreadPath.js");

function response(context){
  // add remote client to client list
  var clientInfo = {
    ID:context.remoteInfo.id,
    info:context.remoteInfo.info,
  }
  context.dataBase.clientList.push(clientInfo);
  var res = {
    type:"RESPONSE"
    status:"OK",
    fromID:IDUtils.getID(context);
    toID:clientInfo.ID,
    content:"",
    command:"HAND_SHAKE",
    path:pathUtils.push(context.message.path,IDUtils.getID(context));
  }
  context.client.sendClient(res,clientInfo);
}

function success(context){
  // add remote server to client list
  var clientInfo = {
    ID:context.remoteInfo.id,
    info:context.remoteInfo.info,
  }
  context.dataBase.clientList.push(clientInfo);
  console.log("HAND_SHAKE:SUCCCESS");
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
  context.client.sendClient(req,clientInfo);
}

module.exports.response = response;
module.exports.success = success;
module.exports.request = request;