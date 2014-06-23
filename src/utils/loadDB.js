var loadFiles = require("./loadFiles");
var fs = require("fs");
var path = __dirname+"/../models/db";

function loadDB(callback){
    loadFiles(path,function(data){
        var mDB = {};
        try{
            mDB = JSON.parse(data);
        }catch(e){
            //dataBase error
            console.log("DataBase Error, Reset DataBase");
            data = {};
            saveDB(data);
        }
        callback(mDB);
    })
}

function saveDB(data){
    console.log("Saving DB:"+JSON.stringify(data));
    fs.writeFile(path,JSON.stringify(data),function(err){
        if(err)console.log(err);
    });
}

module.exports.loadDB = loadDB;
module.exports.saveDB = saveDB;