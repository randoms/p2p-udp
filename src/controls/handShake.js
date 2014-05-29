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
  context.client.sendClient(JSON.stringify(res),clientInfo);
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