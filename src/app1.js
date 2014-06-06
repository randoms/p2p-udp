var dataBaseCtrl = require("./utils/loadDB.js");
var raw_intput = require("./utils/raw_input.js");
var route = require("./controls/route.js");
var startApp = require("./controls/startClient.js");
var dataBase = {};

//loadDB
dataBaseCtrl.loadDB(function(mDataBase){
  dataBase = mDataBase;
  dataBase.clientList = [];
  var context = {
    dataBase:dataBase,
    
  }
  startApp(context,9999,function(){
    //process console commad
    raw_intput("> ",function(cmd){
      route.cmd(context,cmd);
    },"");
  });
})

