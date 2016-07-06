function getClass(className,father){
	//var father=father?father:document;
	var father=father||document;
	//判断浏览器，若有则用它原有的document.getElementsByClassName(className)；
	if(father.getElementsByClassName){//w3c
		return father.getElementsByClassName(className);
	}else{//ie6~8
		var all=father.getElementsByTagName("*");
		var arr=[];
		for (var i = 0; i < all.length; i++) {
			if(check(all[i].className,className)){
				arr.push(all[i]);
			}
		};
		return arr;
	}
}

function check(str,classname){
	var arr=str.split(" ");
	for (var i = 0; i < arr.length; i++) {
		if(arr[i]==classname){
			return true;
		}else{
			return false;
		}
	};
}

function getContent(obj,val){
	if (obj.textContent) {
		if(val){
			obj.textContent=val;
		}else{
			return obj.textContent;
		}

	}else{
		if(val){
			obj.innerText=val;
		}else{
			return obj.innerText;
		}
	}
}

function getStyle(obj,attr){
	if (getComputedStyle(obj,null)[attr]){
		return getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}

/*
function $(select,father){
	if (typeof select=="string") {
		var father=father?father:document;
	var first=select.charAt(0);
	if (first==".") {
		return getClass(select.substring(1),father);
	}else if (first=="#") {
		return father.getElementById(select.substring(1));
	}else if (/^<[a-z][a-z1-6]{0,8}$/.test(select)) {
		return father.getElementsByTagName(select);
	}else if (/^[a-z][a-z1-6]{0,8}>$/.test(select)) {
		return document.createElement(select.slice(1,-1))
	};

	}else if (typeof select=="function") {
		window.onload=function(){
			select();
		}
	};
}*/
function $(selector,father){
   //给父容器设置默认值
   father=father||document;
   //对selector做判断
   if(typeof selector=="string"){
      //去除字符串左右的空格
      selector=selector.replace(/^\s*|\s*$/g,"");
      if(selector.charAt(0)=="."){//class名
        return getClass(selector.slice(1),father);
      }else if(selector.charAt(0)=="#"){//id名
        return father.getElementById(selector.slice(1));
      }else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){//标签名
        return father.getElementsByTagName(selector);
      }
   }else if (typeof selector=="function"){
             addEvent(window,"load",selector)   
   }
 }



function getChild(obj,type){
	type=type==undefined?true:type;
	var arr=[];
	var  child=obj.childNodes;
	if(type){
	for (var i = 0; i < child.length; i++) {
		if (child[i].nodeType==1) {
			arr.push(child[i]);
		};

		     }
		     return arr;
		}else{
		for (var i = 0; i < child.length; i++) {
		if (child[i].nodeType==1||(child[i].nodeType==3&&child[i].nodeValue.replace(/^\s+|\s+$/g,""))) {
			arr.push(child[i]);
		};

		     }
		     return arr;	
		};
	}
function firstChild(obj){
	return getChild(obj)[0];
}
function lastChild(obj){
	return getChild(obj)[getChild(obj).length-1];
}
//beforeChild(父元素,要插入的元素)
/*思路：
   1、获取父元素的第一个子元素
   2、obj.insertBefote(要插入的元素，之前的元素)*/
  function beforeChild(obj,要插入的元素){
  	var first=firstChild(obj);
  	obj.insertBefore(要插入的元素,first);
  }

function getNext(obj,type){
	type=type==undefined?true:type;
	if (type) {
   var next=obj.nextSibling;
   if (next==null) {return false};
   while(next.nodeType==3||next.nodeType==8){next=next.nextSibling;
   	if (next==null) {return false};}
   	return next;
	}else{
		var next=obj.nextSibling;
   if (next==null) {return false};
   while(next.nodeType==8||(next.nodeType==3&&!(next.nodeValue.replace(/^\s+|\s+$/g,"")))){next=next.nextSibling;
   	if (next==null) {return false};}
   	return next;
	}
}


function getPrevious(obj,type){
	type=type==undefined?true:type;
	if (type) {
   var next=obj.previousSibling;
   if (next==null) {return false};
   while(next.nodeType==3||next.nodeType==8){next=next.previousSibling;
   	if (next==null) {return false};}
   	return next;
	}else{
		var next=obj.previousSibling;
   if (next==null) {return false};
   while(next.nodeType==8||(next.nodeType==3&&!(next.nodeValue.replace(/^\s+|\s+$/g,"")))){next=next.previousSibling;
   	if (next==null) {return false};}
   	return next;
	}
}




 /*insertAfter(obj,div,ture)
obj:要插入的位置
div：要插入的元素
type：类型 true 忽略文本
           false 不能忽略文本
思路：
   1、是否有下一个兄弟节点
    1.1、往下一个兄弟节点的前面插入元素
   2、没有兄弟节点
    2.1、直接往父元素后面插入*/

function insertAfter(obj,div,type){
	type=type==undefined?true:type;
	var next=getNext(obj);
	var parent=obj.parentNode;
	if (next) {
		parent.insertBefore(div,next);
	}else{
		parent.insertBefore(div);
	}
}

/*
  addEvent()
  给一个元素添加事件，
  addEvent(obj,type,fun);
  给元素增加事件
  obj  指定的对象
  type 事件类型
  fn   事件处理程序
*/
//添加事件
function addEvent(obj,type,fn) {
	if (obj.addEventListener) {
	 obj.addEventListener(type,fn,false);
}else{
     obj.attachEvent("on"+type,fn);
}
}

//删除事件
function removeEvent(obj,type,fn) {
	if (obj.addEventListener) {	
	 obj.removeEventListener(type,fn,false);
}else{
     obj.detachachEvent("on"+type,fn);
}
}


//获取任意元素到浏览器的距离
function offset(obj) {
	var result={left:0,top:0};
	var arr=[];
	arr.push(obj);
	var parent=obj.parentNode;
	while(parent.nodeName!="BODY"){
		if (getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute") {
			arr.push(parent);
			
		};
		parent=parent.parentNode;
	}
		for (var i = 0; i < arr.length; i++) {
            var leftWidth=getStyle(arr[i],"borderLeftWidth")?parseInt(getStyle(arr[i],"borderLeftWidth")):0;
            var topWidth=getStyle(arr[i],"borderTopWidth")?parseInt(getStyle(arr[i],"borderTopWidth")):0;
     		result.left+=arr[i].offsetLeft+leftWidth;
			result.top+=arr[i].offsetTop+topWidth;

		};  
		return result;
}





























