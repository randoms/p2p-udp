function find(context,ID){
  var clientList = context.dataBase.clientList;
  var count = clientList.length;
  var info = null;
  for(i=0;i<count;i++){
    if(clientList[i].ID == ID){
      info = clientList[i];
    }
  }
  return info;
}

function del(context,ID){
  
}

function add(context,info){
  // if ID already in clientList update info
  var mInfo = find(context,info.ID);
  if(!mInfo){
    context.dataBase.clientList.push(info);
  }else{
    mInfo.ID = info.ID;
    mInfo.info = info.info;
  }
  
}

module.exports.find = find;
module.exports.del = del;
module.exports.add = add;