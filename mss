#!/usr/bin/env node

var fs = require("fs");

var execBF = function(str){
    var ii = 0;
    var mem = [0];
    var i = 0;
    while(ii < str.length){
        var char = str[ii];
        //+-,.[]<>
        if(char === "+"){
            mem[i] = (mem[i]+1)&255;
        }else if(char === "-"){
            mem[i] = (mem[i]+255)&255;
        }else if(char === ">"){
            i++;
            if(i === mem.length)mem.push(0);
        }else if(char === "<"){
            i--;
            if(i < 0)throw new Error("buffer overflow, index smaller than 0");
        }else if(char === "."){
            //console.log(char,mem,String.fromCharCode(mem[i]));
            process.stdout.write(String.fromCharCode(mem[i]));
        }else if(char === ","){
            let buff = Buffer.alloc(1)
            fs.readSync(0, buff, 0, 1)
            mem[i] = (new Uint8ClampeArray(buff))[0];
        }else if(char === "["){
            if(mem[i] === 0){
                //jump the pointer to after the matching paren
                var matchcnt = 0;
                while(ii < str.length){
                    ii++;
                    if(str[ii] === "["){
                        matchcnt++;
                    }else if(str[ii] === "]"){
                        if(matchcnt === 0)break;
                        matchcnt--;
                    }
                }
            }
        }else if(char === "]"){
            if(mem[i] !== 0){
                var matchcnt = 0;
                while(ii >= 0){
                    ii--;
                    if(str[ii] === "]"){
                        matchcnt++;
                    }else if(str[ii] === "["){
                        if(matchcnt === 0)break;
                        matchcnt--;
                    }
                }
            }
        }
        ii++;
    }
    //process.stdout.write("\n");
};




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
    execBF(bfcode);
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







