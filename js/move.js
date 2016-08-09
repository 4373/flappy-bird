//pillarBox匀速移动

//pleft:pillarBox中每个柱子相对于pillarBox的left
function move(objP, objB, attr, target, speed, fn) {

	clearInterval(objP.timer);
	var offset = parseInt(getStyle(objP, attr));

	var offsetForScore;

	speed = offset > target ? -speed : speed;
	objP.timer = setInterval(function() {
		offset = parseInt(getStyle(objP, attr));
		if(objB.isDie) {
			clearInterval(objP.timer);
		}

		if(!objB.stop) {

			//如果还未到达目标点
			if(offset < target && speed > 0 || offset > target && speed < 0) {
				objP.style[attr] = offset + speed + "px";
				//obj是  pillarBox
				for(var i = 0, j = 0; i < objP.pillarLeft.length; i++) {
					//第i的柱子的相对于bg的left值
					var iLeft = objP.pillarLeft[i] + offset;

					//检测  鸟和柱子的碰撞
					//判断竖直方向是否在柱子之间
					if((objB.offsetLeft + objB.offsetWidth > iLeft) && (objB.offsetLeft < iLeft + objP.children[2].offsetWidth)) {

						//判断是否没穿过去
						if(((objB.offsetTop) < objP.spaceInPillar[i][0]) || objB.offsetTop + objB.offsetHeight > objP.spaceInPillar[i][1]) {
							objB.isDie = true;
							clearInterval(objP.timer);
							clearInterval(objB.fly)
							tremble(objP, 20, true);
							tremble(objB, 20, true);
							return;
						} else {
							if(!offsetForScore) offsetForScore = offset;
							if(offsetForScore - offset >= objP.children[2].offsetWidth + objB.offsetWidth) {
								offsetForScore = null;
								objB.score++;
								document.title = objB.score;
							}
							//console.log(offsetForScore-offset);
						}
					}

				}

			} else {
				objP.style[attr] = target + "px";
				clearInterval(objP.timer);
				fn && fn(objP);
			}

		}

	}, 5);
}
//抖动
function tremble(obj, start, isRow, fun) {
	if(obj.time) return;
	var de = isRow ? "left" : "top";
	var offset = parseInt(getStyle(obj, de));
	obj.time = setInterval(function() {
		if(start == 0) {
			clearInterval(obj.time);
			obj.time = null;
			fun && fun();
		}
		obj.style[de] = offset + start + "px";
		start = (start > 0 ? (--start) : (++start)) * -1;
	}, 30);
}

//鸟上升 再自由落体
function flying(obj, speed, downTo, fn) {
	clearInterval(obj.fly);

	var i = 0;

	obj.fly = setInterval(function() {
		if(obj.isDie) {
			clearInterval(obj.fly);
			return
		};

		if(!obj.stop) {

			var offset = parseInt(getStyle(obj, "top"));
			if(speed <= 0) {

				obj.style.backgroundImage = "url(img/0.gif)";
				if(offset + obj.offsetHeight < downTo) {
					obj.style.top = offset + i + "px";
					i++;
				} else {
					clearInterval(obj.fly);
					obj.isDie = true;
					obj.style.top = downTo - obj.offsetHeight + "px";
					fn && fn(obj);
				}
			} else {
				obj.style.backgroundImage = "url(img/2.gif)";
				speed -= 0.5;
				obj.style.top = offset - speed + "px";
			}

		}

	}, 30);

}

function getStyle(obj, attr) {

	if(obj.currentStyle) return obj.currenStyle()[attr]
	return getComputedStyle(obj, false)[attr];

}