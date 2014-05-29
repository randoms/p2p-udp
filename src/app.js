var port = 9999;
var serverPort = require("./settings/config.js").SERVER_PORT;
var serverIp = require("./settings/config.js").SERVER_IP;
var route = require("./controls/route.js");
var middleware = require("./controls/middleware.js");
var dataBaseCtrl = require("./utils/loadDB.js");
var IDUtils = require("./utils/IDUtils.js");
var raw_intput = require("./utils/raw_input.js");
var commandRoute = require("./utils/controls/route.js");
var mConsole = require("./utils/mConsole.js");

var handShake = require("./controls/handShake.js");

var dgram = require("dgram");
var dataBase = {};

//loadDB
dataBaseCtrl.loadDB(function(mDataBase){
  dataBase = mDataBase;
  dataBase.clientList = [];
  var context = {
    dataBase:dataBase,
    
  }
  startApp(context,function(){
    //process console commad
    raw_intput("> ",function(cmd){
      commandRoute(context,cmd);
    },"");
  });
})

function startApp(context,callBack){
  // init
  var client = dgram.createSocket("udp4")
  client.on("message",function(message,rinfo){
      mConsole.print("Message Received:"+ message);
      //message processed by middleware
      var context = middleware(message,rinfo,client,dataBase);
      route(context);
  })

  client.on("listening",function(){
      var address = client.address();
      mConsole.print("Server listening:"+address.address+":"+address.port);
      callBack();
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
  // connect to server
  context.client = client;
  handShake.request(context,serverIp,serverPort)
}





