//用户输入端口号
var command = "portNum";
var port = 9999;
var remotePort = 0;
var ip = "";
var remoteId = "";
var id = "";

var ServerIP = "127.0.0.1";
var ServerPort = 8888;

//初始化UDP
var dgram = require("dgram");
var client = dgram.createSocket("udp4")


client.on("listening",function(){
 	var address = client.address();
	console.log("Server listening:"+address.address+":"+address.port);
})


process.stdout.write("Local Port(default 9999):");
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(val){
	var re = /[1]/g; // 这里正则表达式不好使
	val = val.substring(0,val.length-1);
	if(command == "portNum"){
		port = parseInt(val);
		command = "LocalID";
		process.stdout.write("Your ID:");
		return;
	}
	if(command == "LocalID"){
		id = val;
		process.stdout.write("Remote ID:")
		command = "RemoteID";
		return;
	}
	
	if(command == "RemoteID"){
		remoteId = val;
		client.bind(port);
		sayHelloToServer(id);
		console.log("connecting to server...");
		command = "command";
	}
	
	if(command == "command"){
		if(val == "quit")process.exit();
		if(val == "getRemoteInfo")getRemoteInfo(remoteId);
	}
}).resume();

//向服务器发送握手包
function sayHelloToServer(id){
	var cmd = {
		command:"HandShake",
		id:id,
	}
	sendToServer(JSON.stringify(cmd),function(res){
		console.log(res);
	})
}

//获取远程信息
function getRemoteInfo(remoteId){
	var cmd = {
		command:"GetRemoteInfo",
		id:id,
		remoteId:remoteId,
	}
	sendToServer(JSON.stringify(cmd),function(res){
		console.log(res);
	})
}


function sendToServer(cmd,callback){
	var message = new Buffer(cmd);
	client.send(message,0,message.length,ServerPort,ServerIP,function(err,bytes){
		if(err){
			callback(err);
		}else{
			console.log("Send:"+cmd);
		}
	})
	
	client.on("message",function(message,rinfo){
		var data = JSON.parse(message);
		callback(data);
	})
}
