
function print(res){
  process.stdout.write(res+'\n> ');
  return res;
}

module.exports.print = print;