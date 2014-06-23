var handShake = require("./handShake.js")
var clientInfoM = require("../models/clientInfo.js");

function keepAlive(context){
    var clientList = context.dataBase.clientList;
    // send handShake package every 10s
    setInterval(function(){
        var originList = [];
        clientList.forEach(function(clientInfo){
            originList.push(clientInfo);
        });
        for(var i = 0;i<originList.length;i++){
            var clientInfo = originList[i];
            var targetInfo = clientInfoM.find(context,clientInfo.ID); // find target in dataBase
            if(!targetInfo)continue; // already deleted
            handShake.request(context,clientInfo.info.address,clientInfo.info.port,function(mcontext){
                if(mcontext.message.status == "OK"){
                    targetInfo.status = "ONLINE";
                    targetInfo.offlineCount = 0;
                }else{
                    targetInfo.status = "OFFLINE";
                    targetInfo.offlineCount += 1;
                    if(targetInfo.offlineCount >5){
                        // target is unreachable, delete from dataBase
                        clientInfoM.del(context,targetInfo.ID);
                    }
                }
            });
        }
    },10000);
}

module.exports = keepAlive;