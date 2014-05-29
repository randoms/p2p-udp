function push(path,ID){
  var pathList = JSON.parse(path);
  var count = path.length;
  for(i=0;i<count;i++){
    if(pathList[i] == ID){
      throw "ID already in PathList!";
    }
  }
  pathList.push(ID);
  return JSON.stringify(pathList);
}

module.exports.push = push;