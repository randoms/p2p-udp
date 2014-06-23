/** 
 *@parms
 * hint: input hint
 * callback: call when input complete
 * defaultVal: set this val if no input
 * type: input parm type
 * */

function raw_input(hint,callback,defaultVal,type){
    process.stdout.write("\n");
    process.stdout.write(hint);
    
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on("data",function(val){
        val = val.substring(0,val.length-1);// remove the enter character
        if(val.length != 0){
            /**
             * @todo check formate
             */
            callback(val);
        }else{
            callback(defaultVal);
        }
    })
}

module.exports = raw_input;