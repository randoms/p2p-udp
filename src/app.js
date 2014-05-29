var port = require("./settings/config.js").SERVER_PORT;
var serverIp = require("./settings/config.js").SERVER_IP;
var route = require("./controls/route.js");
var middleware = require("./controls/middleware.js");
var dataBaseCtrl = require("./utils/loadDB.js");
var IDUtils = require("./utils/IDUtils.js");

var handShake = require("./controls/handShake.js");

var dgram = require("dgram");
var client = dgram.createSocket("udp4")
var dataBase = {};

//loadDB
dataBaseCtrl.loadDB(function(mDataBase){
  dataBase = mDataBase;
  dataBase.clientList = [];
  var context = {
    dataBase:dataBase,
    
  }
  startApp();
})

function startApp(){
  // init
  client.on("message",function(message,rinfo){
      console.log("Message Received:"+ message);
      console.log("targetInfo:"+rinfo);
      //message processed by middleware
      var context = middleware(message,rinfo,client,dataBase);
      route(context);
  })

  client.on("listening",function(){
      var address = client.address();
      console.log("Server listening:"+address.address+":"+address.port);
  })
  
  client.sendMessage = function(cmd,clientInfo){
      var address = clientInfo.info.address;
      var port = clientInfo.info.port;
      var message = new Buffer(cmd);
      client.send(message,0,message.length,port,address,function(err,bytes){
          if(err){
              console.log(err);
          }
      });
  }
  
  client.bind(port);
  // connect to server
  handShake(serverIp)
}





