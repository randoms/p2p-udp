var IDUtils = require("../utils/IDUtils.js");
var pathUtils = require("../utils/spreadPath.js");
var clientInfoM = require("../models/clientInfo.js");
var mConsole = require("../utils/mConsole.js");

function response(context){
    var count = context.dataBase.clientList.length;
    var remoteID = context.message.content.remoteID;
    // 在数据库中查找远程地址和端口
    var info = clientInfoM.find(context,remoteID);
    if(info){
      var res = {
	type:"RESPONSE",
	status:"OK",
	fromID:IDUtils.getID(context),
	toID:context.message.fromID,
	content:info,
	command:"GET_REMOTE_INFO",
	path:pathUtils.push(context.message.path,IDUtils.getID(context)),
	callBack:context.message.callBack,
      }
    }else{
      /**
       * @todo send query request to other servers
       */
      mConsole.print("GET_REMOTE_INFO:NOT_FOUND");
      return;
    }
    var clientInfo = clientInfoM.find(context,context.message.fromID);
    context.client.sendMessage(res,clientInfo);
}


function success(context){
  mConsole.print("GET_REMOTE_INFO:SUCCESS\n"+JSON.stringify(context.message.content));
}

function request(context,ID,queryID,callBack){
  var req = {
    type:"REQUEST",
    status:"OK",
    fromID:IDUtils.getID(context),
    toID:ID,
    content:{
      remoteID:queryID,
    },
    command:"GET_REMOTE_INFO",
    path:JSON.stringify([IDUtils.getID(context)]),
  }
  
  var clientInfo = clientInfoM.find(context,ID);
  if(clientInfo){
    mConsole.print(JSON.stringify(clientInfo));
    context.client.sendMessage(req,clientInfo,callBack);
  }else{
    mConsole.print("GET_REMOTE_INFO:INVAILD_QUERY_TARGET");
  }
}

function command(context,cmd){
  var cmdList = cmd.split(' ');
  var ID = cmdList[1];
  // check local dataBase
  var info = clientInfoM.find(context,ID);
  mConsole.print("GET_REMOTE_INFO:QUERYING");
  if(!info){
    // check remote dataBase
    var clientList = context.dataBase.clientList;
    var count = clientList.length;
    for(var i=0;i<count;i++){
      request(context,clientList[i]['ID'],ID);
    }
  }else{
    // find record in local dataBase
    mConsole.print("GET_REMOTE_INFO:"+JSON.stringify(info));
  }
}

module.exports.response = response;
module.exports.success = success;
module.exports.request = request;
module.exports.cmd = command;