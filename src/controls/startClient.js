var serverPort = require("../settings/config.js").SERVER_PORT;
var serverIp = require("../settings/config.js").SERVER_IP;
var route = require("./route.js");
var middleware = require("./middleware.js");
var IDUtils = require("../utils/IDUtils.js");
var mConsole = require("../utils/mConsole.js");
var handShake = require("./handShake.js");
var dgram = require("dgram");
var callBackM = require("../models/callBack.js");
var keepAlive = require("./keepAlive.js");

function startApp(initContext,port,callBack){
  // init
  if(initContext.client){
    initContext.client.close();
  }
  var client = dgram.createSocket("udp4")
  client.on("message",function(message,rinfo){
      //mConsole.print("Message Received:"+ message);
      //message processed by middleware
      var context = middleware(message,rinfo,client,initContext.dataBase);
      // IOC
      context.route = route;
      //check callBack
      if(context.message.callBack && context.message.type == "RESPONSE" 
        && context.message.toID == IDUtils.getID(context)){
        var cb = callBackM.find(context,context.message.callBack);
        cb(context);
        //remove callBack
        callBackM.del(context,context.message.callBack);
        return;
      }
      route.net(context);
  })

  client.on("listening",function(){
      var address = client.address();
      mConsole.print("Server listening:"+address.address+":"+address.port);
      initContext.dataBase.callBackList = [];
      var context = {
        dataBase:initContext.dataBase,
        client:client,
      };
      // connect to server
      mConsole.print("INIT:CONNECTING");
      handShake.request(context,serverIp,serverPort,function(mcontext){
        if(mcontext.message.status == "OK"){
          mConsole.print("INIT:CONNECTED");
        }else{
          mConsole.print("INIT:CONNECT_TIMEOUT");
        }
      });
      keepAlive(context);
      callBack(context);
  })
  
  client.sendMessage = function(cmd,clientInfo,mCB){
      var address = clientInfo.info.address;
      var port = clientInfo.info.port;
      var context = {
        dataBase:initContext.dataBase,
      };
      cmd.senderID = IDUtils.getID(context);
      if(mCB){
        var callBackID = callBackM.add(context,mCB);
        cmd.callBack = callBackID;
        //add timeout
        setTimeout(function(){
          var callBackID = cmd.callBack;
          var timeoutCallBack = callBackM.find(context,callBackID);
          if(timeoutCallBack){
            //callBack not called yet
            callBackM.del(context,callBackID);
            context.message = {
              status:"TIMEOUT",
            }
            timeoutCallBack(context)
          }
        },5000); // timeout time 5s
      }
      var message = new Buffer(JSON.stringify(cmd));
      client.send(message,0,message.length,port,address,function(err,bytes){
        if(err){
                  console.log(err);
        }
      });
  }
  client.bind(port);
}


module.exports = startApp;