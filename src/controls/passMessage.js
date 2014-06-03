var mConsole = require("../utils/mConsole.js");
var clientInfoM = require("../models/clientInfo.js");

/**
 * @function
 * message not send to me. pass this message according to path
 */
var IDUtils = require("../utils/IDUtils.js");

function pass(context){
  mConsole.print("PASS MESSAGE");
  var pathList = JSON.parse(context.message.path);
  // find my position
  var count = pathList.length;
  var targetId = "";
  for(i=0;i<count;i++){
    if(pathList[i] == IDUtils.getID(context)){
      if(context.message.type == "REQUEST"){
	targetId = pathList[i+1];
      }
      if(context.message.type == "RESPONSE"){
	targetId = pathList[i-1];
      }
    }
  }
  
  /**
   * @todo find shortcut
   */
  // check vaild
  if(targetId == ""){
    mConsole.print("Bad package!!!");
    return;
  }
  // find target info in local dataBase
  var info = clientInfoM.find(context,targetId);
  if(info){
    // record found
    context.client.sendMessage(context.message,info);
  }else{
    // record not found
    mConsole.print("Bad package!!!");
  }
}

module.exports = pass;