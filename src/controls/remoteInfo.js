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
	status:
	fromID:
	toID:
	content:
	command:
	path:
      }
    }else{
      var cmd = {
	status:"OK",
	remoteInfo:info,
      }
    }
    sendClient(JSON.stringify(cmd),clientInfo);
}


function success(context){
  
}

function request(){
  
}

module.exports.response = response;
module.exports.success = success;
module.exports.request = request;