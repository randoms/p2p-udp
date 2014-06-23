var IDUtils = require("../utils/IDUtils.js");
var mConsole = require("../utils/mConsole.js");

function find(context,ID){
    var clientList = context.dataBase.clientList;
    var count = clientList.length;
    var info = null;
    for(var i=0;i<count;i++){
        if(clientList[i].ID == ID){
            info = clientList[i];
        }
    }
    return info;
}

function del(context,ID){
    var clientList = context.dataBase.clientList;
    var count = clientList.length;
    var target = null;
    for(var i=0;i<count;i++){
        if(clientList[i].ID == ID){
            target = i;
        }
    }
    clientList.splice(target,1);
    return;
}

function add(context,info){
    // if ID already in clientList update info
    if(info.ID == IDUtils.getID(context)){
        return;
    }
    var mInfo = find(context,info.ID);
    if(!mInfo){
        context.dataBase.clientList.push(info);
    }else{
        if(info.ID == null || info.info == null){
            mConsole.log("ERROR:INVAILD_CLIENTINFO");
        }
        mInfo.ID = info.ID;
        mInfo.info = info.info;
    }
    
}

module.exports.find = find;
module.exports.del = del;
module.exports.add = add;