var port = 8888
var dgram = require("dgram");
var server = dgram.createSocket("udp4")
var dataBase = {};
dataBase.clientList = [];

server.on("message",function(message,rinfo){
	console.log("Message Received:"+ message);
	console.log(rinfo);
	message = message.toString();
	var req = JSON.parse(message);
	var clientInfo = {
		id:req.id,
		info:rinfo,
	}
	if(req.command == "HandShake"){
		dataBase.clientList.push(clientInfo);
		var cmd = {
			status:"OK",
		}
		sendClient(JSON.stringify(cmd),clientInfo);
	}
	if(req.command == "GetRemoteInfo"){
		var count = dataBase.clientList.length;
		var res = null;
		// 在数据库中查找远程地址和端口
		for(i=0;i<count;i++){
			if(dataBase.clientList[i].id == req.remoteId){
				res = dataBase.clientList[i];
			}
		}
		if(res){
			var cmd = {
				status:"notFound",
			}
		}else{
			var cmd = {
				status:"OK",
				remoteInfo:res,
			}
		}
		sendClient(JSON.stringify(cmd),clientInfo);
	}
})

server.on("listening",function(){
	var address = server.address();
	console.log("Server listening:"+address.address+":"+address.port);
})

server.bind(port);

function sendClient(cmd,clientInfo){
	var address = clientInfo.info.address;
	var port = clientInfo.info.port;
	var message = new Buffer(cmd);
	server.send(message,0,message.length,port,address,function(err,bytes){
		if(err){
			console.log(err);
		}
	});
}