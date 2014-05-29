//load files and return them
var fs = require('fs');
var join = require('path').join

module.exports = function(path,cb){
//check file exist
    fs.stat(path,function(err,stat){
	if(err){
	  cb(err);
	}
	try{
	  stat.isFile();
	}catch(e){
	  console.log("ERROR File Not Found:"+path);
	}
	if(stat.isFile()){
	    //the file and return file content
	    fs.readFile(path,'utf8',function(err,data){
		cb(data);
	    })
	}else{
	    fs.readdir(path,function(err,fileList){
		var ResList = [];
		for(var file in fileList){
		    (function(){
			var filename = join(path,fileList[file]);
			fs.readFile(filename,'utf8',function(err,data){
			    var fileInfo = {};
			    fileInfo['filename'] = filename;
			    fileInfo['content'] = data;
			    ResList.push(fileInfo);
			    if(ResList.length == fileList.length){
				cb(ResList);
			    }
			})
		    })(file)
		}
	    })
	}
    })
//if file is a dir return all the files in the dir
}