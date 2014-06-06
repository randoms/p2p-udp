var handShake = require("./handShake.js")

function keepAlive(context){
  var clientList = context.dataBase.clientList;
  // send handShake package every 10s
  setInterval(function(){
    clientList.forEach(function(clientInfo){
      handShake.request(context,clientInfo.info.address,clientInfo.info.port);
    })
  },20000);
}

module.exports = keepAlive;