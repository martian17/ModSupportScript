var  fs = require('fs');

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
    process.stdout.write("\n");
};


module.exports = execBF;

//execBF(process.argv[2]);
/*
fs.readFile(process.argv[2], 'utf8' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    execBF(data);
});*/

