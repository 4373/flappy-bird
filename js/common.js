
//排列  柱子
//objs:柱子集合 
//disOfLeft:柱子与柱子间的距离
//disOfTop;柱子中间隔高度
//arr  :  记录柱子的left   
function arrayPillar(objs,disOfLeft,disOfTop,arrin,arrleft){
	var  parentH=objs[0].parentNode.offsetHeight;
	for(var i=0;i<objs.length;i++){
		//柱子间的距离
		var l=(objs[i].offsetWidth+disOfLeft)*i
		objs[i].style.left=l+"px";
		arrleft.push(l);
		//随机获取每个柱子的上面那个的高度
		var heightOfTop=Math.ceil(Math.random()*(parentH*3/4))+100;
		//给该高度给个限制
		heightOfTop=heightOfTop>parentH-disOfTop?(parentH-disOfTop-100):heightOfTop;
		//获取柱子中的上下 两部分
		var  spanTop=objs[i].children[0];
		var  spanBottom=objs[i].children[1];
		//柱子上部分
		spanTop.style.height=heightOfTop+"px";
		//柱子下部分
		var heightOfBottom=parentH-disOfTop-heightOfTop;
		spanBottom.style.height=heightOfBottom+"px";
		//存  柱子上部分的最下部分top  和  柱子下部分的最上部分的top;
		var t=[heightOfTop,heightOfTop+disOfTop];
		arrin.push(t);
		
		
		
	}
	//设置父节点宽度(定过位   子元素撑不开)
	objs[0].parentNode.style.width=objs[objs.length-1].offsetLeft+objs[objs.length-1].offsetWidth+'px';
}

//检测碰撞
function   check(arr,b,p){
	//鸟
	var bl=b.offsetLeft;
	var bt=b.offsetTop;
	
	for(var i=0;i<p.length;i++){
		
		if(p[i].offsetLeft<b.offsetWidth){
			arr.push
		}
		
	}
	
}
