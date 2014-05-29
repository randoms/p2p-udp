var handShake = require("../../controls/handShake.js");

function handShakeCmd(context,cmd){
  var cmdList = cmd.split(' ');
  var ip = cmdList[1];
  var port = parseInt(cmdList[2]);
  handShake.request(context,ip,port);
}

module.exports = handShakeCmd;