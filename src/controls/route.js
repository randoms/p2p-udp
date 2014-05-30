/**
 * @parms
 *context = {
 *	remoteInfo:{
 *	id:req.formId,
 *	info:rinfo,
 *     },
 *   message:JSON.parse,
 *   client:client,
 * }
 * message:{
 * 	fromId
 * 	toId
 * 	type
 * 	status
 * 	command
 * 	content
 * 	path
 * }
 */

var handShake = require("./handShake.js");
var remoteInfo = require("./remoteInfo.js");
var IDUtils = require("../utils/IDUtils.js");
var pass = require("./passMessage.js");
var setPort = require("./setPort.js");
var mConsole = require("../utils/mConsole.js");
var tunnel = require("./tunnel.js");

function route(context){
  var message = context.message;
  if(message.toID != IDUtils.getID(context) && message.toID != ""){
    //message not send to me
    pass(context);
    return;
  }
  if(message.type == "REQUEST"){
    if(message.command == "HAND_SHAKE"){
      handShake.response(context);
    }
    if(message.command =="GET_REMOTE_INFO"){
      remoteInfo.response(context);
    }
  }
  if(message.type = "RESPONSE"){
    if(message.command == "HAND_SHAKE"){
      handShake.success(context);
    }
    if(message.command == "GET_REMOTE_INFO"){
      remoteInfo.success(context);
    }
  }
}

function routeCmd(context,cmd){
  var cmdList = cmd.split(' ');
  if(cmdList[0] == "port"){
    setPort(context,parseInt(cmdList[1]));
  }
  else if(cmdList[0] == "handShake"){
    handShake.cmd(context,cmd);
  }else if(cmdList[0] == "remoteInfo"){
    remoteInfo.cmd(context,cmd);
  }else if(cmdList[0] == "db"){
    //list dataBase
    mConsole.print(JSON.stringify(context.dataBase));
  }else if(cmdList[0] == "tunnel"){
    tunnel.cmd(context,cmd);
  }else if(cmdList[0] == "quit"){
    process.exit();
  }else{
    mConsole.print("command not found");
  }
}

module.exports.net = route;
module.exports.cmd = routeCmd;
