var dataBaseCtrl = require("./loadDB.js");
var crypto = require('crypto');

function geneID(){
    var timestamp = new Date().getTime() + "";
    var num = parseInt(10000000000000000000*Math.random()) + "";
    code = timestamp + num;
    return hashEncode(code);
}

function getID(context){
    if(!context.dataBase.clintID){
        //clintID not found in dataBase
        Id = geneID();
        setID(Id,context);
        return Id;
    }else{
        return context.dataBase.clintID;
    }
}

function setID(clintID,context){
    context.dataBase.clintID = clintID;
    dataBaseCtrl.saveDB(context.dataBase);
}

function hashEncode(data){
    data = data + '';
    var hasher=crypto.createHash("md5");
    hasher.update(data);
    var hashmsg=hasher.digest('hex');
    return hashmsg;
}

module.exports.getID = getID;
module.exports.setID = setID;