/**
 * @function
 * try to create a direct UDP connect to target
 */

var handShake = require("./handShake");
var clientInfoM = require("../models/clientInfo.js");
var mConsole = require("../utils/mConsole.js");
var remoteInfo = require("./remoteInfo.js");
var pathUtils = require("../utils/spreadPath.js");
var IDUtils = require("../utils/IDUtils.js");
var remote = require("./remoteCmd.js");

function request(){
    
}

function response(){
    
}

function command(context,cmd){
    //check local
    var cmdList = cmd.split(' ');
    var ID = cmdList[1];
    var info = clientInfoM.find(context,ID);
    if(info){
        // find local record
        mConsole.print("TUNNEL:SUCCESS");
        var vaildPath = pathUtils.push(JSON.stringify([IDUtils.getID(context)]),ID); //save path to dataBase
        context.dataBase.temp.path = vaildPath;
        return;
    }
    //check remote
    var count = context.dataBase.clientList.length;
    if(count == 0)mConsole.print("TUNNEL:NOT_FOUND");
    for(var i=0;i<count;i++){
        remoteInfo.request(context,context.dataBase.clientList[i]['ID'],ID,function(context){
            if(context.message.status == "NOT_FOUND"){
                mConsole.print("TUNNEL:NOT_FOUND");
            }
            if(context.message.status == "OK"){
                mConsole.print("TUNNEL:VAILDPATH_FOUND");
                var vaildPath = pathUtils.push(context.message.path,ID);
                // target info found 
                var targetInfo = context.message.content;
                // get local ip and port
                remoteInfo.request(context,JSON.parse(vaildPath)[1],IDUtils.getID(context),function(resContext){
                    var localInfo = resContext.message.content;
                    // ask remote to send handShake package
                    context.dataBase.temp.path = vaildPath;// save vaildPath to dataBase
                    var cmd = "handShake "+localInfo.info.address+" "+localInfo.info.port;
                    remote.request(context,vaildPath,cmd,function(context){
                        mConsole.print("REMOTE HANDSHAKE SEND!!!");
                        // send handShake to target
                        console.log(context.message);
                        console.log(targetInfo.info.address+':'+targetInfo.info.port);
                        handShake.request(context,targetInfo.info.address,targetInfo.info.port,function(shakeContext){
                            if(shakeContext.message.status == "OK"){
                                mConsole.print("TUNNEL:ESTABLISHED");
                            }else{
                                console.log(shakeContext.message);
                                mConsole.print("TUNNEL:FAILED_TO_CONNECT");
                            }
                        })
                    })
                })
            }
        });
    }
}


module.exports.cmd = command;