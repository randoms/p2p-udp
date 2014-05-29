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

function route(context){
  var message = context.message;
  
  if(message.type = "REQUEST"){
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