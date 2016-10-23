function dispachPro (argument) {
	// body...
}
Array.prototype.S=String.fromCharCode(2);
Array.prototype.in_array=function(e){
    var r=new RegExp(this.S+e+this.S);
    return (r.test(this.S+this.join(this.S)+this.S));
};
function cacl(arr, callback) {
  var ret;
  for (var i=0; i<arr.length;i++) {
    ret = callback(arr[i], ret);
  }
  return ret;
}
Array.prototype.sum = function () {
  return cacl(this, function (item, sum) {
    if (typeof (sum) == 'undefined') {
      return item;
    }
    else {
      return sum += item;
    }
  });
};
Array.prototype.avg = function () {
  if (this.length == 0) {
    return 0;
  }
  return this.sum(this) / this.length;
}
var arrive = [];
var run = [];
var rr = [];
var two = [];
var oriTwo = [];
var start = []
var finish = [];
var T = [];
var W = [];
exports.dispachPro = dispachPro;
dispachPro.prototype = {
	init:function(now){
		//arrive[]
		arrive = now;
		console.log("arrive:"+arrive);
	  var count=9; 
    //给原数组run赋值 
    for (var i=0;i<count;i++){ 
     run[i]=i+1; 
    } 
		run.sort(function(){ return 0.5 - Math.random(); }); //随机打撒
		run = run.slice(0,arrive.length);
		console.log("run:"+run);
		//two
		for(var i = 0;i<arrive.length;i++){
      two.push([arrive[i],run[i]]);
    }
    for(var i=0;i<two.length;i++){
      console.log(JSON.stringify(two[i]));
    };
    console.log("arrive:"+arrive);
    console.log("run:"+run);
	},
	fcfs:function(){
		var nn = [];
		var mm = [];
		run.splice(0,run.length)
		arrive.sort(function(a,b){return a>b?1:-1});//从小到大排序
		for (var i = 0;i<arrive.length;i++){
			nn.push(two[i][0]);
			mm.push(two[i][1]);
		};
		for (var i = 0;i<arrive.length;i++){
  	  var k = arrive[i];
      var w = nn.indexOf(k);
      run[i] = mm[w];
		};
		//排好顺序的arrive[],run[]已经完成
		for (var i = 0;i<arrive.length;i++){
  	  if(i===0){
  	  	start[0] = arrive[0];
  	  	finish[0] = run[0];
  	  }else{
  	  	if(arrive[i]<=finish[i-1]){
  	  		start[i] = finish[i-1];
  	  		finish[i] = start[i]+run[i];
  	  	}else{
  	  		start[i] = arrive[i];
  	  		finish[i] = start[i]+run[i];
  	  	}
  	  }
  	  T[i] = finish[i]-arrive[i];
  	  W[i] = T[i]/run[i];
		};
		console.log("-------------FCFS---------------");
		console.log("arrive:"+arrive);
		console.log("run:"+run);
		console.log("start:"+start);
		console.log("finish:"+finish);
		console.log("T:"+T);
		console.log("W;"+W);
		console.log("平均T:"+T.avg());
		console.log("平均W:"+W.avg());
		console.log("--------------------------------");
	},
	sjf:function(){
    var arr = [];
		var arr2 = [];
		var nn = [];
		var mm = [];
		var k = two.length;
/*		console.log("k"+k);*/
		arrive.splice(0,k);
		run.splice(0,k);
/*		console.log("arrive:"+arrive);
		console.log("run:"+run);*/
		for (var i = 0;i<k;i++){
			nn.push(two[i][0]);
			mm.push(two[i][1]);
		};
		var minArrive = nn.indexOf(Math.min.apply(Math, nn));
		arrive.push(nn[minArrive]);
		run.push(mm[minArrive]);
		nn.splice(minArrive,1);
		mm.splice(minArrive,1);
		arr = nn;
		arr2 = mm;
/*		console.log("arr:"+arr);
		console.log("arr2:"+arr2);*/
		arr2.sort(function(a,b){return a>b?1:-1});
		for (var i = 0;i<k-1;i++){
  	  var v = arr2[i];
      var w = mm.indexOf(v);
      run.push(arr2[i]);
      arrive.push(nn[w]);
		};
		//排好顺序的arrive[],run[]已经完成
		for (var i = 0;i<arrive.length;i++){
  	  if(i===0){
  	  	start[0] = arrive[0];
  	  	finish[0] = run[0];
  	  }else{
  	  	if(arrive[i]<=finish[i-1]){
  	  		start[i] = finish[i-1];
  	  		finish[i] = start[i]+run[i];
  	  	}else{
  	  		start[i] = arrive[i];
  	  		finish[i] = start[i]+run[i];
  	  	}
  	  }
  	  T[i] = finish[i]-arrive[i];
  	  W[i] = T[i]/run[i];
		};
    console.log("-------------SJF---------------");
		console.log("arrive:"+arrive);
		console.log("run:"+run);
		console.log("start:"+start);
		console.log("finish:"+finish);
		console.log("T:"+T);
		console.log("W;"+W);
		console.log("平均T:"+T.avg());
		console.log("平均W:"+W.avg());
		console.log("--------------------------------");
	},
	timeTurn:function(now){
    var nn = [];
		var mm = [];
		run.splice(0,run.length)
		arrive.sort(function(a,b){return a>b?1:-1});//从小到大排序
		for (var i = 0;i<arrive.length;i++){
			nn.push(two[i][0]);
			mm.push(two[i][1]);
		};
		for (var i = 0;i<arrive.length;i++){
  	  var k = arrive[i];
      var w = nn.indexOf(k);
      run[i] = mm[w];
		};
		for(i=0;i<arrive.length;i++){
			rr.push(run[i]);
		}
		//排好顺序的arrive[],run[]已经完成
		var q = now;
		var time = 0;
		var sum = 0;
		for(var i = 0;i<arrive.length;i++){
  		finish[i] = -1;
  	}
		for(var i = 0;i<run.length;i++){
  		sum+=run[i];
  	}
		var total = [];
		var experess = [];
		for(var i = 0;i<arrive.length;i++){
  		experess[i] = i+1;
  	}
  	console.log("-------------------");
  	console.log("arrive:"+arrive);
		console.log("run:"+run);
  	console.log("experess:"+experess);
  	var f = finish.in_array(-1);
  	while(f){
  		for(var i = 0;i<arrive.length;i++){
  			var b = false;
				if(time>=arrive[i]&&finish[i]===-1){
					b = true;
					if(run[i]>q){
	          for(var j = 0;j<q;j++){
				  		total.push(experess[i]);
				  		//console.log("---"+total);
				  	}
			  		time+=q;
			  		run[i]-=q;
					}else if(run[i]>0&&run[i]<=q){
						var k = run[i];
						for(var j = 0;j<k;j++){
				  		total.push(experess[i]);
				  		//console.log("---"+total);
				  	}
			  		time+=k;
			  		run[i]-=k;
	          finish[i] = time;
					}
				}else if(b === false){
					time+=1;
				}
		  }
		  console.log("finish:"+finish);
		  if(!finish.in_array(-1)){
          break;
		  }
  	}
    for(i=0;i<arrive.length;i++){
    	start[i] = total.indexOf(experess[i]);
    	T[i] = finish[i]-arrive[i];
  	  W[i] = T[i]/rr[i];
    }
    run = rr;
		console.log("-------------时间片轮转---------------");
		console.log("arrive:"+arrive);
		console.log("run:"+rr);
		console.log("start:"+start);
		console.log("finish:"+finish);
		console.log("T:"+T);
		console.log("W;"+W);
		console.log("平均T:"+T.avg());
		console.log("平均W:"+W.avg());
		console.log("--------------------------------");
	}
}
var a = new dispachPro();
var b = [1,0,2,29,4];
a.init(b);
a.fcfs();
//a.sjf();
//a.timeTurn(2);

