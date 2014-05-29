var mConsole = require("../utils/mConsole.js");

/**
 * @function: bind all necessary data to a context
 */
function middleware(message,rinfo,client,dataBase){
  message = message.toString();
  var data = "";
  try{
    data = JSON.parse(message);
  }catch(e){
    //message formate error
    data = {
      type:"SYSTEM",
      status:"ERROR",
      fromId:"",
      toId:"",
      command:"ERROR",
      content:{
	type:"message formate error",
	rinfo:rinfo,
	message:message,
      }
    }
    mConsole(data);
  }
  var context = {
    remoteInfo:{
      id:req.formId,
      info:rinfo,
    },
    message:JSON.parse,
    client:client,
    dataBase:dataBase,
  }
  return context;
}


module.exports = middleware;