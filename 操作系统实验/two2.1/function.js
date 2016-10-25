
var zero = new Array();
var processNum = 0;
var tablePage = new Array();
var pageNum = new Array();
var blockNum = new Array();

function mainFct(){
  
}
exports.mainFct = mainFct;
mainFct.prototype = {
	
	createPcb: function(now) { 
	 	  console.log("进入创建进程");
	  	Ready.enQpcb(now); 		  	
	},
	//进程调度，从就绪到执行
	processCtr:function (){
		console.log("进入进程调度");
		if(Ready.front){
			var rdata = Ready.deQpcb();
		  Run.enQpcb(rdata);
		}
		else {
			return null;
			console.log("就绪队列为空，无法到执行状态");
		}
	},
	//输入进程的大小
  processNum:function(now){
    //processNum = this.processNum;
    processNum = now;

  },
  
  //输入内存的大小，并产生由1,0组成的一维数组
  BlockNum:function(now){
  	//console.log("aaaa");
  	//zero = this.zero;
    this.now = now;
    var block = new Array(this.now);//定义内存一为一维数组  
    for(var i = 0;i<this.now;i++){
      block[i] = parseInt(2*Math.random()); 
          //zero[i] = ;
      if(block[i] === 0){
      	var izero = i;
      	zero[i] = izero;
      }
    }
   
    //console.log("block:"+block);
    //console.log("zero:"+zero);
    //console.log("输出为:"+zero.indexof());
   
  },
  //生成页表
  gerTable:function(){
  	//生成进程的页号
  	for(var i = 0;i<processNum;i++){
  		pageNum[i] = i;
  	}
    //块号赋值
    for(var i=0;i<zero.length;i++){
      if(zero[i] === null){
        zero.baoremove(i);
      }
    }
    var zeroN = zero;
    for(var i = 0 ;i<zeroN.length;i++)
   {
     if(zeroN[i] == "" || typeof(zeroN[i]) == "undefined")
     {
        zeroN.splice(i,1);
        i= i-1;
          
     }
                
   }
  

  	blockNum = zeroN;  
    var big = (pageNum.length>blockNum)?pageNum.length:blockNum.length;

    //页表数组
    for(var i = 0;i<big;i++){
      tablePage.push([pageNum[i],blockNum[i]]);
    }
    //换行

    for(var j=0;j<tablePage.length;j++){
      console.log(JSON.stringify(tablePage[j]));
    }
  },
  //录入逻辑地址并转换为响应的物理地址
  changAdress:function(w){
    var processW = w;
    //十进制转成二进制
    var nprocessW= parseInt(processW).toString(2);
    //字符串截取
    var cutFront = nprocessW.substr(0,2);
    var cutBehind = nprocessW.substr(2);
    var block;
    //二进制转成十进制
    var ncutFront = parseInt(cutFront,2)
    for(var i = 0;i<pageNum.length;i++){
      if(pageNum[i]&&ncutFront === pageNum[i]&&blockNum[i]){
         block = blockNum[i];

      }else{
       // console.log("表内没有与之匹配的页号，请重新输入逻辑地址");
      }
    }
    var nblock =  parseInt(block).toString(2);
    var sum = nblock+cutBehind;
    console.log("物理地址:"+sum);
    //
    /*console.log("----欢迎查看现在的情况-----");
    console.log("changAdress1:"+nprocessW);
    console.log("cut:"+cutFront);
    console.log("cut:"+cutBehind);
    console.log("changeto10:"+ncutFront);
    console.log("block:"+block);
    console.log("物理地址:"+sum);
    console.log("-------------------------");*/
  },
  display:function(){
  }
};
module.exports = mainFct;
/*var a = new mainFct();
a.processNum(5);
a.BlockNum(5);
a.gerTable(); 
a.changAdress(9);*/



