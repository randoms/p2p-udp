/**
 * @function
 * try to create a direct UDP connect to target
 */

var handShake = require("./handShake");
var clientInfoM = require("../models/clientInfo.js");
var mConsole = require("../utils/mConsole.js");
var remoteInfo = require("./remoteInfo.js");


function request(){
  
}

function response(){
  
}

function command(context,cmd){
  //check local
  var cmdList = cmd.split(' ');
  var ID = cmdList[1];
  var info = clientInfoM.find(context,ID);
  if(info){
    // find local record
    mConsole.print("TUNNEL:SUCCESS");
    return;
  }
  //check remote
  var count = context.dataBase.clientList.length;
  for(var i=0;i<count;i++){
    remoteInfo.request(context,context.dataBase.clientList[i]['ID'],ID,function(context){
      mConsole.print("TEST CALLBACK");
    });
  }
  //ask remote to send handShake package
  //wait response
  //send handShake package
}


module.exports.cmd = command;