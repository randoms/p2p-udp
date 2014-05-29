var mConsole = require("../utils/mConsole.js");

/**
 * @function
 * message not send to me. pass this message according to path
 */
var IDUtils = require("../utils/IDUtils.js");

function pass(context){
  var pathList = JSON.parse(context.message.path);
  // find my position
  var count = pathList.length;
  var targetId = "";
  for(i=0;i<count;i++){
    if(pathList[i] == IDUtils.getID(context) && i != 0){
      targetId = pathList[i-1];
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
  var count =context.dataBase.clientList.length;
  var info = null;
  for(i=0;i<count;i++){
    if(context.dataBase.clientList[i]['id'] == IDUtils.getID(context)){
      info = context.dataBase.clientList[i];
    }
  }
  if(!info){
    // record found
    context.client.sendMessage(context.message,info);
  }else{
    // record not found
    mConsole.print("Bad package!!!");
  }
}

module.exports = pass;