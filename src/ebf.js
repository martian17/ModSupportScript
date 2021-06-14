var bf = require("./bf.js");
var fs = require("fs");


var args = process.argv.slice(2);

var flags = {};
var file = false;
for(var i = 0; i < args.length; i++){
    var arg = args[i].trim();
    if(arg[0] === "-"){
        for(var j = 0; j < arg.length; j++){
            flags[arg[j]] = true;
        }
    }else{
        file = arg;
    }
}

if("e" in flags){
    //execute directly
    bf(file);
}else if(file){
    //execute from file
    fs.readFile(file, 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        bf(data);
    });
}else{
    //execute from stdin
    fs.readFile("/dev/stdin", 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        bf(data);
    });
}