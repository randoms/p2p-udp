var handShake = require("./handShake.js");
var dgram = require("dgram");
var mConsole = require("../utils/mConsole.js");
var startApp = require("./startClient.js");


function setPort(context,port){
    startApp(context,port,function(){
        //update change to neighbours
        var count = context.dataBase.clientList.length;
        for(i=0;i<count;i++){
            var info = context.dataBase.clientList[i]['info'];
            handShake.request(context,info.address,info.port);
        }
    });
    
}

module.exports = setPort;