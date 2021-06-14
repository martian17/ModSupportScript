var bf = require("./bf.js");
var  fs = require('fs');

var operators = [
    "Hey mod, can you turn up the volume?",
    "Hey mod, can you turn down the volume?",
    "Hey mod, can you give me a rank pleeeeaze?",
    "Hey mod, please ban this guy!",
    "Hey mod, can you please give me the invite link?",
    "Hey mod, did you get my mod application?",
    "Hey mod, I have a new channel request!",
    "Hey mod, can you delete this channel? It's dead!"
];

/*var operators = [
    "can you turn u",//+
    "can you turn d",//-
    "can you g",//>
    "p",//<
    "can you p",//.
    "d",//,
    "I",//[
    "can you d"//]
];*/

var execModSupportScript = function(ms){
    var bfcode = ms.split("Hey mod, ").slice(1).map(a=>{
        a = a.trim();
        var b = "-";
        if(a[0] === "p"){
            b = "<";
        }else if(a[0] === "d"){
            b = ",";
        }else if(a[0] === "I"){
            b = "[";
        }else if(a[8] === "g"){
            b = ">";
        }else if(a[8] === "p"){
            b = ".";
        }else if(a[8] === "d"){
            b = "]";
        }else if(a[13] === "u"){
            b = "+";
        }
        return b;
    }).join("");
    //console.log(bfcode);
    bf(bfcode);
};


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
    execModSupportScript(file);
}else if(file){
    //execute from file
    fs.readFile(file, 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        execModSupportScript(data);
    });
}else{
    //execute from stdin
    fs.readFile("/dev/stdin", 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        execModSupportScript(data);
    });
}


