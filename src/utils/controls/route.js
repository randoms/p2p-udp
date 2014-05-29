var setPort = require("./setPort.js");
var handShake = require("./handShake.js");
var mConsole = require("../mConsole.js");

function route(context,cmd){
  var cmdList = cmd.split(' ');
  if(cmdList[0] == "port"){
    setPort(context,parseInt(cmdList[1]));
  }
  else if(cmdList[0] == "handShake"){
    handShake(context,cmd);
  }else{
    mConsole.print("command not found");
  }
}

module.exports = route;