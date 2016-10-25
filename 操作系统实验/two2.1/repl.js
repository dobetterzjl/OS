var readline = require('readline');    //非常好用的Node自带库
 
var rl = null;                                  //Singleton
var questions = [];                         //处理队列
var cursor = 0;                               //游标
 
function dealQuestions(_self) {       //递归处理队列中的读取请求
    if(cursor >= questions.length) {
        cursor = 0;questions = [];
        rl.close();
        rl = null;
        return _self;
    }
 
    rl.question(questions[cursor].question, function (data) {
        questions[cursor].deal(data);
        ++cursor;
        dealQuestions();                      //读取处理完毕回调
    });
}
 
var easyREPL = function(){
    if(rl == null) {                             //初始化模块
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    return this;
};
 
/**
 * @description : a liner api to get console input
 * @param : question to ask , function to deal answer
 * */
easyREPL.prototype.question = function(question,dealAnswer){
    easyREPL();                                
    rl.prompt();
    var _self = this;                            //保存this指针
    questions.push({question:question,deal:dealAnswer});  //加入处理队列
    if(questions.length == 1) {
        dealQuestions(_self);
    }
    return this;                                   //实现链式调用的关键:返回this
};
 
exports.REPL_Mode = easyREPL;
