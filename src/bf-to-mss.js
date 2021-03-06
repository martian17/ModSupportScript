var fs = require("fs");

var bfchars = "+-><.,[]";
var bftable = {};
bfchars.split("").map(a=>bftable[a]=true);

var mssOperatorList = [
    "Hey mod, can you turn up the volume?",
    "Hey mod, can you turn down the volume?",
    "Hey mod, can you give me a rank pleeeeaze?",
    "Hey mod, please ban this guy!",
    "Hey mod, can you please give me the invite link?",
    "Hey mod, did you get my mod application?",
    "Hey mod, I have a new channel request!",
    "Hey mod, can you delete this channel? It's dead!"
];
var mssOperators = {};
bfchars.split("").map((a,i)=>mssOperators[a]=mssOperatorList[i]);


var translate = function(bf){
    var mss = bf.split("").filter(a=>(a in bftable)).map(a=>mssOperators[a]).join(" ");
    console.log(mss);
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
    translate(file);
}else if(file){
    //execute from file
    fs.readFile(file, 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        translate(data);
    });
}else{
    //execute from stdin
    fs.readFile("/dev/stdin", 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        translate(data);
    });
}