# ModSupportScript
It's just a joke language somebody said didn't exist until now.

## Syntax
MSS is a glorified wrapper for a shitty brainfuck interpreter that I wrote a while ago. Therefore, the syntax is basically the same as brainfuck, but even more verbose. At least turing complete:)  

`Hey mod, can you turn up the volume?` ... basically the same as brainfuck `+`  
`Hey mod, can you turn down the volume?` ... `-`  
`Hey mod, can you give me a rank pleeeeaze?` ... `>`  
`Hey mod, please ban this guy!` ... `<`  
`Hey mod, can you please give me the invite link?` ... `.`  
`Hey mod, did you get my mod application?` ... `,`  
`Hey mod, I have a new channel request!` ... `[`  
`Hey mod, can you delete this channel? It's dead!` ... `]`  

## Usage
`mss` is the interpreter, and `bf-to-mss` is the compiler from brainfuck to ModSupportScript language.
### Setup
```bash
$ git clone https://github.com/martian17/ModSupportScript.git
$ cd ModSupportScript
$ source setup.sh
```
### System setup
since `mss` and `bf-to-mss` are standalone executable files, you can move them anywhere you like on your system and install them permanently.
```bash
$ sudo cp mss /usr/bin/
$ sudo cp bf-to-mss /usr/bin/
```
### Execution
```bash
$ mss hello-world-example.mss
Hello World!
$
```
### Command manual
`-e` option: direct execute inline
```bash
$ mss -e "Hey mod, can you please give me the invite link?"
```
no option with file path: execute file
```bash
$ mss hello-world-example.mss
```
no option: pipe execution
```bash
$ cat hello-world-example.mss | mss
```
the same goes for `bf-to-mss`. Everything is outputted from stdout (there's no file output option currently, Just use bash redirect `>` or `>>`).


github: https://github.com/martian17/ModSupportScript
