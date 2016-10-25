var mainFct = require('./fx.js');
var n;
var mainfct = new mainFct(n);
var easyREPL = require("./repl").REPL_Mode;
var test = new easyREPL();
function menu(){

  test.question("请输入内存块数:" , function(data){
       console.log("Get:"+data);
       n = data;
       console.log("---------------------------");
    }).question("输入一系列页号,并以逗号隔开:",function(data){
        console.log("Get:"+data);
        var d = data;
        var dArr = d.split(",");
        console.log("输入后的页数组为:"+dArr);
        console.log("---------------------------");
        console.log("---调用opt算法---");
        mainfct.opt(dArr);
        console.log("opt算法执行的过程已经在文件中,请查看");
        console.log("---opt算法完毕---");
        console.log("---------------------------");
        console.log("---调用fifo算法---");
        mainfct.fifo(dArr);
        console.log("fifo算法执行的过程已经在文件中,请查看");
        console.log("---fifo算法完毕---");
        console.log("---------------------------");
        onsole.log("---调用lru算法---");
        mainfct.lru(dArr);
        console.log("lru算法执行的过程已经在文件中,请查看");
        console.log("---lru算法完毕---");
        console.log("---------------------------");
        console.log("三种算法的的缺页率为如下：");
        mainfct.lackPage();
    });
  
}
var main = new menu();
