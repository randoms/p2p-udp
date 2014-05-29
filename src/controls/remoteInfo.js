var IDUtils = require("../utils/IDUtils.js");
var pathUtils = require("../utils/spreadPath.js");

function response(context){
    var count = context.dataBase.clientList.length;
    var info = null;
    var remoteId = context.message.content.remoteId;
    // 在数据库中查找远程地址和端口
    for(i=0;i<count;i++){
      if(context.dataBase.clientList[i].id == remoteId){
	info = context.dataBase.clientList[i];
      }
    }
    if(!info){
      var res = {
	type:"RESPONSE",
	status:"OK",
	fromID:IDUtils.getID(context),
	toID:context.message.fromID,
	content:info,
	command:"GET_REMOTE_INFO",
	path:pathUtils.push(context.message.path,IDUtils.getID(context)),
      }
    }else{
      /**
       * @todo send query request to other servers
       */
      console.log("not found");
    }
    sendMessage(cmd,clientInfo);
}


function success(context){
  
}

function request(){
  
}

module.exports.response = response;
module.exports.success = success;
module.exports.request = request;