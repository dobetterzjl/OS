//var readline = require('readline');
var mainFct = require('./function.js');
var mainfct = new mainFct();
var easyREPL = require("./repl").REPL_Mode;
var test = new easyREPL();
/*var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
	});
exports.rl = rl;*/

function menu(){

  test.question("请输入进程的大小:" , function(data){
       console.log("Get:"+data);
       mainfct.processNum(data);
       console.log("---------------------------");
    }).question("输入内存的大小:",function(data){
        console.log("Get:"+data);
        mainfct.BlockNum(data);
        console.log("页表为:");
        console.log("页|块");
        mainfct.gerTable()
        console.log("---------------------------");
    }).question("录入逻辑地址:",function(data){
        console.log("Get:"+data);
        mainfct.changAdress(data);
    });
  
}
var main = new menu();

