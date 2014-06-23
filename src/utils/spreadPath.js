var mConsole = require("./mConsole.js");

function push(path,ID){
    var pathList = JSON.parse(path);
    var count = path.length;
    for(i=0;i<count;i++){
        if(pathList[i] == ID){
            mConsole.print("ID already in PathList!");
            return JSON.stringify(pathList);
        }
    }
    pathList.push(ID);
    return JSON.stringify(pathList);
}

module.exports.push = push;