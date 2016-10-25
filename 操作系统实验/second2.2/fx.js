var fs = require('fs');
Array.prototype.S=String.fromCharCode(2);
Array.prototype.in_array=function(e){
    var r=new RegExp(this.S+e+this.S);
    return (r.test(this.S+this.join(this.S)+this.S));
};
var time = [];
function add(now){
   time = now;
   for(var i = 0;i<time.length;i++){
      time[i]=time[i]+1;
    };
}
var n;
var arr = new Array();
//置换图
var changeT = new Array();
var s1 = [];
var s2 = [];
var s3 = [];
var f1 = [];
var f2 = [];
var f3 = [];
function pageAcm(nn){
	n = nn;
	console.log("n:"+n);
};
exports.pageAcm = pageAcm;
pageAcm.prototype = {
	opt:function(now){
    arr = now; 
    var memory = arr.slice(0,n);
		var arrIn = arr.slice(n);
		//存放opt中，memory中值的下标
		var m = new Array(n);
   /* console.log("arr:"+arr);
		console.log("arrIn:"+arrIn);
		console.log("memory:"+memory);*/
    changeT.push('['+memory+']');
    for(var i = 0;i<arrIn.length;i++){
    	//截取arr[i]后面的数据
      var a = arr.slice(i+4);
      /*console.log("截取进行数后面的数组为:"+a);
      console.log("将要进入memory的是:"+arrIn[i]);
      console.log("memory现在存的是:"+memory);*/
	    if(arrIn[i]!=null){
     	 	if(memory.in_array(arrIn[i])){
     	 		/* console.log("arrIn[i]:"+arrIn[i]);
        	 console.log("内存中已经存在:"+arrIn[i]);*/
           s1.push(1);
        	 /*console.log("-------------------------------");*/
     	 	}else{
     	 		//找到memory中对应值在将来第一次出现的下标
   	 			for(var k = 0;k<n;k++){
   	 				 m[k]=a.indexOf(memory[k]);
   	 				 //console.log("mk:"+m[k]);
   	 			}
   	 			//获取memory中最大的数的下标：
   	 			if(m.in_array(-1)){
   	 				var s = m.indexOf(-1);
   	 				memory.splice(s,1);
   	 			}else{
   	 				var maxIndex = m.indexOf(Math.max.apply(Math, m));
	          /*console.log("memory中数最大的下标:"+maxIndex);*/
	          //将memory中将最晚发生的数删除
	          memory.splice(maxIndex,1);
   	 			}
          memory.push(arrIn[i]);
	          //将新生成的memory放入其中转换图 
	        changeT.push('['+memory+']');
          /*console.log("删除后memory:"+memory);
			    console.log("下标:"+m);*/
			    
          f1.push(1);
			    console.log("-------------------------------");
     	 	}
	   	}else{
	 	 	  console.log("没有能插入的页了！");
			}     
    }
    console.log("opt置换图:"+changeT);
    var o = new Array();
    o = changeT.toString();
    fs.open('opt.txt','w',function(err,fd){
      var buf = new Buffer(o);
      fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
    });
	},
	fifo:function(now){
		arr = now;
		var memory = arr.slice(0,n);
		var arrIn = arr.slice(n);
		changeT.push('['+memory+']');
		for(var i = 0;i<arrIn.length;i++){
			if(arrIn[i]!=null){
				if(memory.in_array(arrIn[i])){
   	 		 /*console.log("arrIn[i]:"+arrIn[i]);
      	 console.log("内存中已经存在:"+arrIn[i]);*/
         s2.push(1);
      	 /*console.log("-------------------------------");*/
   	 	  }else{
   	 	  	//将memory中第一个删除
   	 	  	memory.splice(0,1);
   	 	  	//将其尾插入到数组
   	 	  	memory.push(arrIn[i]);
   	 	  	changeT.push('['+memory+']');
   	 	  	//console.log("置换图:"+changeT);
          f2.push(2);
          /*console.log("-------------------------------");*/
   	 	  }
			}else{
	 	 	  console.log("没有能插入的页了！");
			}
		}
    console.log("fifo置换图:"+changeT);
    var f = new Array();
    f = changeT.toString();
    fs.open('fifo.txt','w',function(err,fd){
      var buf = new Buffer(f);
      fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
    });
	},
  lru:function(now){
    arr = now;
    var memory = arr.slice(0,n);
    var arrIn = arr.slice(n);
    var t = new Array(n);
    for(var i = 0;i<t.length;i++){
      t[i]=n-i;
    }
    changeT.push('['+memory+']');  
    for(var i = 0;i<arrIn.length;i++){
      if(arrIn[i]!=null){
        if(memory.in_array(arrIn[i])){
         /*console.log("arrIn[i]:"+arrIn[i]);
         console.log("内存中已经存在:"+arrIn[i]);*/
         //获取memory中已经存在的arrin[i]的下标
         var k = memory.indexOf(arrIn[i]);
         memory.splice(k,1);
         t.splice(k,1);
         add(t);
         t.push(1);
         memory.push(arrIn[i]);
         s3.push(1);
         /*console.log("-------------------------------");*/
        }else{
          //找到t最大的下标
          var maxIndex = t.indexOf(Math.max.apply(Math, t));
          memory.splice(maxIndex,1);
          t.splice(maxIndex,1);
          add(t);
          t.push(1);
          memory.push(arrIn[i]);
          changeT.push('['+memory+']');
          //console.log("置换图:"+changeT);
          f3.push(1);
         /* console.log("-------------------------------");*/
        }
      }else{
        console.log("没有能插入的页了！");
      }
    }
    console.log("lru置换图:"+changeT);
    var l = new Array();
    l = changeT.toString();
    fs.open('lru.txt','w',function(err,fd){
      var buf = new Buffer(l);
      fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
    });
  },
  lackPage:function(s,f){
    var succes1 = [];
    var fail1 = [];

    succes1 = s;
    fail1 = f;

    var A1 = succes1.length+fail1.length;

    var lackPage1 = fail1.length/A1;

    console.log("算法缺页率为:"+lackPage1);


  }
 
}
//module.exports = pageAcm;
var run = new pageAcm(3);
var array = [7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1];

// console.log("--------------开始执行opt算法-------------");
// run.opt(array);
//  console.log("---------------算法执行完毕-------------");
//   run.lackPage(s1,f1);
 // console.log("-------------开始执行fifo算法-------------");
 //  run.fifo(array);
 //  console.log("---------------算法执行完毕啦-------------");
 // run.lackPage(s2,f2);
 console.log("------------开始执行lru算法--------------");
  run.lru(array);
 console.log("--------------算法执行完毕啦-------------");
 run.lackPage(s3,f3);





