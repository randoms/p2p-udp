function route(req){
  if(req.command = "ERROR"){
    console.log("ERROR !");
    console.log("INFO:"+JSON.stringify(req.content))
  }
  if(req.command = "INPUT"){
    
  }
}

module.exports = route;