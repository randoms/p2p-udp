
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
      fromID:"",
      toId:"",
      command:"ERROR",
      content:{
	type:"message formate error",
	rinfo:rinfo,
	message:message,
      }
    }
    console.log(JSON.stringify(data));
  }
  var context = {
    remoteInfo:{
      ID:data.fromID,
      info:rinfo,
    },
    message:data,
    client:client,
    dataBase:dataBase,
  }
  return context;
}


module.exports = middleware;