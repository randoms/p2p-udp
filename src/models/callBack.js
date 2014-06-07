function add(context,callBack){
  var callBackList = context.dataBase.callBackList;
  //generate id
  var ID = Date.now()+ parseInt(Math.random()*10000);
  var info = {
    ID:ID,
    callBack:callBack,
  }
  callBackList.push(info);
  return ID;
}

function del(context,ID){
  var callBackList = context.dataBase.callBackList;
  var count = callBackList.length;
  var index = null;
  for(var i = 0;i<count;i++){
    if(callBackList[i]['ID'] == ID){
      index = i;
    }
  }
  if(index != null){
    callBackList.splice(index,1);
  }
}

function find(context,ID){
  var callBackList = context.dataBase.callBackList;
  var count = callBackList.length;
  for(var i = 0;i<count;i++){
    if(callBackList[i]['ID'] == ID){
      return callBackList[i]['callBack'];
    }
  }
  return null;
}

module.exports.add = add;
module.exports.del = del;
module.exports.find = find;