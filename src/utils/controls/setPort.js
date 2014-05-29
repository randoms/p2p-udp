var handShake = require("../../controls/handShake.js");
var dgram = require("dgram");
var mConsole = require("../mConsole.js");
var middleware = require("../../controls/middleware");
var routes = require("../../controls/route.js");

//restart a UDP socket
function startApp(oldContext,port){
  // init
  var client = dgram.createSocket("udp4")
  client.on("message",function(message,rinfo){
      mConsole.print("Message Received:"+ message);
      //message processed by middleware
      var context = middleware(message,rinfo,client,oldContext.dataBase);
      // strange I can not import cmd route here
      // loop import !!!
      routes(context);
  })

  client.on("listening",function(){
      var address = client.address();
      mConsole.print("Server listening:"+address.address+":"+address.port);
  })
  
  client.sendMessage = function(cmd,clientInfo){
      var address = clientInfo.info.address;
      var port = clientInfo.info.port;
      var message = new Buffer(JSON.stringify(cmd));
      client.send(message,0,message.length,port,address,function(err,bytes){
          if(err){
              console.log(err);
          }
      });
  }
  
  client.bind(port);
  oldContext.client = client;
}

function setPort(context,port){
  //set local port command
  context.client.close();
  startApp(context,port);
  //update change to neighbours
  var count = context.dataBase.clientList.length;
  for(i=0;i<count;i++){
    var info = context.dataBase.clientList[i]['info'];
    handShake.request(context,info.address,info.port);
  }
}

module.exports = setPort;