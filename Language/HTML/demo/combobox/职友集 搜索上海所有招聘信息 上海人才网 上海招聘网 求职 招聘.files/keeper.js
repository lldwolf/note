/* 系统通用变量和函数 begin*/
var jobuiBody = document.body;
var defer=false;
function $(id){
	return document.getElementById(id);
}
function w(t){
	var div=document.createElement("div");
	div.innerHTML=t;
	jobuiBody.appendChild(div);
};
function vod() {
};
String.prototype.trim = function() {
	var result=this.replace(/(^\s*)/g, "");
	result=result.replace(/(\s*$)/g, "");
	return result;
};
function _executeScript(scriptFrag, partId) {
	var scriptContainerId = partId + "_SCRIPT_CONTAINER";
	var obj = $(scriptContainerId);
	var ss = document.getElementsByTagName("SCRIPT");
	if (obj != null) {
		jobuiBody.removeChild(obj);
	}
	var scriptContainer = document.createElement('SCRIPT');
	scriptContainer.setAttribute("id", scriptContainerId);
	scriptContainer.text = scriptFrag;
	jobuiBody.appendChild(scriptContainer);
};
/* 系统通用变量和函数 end*/

/* keeper loading 的定义 begin */
keeper={
"keeperLoading":false,	//是否有人正在执行 keeper.load();
"_tasks":[],//任务队列

"_dStr":"",//debug记录
"_dRecord":function(t){keeper._dStr+=t+"<br>\n"},//记录debug进度信息

"_fileImportors":{//文件导入方法
"js":function(file, id, reload){
	var head = document.getElementsByTagName('HEAD').item(0);
	var old = $(id);
	var complete = false;
	var loaded = false;
	keeper._dRecord(file);
	if (old && reload!="-r") {
		keeper._dRecord("e:"+file);
		keeper._load();
		return false;
	} else {
		if(old) head.removeChild(old);
		script = document.createElement('SCRIPT');
		script.src = file;
		script.type = "text/javascript";
		script.language = "javascript";
		script.defer = true;
		//script.charset = "utf-8";
		script.id = id;
		if(typeof script.onreadystatechange!="undefined"){
			script.onreadystatechange=function(){
				keeper._dRecord(file+" = "+this.readyState);
				if(this.readyState=="loaded" || this.readyState=="complete"){
					keeper._load();
				}
			};//ie
		}else{
			script.onload=keeper._load;//其他
		}//使脚本在调入结束后继续执行队列的下一项
		void(head.appendChild(script));
	}
	return true;
},
"php":function(file, id, reload){return keeper._fileImportors["js"](file, id, reload);}
},

"_load":function(){//执行队列中的第一项，并删除
	var i=keeper._tasks.shift();
	if(!i) {
		keeper.keeperLoading = false;
		return false;
	} else {
		keeper.keeperLoading = true;
	}
	switch(typeof i){
		case "string":
		i.match(/(\w+)\.(\w+)(\?.*?)?(-\w)?$/ig);//修改过，使地址格式可以接受url参数
		var n1=RegExp.$1,n2=RegExp.$2,n3=RegExp.$4;
		keeper._fileImportors[n2](i.replace(/-\w$/ig,""),n1+"_"+n2,n3);
		break;
		case "function":
		i.call();//执行自定义函数
		keeper._load();
	}
},

"require":function(){
	var extraTasks=[];
	keeper._dStr="";
	for(var i=0;i<arguments.length;i++) extraTasks.push(arguments[i]);
	this._tasks=extraTasks.concat(this._tasks);
},

"load":function(){//对外接口，参数可以是文件路径或者具体的参数、匿名参数
	for(var i=0;i<arguments.length;i++) {
		keeper._tasks.push(arguments[i]);
	}
	if(!keeper.keeperLoading) {
		keeper._load();//启动执行任务队列
	}
}
};
/* keeper的定义 end */

/* Loading层的位置 begin */
function ajaxLoading(){
	if($("ajaxLoading")) {
		$("ajaxLoading").style.top = (parseInt(document.documentElement.scrollTop) + 25) + 'px';
	}
}
/* Loading层的位置 end */

/* cookies的处理函数 begin */
function getCookie(s,autoDecode){
	var g=document.cookie.match(new RegExp("(?:;\\s|^)"+s+"=(.*?)(?:;|$)","ig"));
	if(g===null) return "";
	r=RegExp.$1;

	if(!autoDecode) return r;
	if(r.indexOf("%")!=-1) return decodeURIComponent(r);
	return r;
};
function cookieGet(s,autoDecode){
	var g=document.cookie.match(new RegExp("(?:;\\s|^)"+s+"=(.*?)(?:;|$)","ig"));
	if(g===null) return "";
	r=RegExp.$1;

	if(!autoDecode) return r;
	if(r.indexOf("%")!=-1) return decodeURIComponent(r);
	return r;
};
function setCookie(k,v,timeDelta,domain){
	if (document.domain.indexOf("jobui.com") == -1) {
		domain = document.domain;
	} else {
		domain = "jobui.com";
	}
	timeDelta=timeDelta||0;
	var d=new Date();
	d.setTime(d.getTime()+timeDelta);
	document.cookie=k+"="+v+";"+(timeDelta?" ;path=/;expires="+d.toGMTString():"")+(domain?" ;domain="+domain:"");
};
function cookieSet(k,v,timeDelta,domain){
	if (document.domain.indexOf("jobui.com") == -1) {
		domain = document.domain;
	} else {
		domain = "jobui.com";
	}
	timeDelta=timeDelta||0;
	var d=new Date();
	d.setTime(d.getTime()+timeDelta);
	document.cookie=k+"="+v+";"+(timeDelta?" ;path=/;expires="+d.toGMTString():"")+(domain?" ;domain="+domain:"");
};
/* cookies的处理函数 end */

/* 参考gmail的页面检验 begin */
function wfs() {
	try {
		if (parent != window && parent.wfs) {
			return false;
		}
	}
	catch (e){}
	if (window.location.href.indexOf('nocheckbrowser') !=  - 1) {
		return true;
	}
	var testcookie = 'jscookietest=valid';
	document.cookie = testcookie;
	if (document.cookie.indexOf(testcookie) ==  - 1 && !document.cookie) {
		top.location = '/html/nocookies.html';
		return false;
	}
	document.cookie = testcookie + ';expires=' + new Date(0).toGMTString();
	var agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf('msie') !=  - 1 && document.all && agt.indexOf('opera') ==
	- 1 && agt.indexOf('mac') ==  - 1) {
		var control = (agt.indexOf('msie 5') != -1) ? 'Microsoft.XMLHTTP' : 'Msxml2.XMLHTTP';
		try {
			new ActiveXObject(control);
		} catch (e) {
			top.location = '/html/noactivex.html';
		}
	}
	return true;
};
wfs();
/* 参考gmail的页面检验 end */

/* 系统所需的cookies值 begin */
var cookieUserAccount	= "jobui_com_jobuserAccount";
var cookieUserType		= "jobui_com_jobuserType";
var cookieUserName		= "jobui_com_jobuserName";
var cookieUserNickName	= "jobui_com_jobuserNickName";
var cookieUserCode		= "jobui_com_jobuserCode";
var cookieUserenodeID	= "jobui_com_jobuserEncodeID";
var cookieUserDomain	= "jobui_com_jobuserDomain";
var cookieUserGrade		= "jobui_com_jobuserGrade";

//标识当前用户
var cookieUserJobui		= "jobui_com_userJobui";
var userJobui = getCookie(cookieUserJobui, true);
if (userJobui==null || userJobui == "") {
	userJobui =(new Date()).getTime();
	cookieSet(cookieUserJobui, userJobui, 3600000*365000, ".jobui.com");
}

var userAccount = getCookie(cookieUserAccount,true);
var userName = getCookie(cookieUserName,true);
var userNickName = getCookie(cookieUserNickName,true);
var userType = getCookie(cookieUserType);
var userCode = getCookie(cookieUserCode);
var userEncodeID = getCookie(cookieUserenodeID);
var userDomain = getCookie(cookieUserDomain);
var userGrade = getCookie(cookieUserGrade);

/* 系统所需的cookies值 end */

/* 页面转换和载入左边栏所需的的函数 begin*/

// 判断当前登录用户是否为个人用户
var isPersonalLogin = true;
if(userAccount == "" || userAccount == null || userCode == "" || userCode == null || userName == "" || userName == null || userType != 1 ) {
	isPersonalLogin = false;
}

// 是否需要左边工具栏 默认值 true；
if ( typeof(needJobuiLeftbar) == "undefined" ) {
	needJobuiLeftbar = true;
}

// 左边工具栏的是否存在 默认值 false
var existJobuiLeftbar = false;

//  左边工具栏的的开关状态
var jobuiLeftbarStatus = false;

// 载入时的页面地址
var onloadUrl = location.href;

// 删除原有的CSS(如果存在的话)
function removeCss() {
	var i = 0;
	while (document.getElementsByTagName('link')[i] ) {
		if (document.getElementsByTagName('link')[i].rel == "stylesheet") {
			document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('link')[i]);
		} else {
			i++;
		}
	}
	while (document.getElementsByTagName('head')[0].getElementsByTagName('style')[0]) {
		document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('style')[0]);
	}
}

// 动态修改页面的css样式表
function modifyCss() {
	removeCss();
	var leftbarCss = "html, body{width:;height:100%;padding:0;overflow:auto;}\n body {margin:0 auto;padding:0;font-size:12px;}\n #jobuiLeftBar {position:absolute;left:0px;top:0px;z-index:1000;height:100%;}\n html>body #jobuiLeftBar{position:fixed;}\n";
	var style = document.createElement("style");
	style.setAttribute("type", "text/css");
	if(style.styleSheet){// IE
		style.styleSheet.cssText = leftbarCss;
	} else {// w3c
		var cssText = document.createTextNode(leftbarCss);
		style.appendChild(cssText);
	}
	document.getElementsByTagName('head')[0].appendChild(style);
}

if (needJobuiLeftbar == true && top == this ) {

	if (isPersonalLogin == false && $("switcher")) {
		$("switcher").innerHTML="<img src='http://htm.jobui.com/images_q/leftbar_login.gif' onclick='showJobuiLeftbar()' style='cursor:hand;'/>";
	}
	if (isPersonalLogin == true && $("switcher")) {
		$("switcher").innerHTML="<img src='http://htm.jobui.com/images_q/left_show.gif' onclick='showJobuiLeftbar()' style='cursor:hand;'/>";
	}
	if ($("jobuiLeftBar")) {
		$("jobuiLeftBar").style.display = "inline";
	}
}

if ( top != this) {
	document.body.style.marginLeft = "0px";
}

// 左边工具栏的收起和展开
function hiddenJobuiLeftbar() {
	jobuiBody.style.marginLeft="24px";
	jobuiLeftbarStatus = false;
	$("jobuiLeftbarContent").style.display="none";
	if (isPersonalLogin == true) {
		var switcherSrc = "left_show.gif";

	} else {
		var switcherSrc ="leftbar_login.gif";
	}
	$("switcher").innerHTML = "<img src='http://htm.jobui.com/images_q/"+switcherSrc+"' onclick='showJobuiLeftbar()' style='cursor:hand;'/>";
}

function showJobuiLeftbar() {
	jobuiLeftbarStatus = true;
	if (isPersonalLogin == true) {

		var switcherSrc = "left_hidden.gif";
	} else {
		var switcherSrc = "leftbar_login.gif";
	}
	$("switcher").innerHTML="<img src='http://htm.jobui.com/images_q/"+switcherSrc+"' onclick='hiddenJobuiLeftbar()' style='cursor:hand;'/>";
	$("switcher").firstChild.src = "http://htm.jobui.com/images_q/"+switcherSrc;
	jobuiBody.style.marginLeft="199px";

	if (existJobuiLeftbar == false && needJobuiLeftbar == true) {
		var jobuiLeftbarContent = document.createElement("div");
		jobuiLeftbarContent.id = "jobuiLeftbarContent";
		jobuiLeftbarContent.style.cssText = "float:left;width:175px;height:100%;border-right:1px #ddd solid;background-color: #fff";
		var jobuiLeftbarLoading = document.createElement("div");
		jobuiLeftbarLoading.id = "jobuiLeftbarLoading";
		jobuiLeftbarLoading.style.cssText = "position:absolute;top:50px;left:40px;";
		jobuiLeftbarLoading.innerHTML = '<img src="http://htm.jobui.com/images/loading_r.gif" align="absmiddle">&nbsp;页面载入中...';
		var backupSwitcher = $("switcher");
		$("jobuiLeftBar").removeChild(backupSwitcher);
		$("jobuiLeftBar").appendChild(jobuiLeftbarLoading);
		$("jobuiLeftBar").appendChild(jobuiLeftbarContent);
		$("jobuiLeftBar").appendChild(backupSwitcher);
		existJobuiLeftbar = true;
		if (isPersonalLogin == true) {
			if (navigator.userAgent.indexOf("MSIE") == -1) {
				var nowHtml_ = "<iframe id='jobuiLeftbarIframe' src='/action/personalLeftbar.html' frameborder='0' height='100%' width='100%' > </iframe>";
			} else {
				var nowHtml_ = "<iframe id='jobuiLeftbarIframe' src='/action/personalLeftbar.html' frameborder='0' height='100%' width='100%'> </iframe>";
			}
			$("jobuiLeftbarContent").innerHTML = nowHtml_;
			$("jobuiLeftbarIframe").src = "/action/personalLeftbar.html";
		} else {
			if (navigator.userAgent.indexOf("MSIE") == -1) {
				var nowHtml_ = "<iframe id='jobuiLeftbarIframe' src='/action/leftbar_login.html' frameborder='0' height='100%' width='100%'> </iframe>";
			} else {
				var nowHtml_ = "<iframe id='jobuiLeftbarIframe' src='/action/leftbar_login.html' frameborder='0' height='100%' width='100%'> </iframe>";
			}
			$("jobuiLeftbarContent").innerHTML = nowHtml_;
			$("jobuiLeftbarIframe").src = "/action/leftbar_login.html";
		}

	}
	$("jobuiLeftbarContent").style.display="block";
}

function loginPopup(info) {
	var promptInfo=info || '请从左边栏登录';
	showJobuiLeftbar();
	show_info_popup(promptInfo);
}

/* 页面转换和载入左边栏所需的的函数 end */

// 搜索框下方的关键字点击处理
var ara_addKw=function(s, ara_input_id){
	if(ara_input_id==null || ara_input_id=="") {
		ara_input_id="jobKw";
	}
	var t=$(ara_input_id).value;
	$(ara_input_id).value=t.indexOf(s)==-1?t+(!t?"":" ")+s:t;
};

/* 来自原 ui.js 的东西 */
//贴事件
function addEvent(el, evname, func) {
	if(typeof func=="string"){
		func=new Function('eval("'+func+'");');
	}

	if (el.attachEvent) { // IE
		el.attachEvent("on" + evname, func);
	} else if (el.addEventListener) { // Gecko / W3C
		el.addEventListener(evname, func, true);
	} else {
		el["on" + evname] = func;
	}
};

//执行队列
function exec(a,o){
	for(var i=0;i<a.length;i++){
		switch(typeof a[i]){
			case "string":
			eval(a[i]);break;
			default:
			if (o)	a[i].call(o);
			else	a[i].call();
		}
	}
}

//翻页的坐标偏移
function realOffset (element) {
	var valueT = 0, valueL = 0;
	do {
		valueT += element.scrollTop  || 0;
		valueL += element.scrollLeft || 0;
		element = element.parentNode;
	} while (element);
	return [valueL, valueT];
}

//dom的坐标
function cumulativeOffset(element) {
	var valueT = 0, valueL = 0;
	do {
		valueT += element.offsetTop  || 0;
		valueL += element.offsetLeft || 0;
		element = element.offsetParent;
	} while (element);
	return [valueL, valueT];
}

//人名弹出的坐标（兼容fireFox)
function nameCumulativeOffset(element) {
	var valueT = 0, valueL = 0;
	do {
		valueT += element.offsetTop  || 0;
		valueL += element.offsetLeft || 0;
		element = element.offsetParent;
	} while (element);

	//fixed firefox

	if(!document.all) {
		if(document.getElementById("jobuiLeftbarContent")) {
			if(top.jobuiLeftbarStatus) {
				valueL = valueL+199;
			} else {
				valueL = valueL+25;
			}
		} else {
			valueL = valueL+20;
		}
	}

	return [valueL, valueT];
}

//内容区高度
function innerSize() {
	var myWidth = 0, myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth||0;
		myHeight = document.body.clientHeight||0;
	}
	return [myWidth,myHeight];
}

//尾随文字提示
function addTipEasy(obj,content,sec){//在obj后面添加内容为content的文本提示，5秒钟后消失
	if(!obj) return false;
	if($('aTip')!=null) hideTip();

	var text=document.createElement('span');
	text.setAttribute('id','aTip');
	if(obj.nextSibling!=null){
		obj.parentNode.insertBefore(text,obj.nextSibling);
	}else{
		obj.parentNode.appendChild(text);
	}
	text.innerHTML=content;
	window.setTimeout('hideTip()',sec||5000);
}

function hideTip(){
	if(!$('aTip')) return;
	$('aTip').parentNode.removeChild($('aTip'));
}

//弹出操作的基本类
function popup(name,zindex){
	//id
	var _i=this;
	this._name=name;
	this._zindex=zindex||100;
	this._containerId=name+"_container";
	this._bgId=name+"_bg";
	this._bgHTML='<div ID="'+this._bgId+'" STYLE=" top:0px; margin-right: auto; margin-left: auto; background:#fff; FILTER: alpha(opacity=40); -moz-opacity: 0.4; POSITION: absolute; Z-INDEX:'+this._zindex+'; border: 0px; width:0px; height:0px;" frameborder="0" scrolling="no"></div>';//屏蔽层;
	this._boxId=name+"_box";
	this._boxHTML='<div id="'+this._boxId+'" style="display:none; Z-INDEX:'+this._zindex+'; POSITION:absolute;"><div style="width:300px; display:;"><div class="win_wait">正在处理中，请稍等...</div></div></div>';

	//距离
	this._offsetTop=100;

	//observer
	this._onBO=[];
	this._open=[];
	this._onAO=[];
	this._onBC=[];
	this._close=[];
	this._onAC=[];

	this._intPos=[];
	this._intId=null;

	//方法
	this.openDiv=function(){
		try{
			exec(this._onBO,this);
			exec(this._open,this);
			exec(this._onAO,this);
		}catch(e){}
	};

	this.closeDiv=function(){
		try{
			exec(this._onBC,this);
			exec(this._close,this);
			exec(this._onAC,this);
		}catch(e){}
	};

	//基本方法的默认实现
	this._open=[
	function(){
		//冲突时自动清除
		if($(this._boxId)) this.closeDiv();
	},

	function(){
		//添加容器
		if(!$(this._containerId)){
			var c=document.createElement("div");
			c.setAttribute("id",this._containerId);
			c.style.left="0";
			c.style.width="0px";
			c.style.float="left";
			document.body.appendChild(c);
		}

		//添加遮盖层
		$(this._containerId).innerHTML+=this._bgHTML;

		//添加内容层
		$(this._containerId).innerHTML+=this._boxHTML;

		//启动定位器
		this._intId=window.setInterval(function(){
			exec(_i._intPos,_i);
		},100);
	}
	];

	this._close=[
	function(){
		try{
			$(this._containerId).innerHTML="";
			$(this._containerId).parentNode.removeChild($(this._containerId));
			window.clearInterval(this._intId);
		}catch(e){}
	}
	];

	this._onAC=[
	function(){//清空数据
		this._onAO=[];
		this._onBC=[];
		this._intId=null;
		this._intPos=[this._intPos[0]];
		this._offsetTop=70;
	}
	];

	this._intPos=[
	function(){
		//屏蔽层定位
		if($(this._bgId)==null)	return false;
		var bg=$(this._bgId);

		bg.style.left=0;
		bg.style.top=0;
		//bg.style.width=(document.body.offsetLeft+document.body.scrollWidth)+"px";
		bg.style.width=innerSize()[0]-20+"px";//-20 个人后台不会出现滚动条
		//bg.style.height=(document.body.offsetTop+document.body.scrollHeight)+"px"; 2006-12-25 原来处理方式
		bg.style.height=document.body.clientHeight+"px";
		//内容层定位
		if($(this._boxId)==null)	return false;
		var p=realOffset(document.body);
		var box=$(this._boxId);
		box.style.width=(box.firstChild.style?box.firstChild.style.width.replace("px",""):"0")+"px";
		var w=parseInt(box.style.width.replace("px","")||"0");

		//box.style.left=(p[0]+(document.body.clientWidth-w)*0.5)+"px";
		if(top.frames.length>=1) {//个人后台框架页处理 2006-12-28
			var re = new RegExp("(?:.+\\/)?(.+?)\\.(.+?)\\.(.+?)/","ig");
			var arr = re.exec(location.href);
			var curDomain = RegExp.$1;
			if(curDomain=="so" && top.needJobuiLeftbar == false) {//so页面的处理方式
					box.style.left=(p[0]+(innerSize()[0]-w)*0.5)+"px"; //添加滚动条
					box.style.top=(p[1]+this._offsetTop)+"px";
			} else {
			if(top.document.getElementById("jobuiRightIframe")) {		//人个后台框架页处理 2006-12-29
				var rfLocation=top.document.getElementById("jobuiRightIframe").src;
				if( rfLocation.indexOf("?nowPlace")!=-1) {
					box.style.left=(p[0]+(innerSize()[0]-w)*0.5)+"px"; //添加滚动条
					box.style.top=(p[1]+this._offsetTop)+"px";
				}
				if(top.frames.length==2) {//嵌入indexnoframe.php框架中的圈子首页处理方式
					if((top.frames[1].location.href.indexOf("q.jobui.com")!=-1) || (top.frames[1].location.href.indexOf("?nowPlace")==-1)){
						box.style.left=((innerSize()[0]-w)*0.5)+"px";
						box.style.top=(this._offsetTop)+"px";
					}
				}
			} else {
				box.style.left=((innerSize()[0]-w)*0.5)+"px";
				box.style.top=(this._offsetTop)+"px";
			 }//end if jobuiRightIframe
			}//end if so
		} else {//通用页面的处理方式

			var re = new RegExp("(?:.+\\/)?(.+?)\\.(.+?)\\.(.+?)/","ig");
			var arr = re.exec(location.href);
			var curDomain = RegExp.$1;
			if(curDomain=="so" && top.needJobuiLeftbar == false) {//so页面的处理方式
				box.style.left=(p[0]+(innerSize()[0]-w)*0.5)+"px";
				box.style.top=(p[1]+this._offsetTop)+"px";
			} else {
				box.style.left=((innerSize()[0]-w)*0.5)+"px";
				box.style.top=(this._offsetTop)+"px";
			}

		}

		//显示
		box.style.display="inline";
		box.style.visibility="visible";
	}
	];
}

//信息提示框

var info_popup=new popup("info_popup",150);

function show_info_popup(info, extraInfo, infoType, onBeforeClose){
	//info：HTML信息
	//infoType：1:错误;2:正确
	//extraInfo： 详细信息

	if (document.all) {
		if (document.readyState!="complete") {
			if ($("ajaxLoading")) {
				$("ajaxLoading").style.display="";
			}
			setTimeout(function(){
				show_info_popup(info, extraInfo, infoType, onBeforeClose);
			},10);
			return;
		}
	}

	if ($("ajaxLoading")) {
		$("ajaxLoading").style.display="none";
	}
	
	if(!infoType){
		if(info.search(/^e:/ig)!=-1){
			info=info.replace("e:","");
			infoType=1;
		}else{
			infoType=2;
		}
	}

	if($(info_popup._boxId)){
		info_popup.closeDiv();//一旦冲突，关闭先出现的信息框
	}

	if($(confirm_popup._boxId)){
		confirm_popup.closeDiv();//一旦冲突，关闭先出现的选择框
	}

	if(onBeforeClose){
		info_popup._onBC.push(onBeforeClose);
	}

	switch(infoType){

		case 1://错误提示
		info_popup._bgHTML='<div ID="'+info_popup._bgId+'" STYLE=" top:0px; margin-right: auto; margin-left: auto; background:#fff; FILTER: alpha(opacity=40); -moz-opacity: 0.4; POSITION: absolute; Z-INDEX:'+info_popup._zindex+'; border: 0px; width:0px; height:0px;"></div>'

		info_popup._boxHTML='<div id="'+info_popup._boxId+'" style="display:none; width:300px; Z-INDEX:'+info_popup._zindex+'; POSITION:absolute; font-size:14px;background: #ffc url(http://htm.jobui.com/images_www/t_ok.gif) no-repeat 10px 10px;border: #F4B907 1px solid;padding: 10px 0 10px 30px;color:#B34502;"><div style="width:300px;"> <div class="close" style="padding-right:11px;float:right;"><a id="'+info_popup._boxId+'_closeCross" href="javascript:vod()" onclick="info_popup.closeDiv()" style="color:red;font-size:12px;z-index:100;">[关闭]</a></div><div style="margin-right:25px;"><strong><span id="'+info_popup._boxId+'_info'+'">'+info+'</span></strong><span id="'+info_popup._boxId+'_extraInfo'+'" style="display:'+(extraInfo?"inline":"none")+'"><br /><br /><span class="lihe18">'+extraInfo+'</span><br /></span></div></div></div>';
		
		window.setTimeout(function(){info_popup.closeDiv();},4000);

		break;

		case 2://成功提示
		//info_popup.noHideSelect=true;

		info_popup._bgHTML='<div ID="'+info_popup._bgId+'" STYLE=" top:0px; margin-right: auto; margin-left: auto; background:#fff; FILTER: alpha(opacity=40); -moz-opacity: 0.4; POSITION: absolute; Z-INDEX:'+info_popup._zindex+'; border: 0px; width:0px; height:0px; display:'+(extraInfo?"inline":"none")+';"></div>';

		info_popup._boxHTML='<div id="'+info_popup._boxId+'" style="display:none; width:300px; Z-INDEX:'+info_popup._zindex+'; POSITION:absolute; font-size:14px;background: #E6FFE6 url(http://htm.jobui.com/images_www/r_ok.gif) no-repeat 10px 10px;border: #00BE00 1px solid;font-size:14px;padding: 10px 0 10px 30px;color:green;"><div style="width:300px;"> <div class="close" style="padding-right:11px;float:right;"> <a id="'+info_popup._boxId+'_closeCross" href="javascript:vod()" onclick="info_popup.closeDiv()" style="color:red;font-size:12px;z-index:100;">[关闭]</a></div> <div style="margin-right:25px;"><strong><span id="'+info_popup._boxId+'_info'+'">'+info+'</span></strong><span id="'+info_popup._boxId+'_extraInfo'+'" style="display:'+(extraInfo?"inline":"none")+';"><br /><br /><span class="lihe18">'+extraInfo+'</span><br /></span></div></div></div>';

		if(!extraInfo){
			info_popup._onAO.push(function(){
				info_popup._timeoutId=window.setTimeout(function(){
					info_popup.closeDiv();
				},3500);
			});
		}

		break;

		default:
		info_popup.closeDiv();
		return false;
	}

	info_popup._intPos.push(function(){
		if($(this._boxId+"_closeCross")){
			$(this._boxId+"_closeCross").onclick=function(){info_popup.closeDiv()};
			$(this._boxId+"_closeCross").focus();
		}
		info_popup._intPos=[info_popup._intPos[0]];
	});

	info_popup._onAC.push(function(){
		if(info_popup._timeoutId){
			try{
				window.clearTimeout(info_popup._timeoutId);
			}catch(e){
				info_popup._timeoutId=null;
				info_popup._onAC=[];
			}
		}
	});

	info_popup.openDiv();
}


//确认框
var confirm_popup=new popup("confirm_popup",150);

function show_confirm_popup(info, yesMethod , noMethod, title){
	//info：提示信息
	//yesMethod：yes选择的执行方法
	//noMethod：no选择的执行方法
	//title：自定义标题

	if($(confirm_popup._boxId)){
		confirm_popup.closeDiv();//一旦冲突，关闭先出现的选择框
	}

	if($(info_popup._boxId)){
		info_popup.closeDiv();//一旦冲突，关闭先出现信息的选择框
	}

	confirm_popup._yes=[function(){confirm_popup.closeDiv()}];
	confirm_popup._no=[function(){confirm_popup.closeDiv()}];

	if(yesMethod) confirm_popup._yes.push(yesMethod);
	if(noMethod) confirm_popup._no.push(noMethod);

	title=title||'请确定您的选择';

	confirm_popup._boxHTML='<div id="'+confirm_popup._boxId+'" style="display:none; width:300px; Z-INDEX:'+confirm_popup._zindex+'; POSITION:absolute; background-color:#fff; border:1px #5395F0 solid;"><div style="width:300px;"><div class="win_top" style="width:300px;"><div class="win_title">'+title+'</div><div class="close" style="padding:11px;"><a href="javascript:vod()" onclick="confirm_popup.closeDiv()" style="color:red;font-size:12px;z-index:100;">[关闭]</a></div></div><div class="win_con">'+info+'<center style="padding:12px 0 8px;"><input id="'+confirm_popup._boxId+'_yes" type="button" value=" 确定 " class="btn4" style="width:60px;" /><input id="'+confirm_popup._boxId+'_no" type="button" value=" 取消 "  class="btn4" style="width:60px;margin-left:100px;"/></center></div></div>';

	confirm_popup._intPos.push(function(){
		addEvent($(confirm_popup._boxId+'_yes'),'click',function(){exec(confirm_popup._yes,confirm_popup)});
		addEvent($(confirm_popup._boxId+'_no'),'click',function(){exec(confirm_popup._no,confirm_popup)});
		$(confirm_popup._boxId+'_yes').focus();
		confirm_popup._intPos=[confirm_popup._intPos[0]];
	});

	confirm_popup.openDiv();
}


//基于ajax的弹出窗口。注：在弹出页面中的第一个DOM对象设置宽，作为整个弹出层的宽

var ajax_popup=new popup("ajax_popup",150);

function show_ajax_popup(url, postArg, fixTop){//fixTop:距顶部距离
	if($(ajax_popup._boxId)){
		ajax_popup.closeDiv();//冲突处理
	}
	if($(common_popup._boxId)){
		common_popup.closeDiv();//冲突处理
	}

	ajax_popup._intPos.push(function(){
		if(url){
			ajaxPostDateToPage(url,postArg||"",ajax_popup._boxId);
		}
		if($(ajax_popup._boxId+"_closeCross")){
			addEvent($(ajax_popup._boxId+"_closeCross"), "click", "ajax_popup.closeDiv()");
		}
		ajax_popup._intPos=[ajax_popup._intPos[0]];
	});

	ajax_popup.openDiv();
}


//基于iframe的弹出窗口。注：使用iframe作为容器，修改src

var common_popup=new popup("common_popup",150);

function show_common_popup(url,width,height,fixTop){
	if($(ajax_popup._boxId)){
		ajax_popup.closeDiv();//冲突处理
	}
	if($(common_popup._boxId)){
		common_popup.closeDiv();//冲突处理
	}

	if(fixTop)common_popup._offsetTop=fixTop;

	common_popup._boxHTML='<div id="'+common_popup._boxId+'" style="Z-INDEX:'+common_popup._zindex+'; POSITION:absolute; background-color:#fff; border:1px #5A85E7 solid;width:'+(width||600)+'px;height:'+(height||400)+'px; display:none;"><div  style="width:'+(width||600)+'px;height:'+(height||400)+'px;"><iframe id="'+common_popup._boxId+'_iframe" frameborder="0" width="'+(width||600)+'" height="'+(height||400)+'"></iframe></div></div>';

	common_popup._intPos.push(function(){
		$(common_popup._boxId+'_iframe').src=url;
		common_popup._intPos=[common_popup._intPos[0]];
	});

	common_popup.openDiv();
}

//按位置弹出人名操作列表
var name_popup=new popup("name_popup",150);
var name_popup_xForm='';
name_popup._ajaxUrl='/action/personal/index.php';
function name_popup_init(){//init
	document.cookie.match(/jobui_com_jobuserType=(\d);/ig);
	var userType=RegExp.$1;

	switch(userType){
		case "1"://个人
		name_popup._boxHTML='<div id='+name_popup._boxId+' style="position:absolute; z-index:'+name_popup._zindex+'; display:none;width:68px;height:105px;"><div class="namelink" style="width:64px;">'

		+'<div style="width:48px;" onmouseover="this.style.background=\'#C46702\';this.firstChild.style.color=\'#ffffff\';" onmouseout="this.style.background=\'#ffffcc\';this.firstChild.style.color=\'#B34502\';"><a style="COLOR: #B34502" href="javascript:vod()" onclick="name_popup.handler.toHomepage()">查看主页</a></div>'
		+'<div style="width:48px;" onmouseover="this.style.background=\'#C46702\';this.firstChild.style.color=\'#ffffff\';" onmouseout="this.style.background=\'#ffffcc\';this.firstChild.style.color=\'#B34502\';"><a style="COLOR: #B34502" href="javascript:vod()" onclick="name_popup.handler.toResume()">查看简历</a></div>'
		+'<div style="width:48px;" onmouseover="this.style.background=\'#C46702\';this.firstChild.style.color=\'#ffffff\';" onmouseout="this.style.background=\'#ffffcc\';this.firstChild.style.color=\'#B34502\';"><a style="COLOR: #B34502" href="javascript:vod()" onclick="name_popup.handler.addFriend()">加为好友</a></div>'
		+'<div style="width:48px;" onmouseover="this.style.background=\'#C46702\';this.firstChild.style.color=\'#ffffff\';" onmouseout="this.style.background=\'#ffffcc\';this.firstChild.style.color=\'#B34502\';"><a style="COLOR: #B34502" href="javascript:vod()" onclick="name_popup.handler.addEspial()">加入关注</a></div>'
		+'<div style="width:48px;" onmouseover="this.style.background=\'#C46702\';this.firstChild.style.color=\'#ffffff\';" onmouseout="this.style.background=\'#ffffcc\';this.firstChild.style.color=\'#B34502\';"><a style="COLOR: #B34502" href="javascript:vod()" onclick="name_popup.handler.sendMsg()">发送信息</a></div>'

		+'</div></div>';
		name_popup._ajaxUrl='/action/personal/index.php';

		break;

		default:
		name_popup._boxHTML='<div id='+name_popup._boxId+'  style="position:absolute; z-index:'+name_popup._zindex+'; display:none;width:63px;height:42px;"><div class="namelink" style="width:61px;">'
		+'<div style="width:45px;" onmouseover="this.style.background=\'#C46702\';this.firstChild.style.color=\'#ffffff\';" onmouseout="this.style.background=\'#ffffcc\';this.firstChild.style.color=\'#B34502\';"><a style="COLOR: #B34502" href="javascript:vod()" onclick="name_popup.handler.toHomepage()">查看主页</a></div>'
		+'<div style="width:width:45px;" onmouseover="this.style.background=\'#C46702\';this.firstChild.style.color=\'#ffffff\';" onmouseout="this.style.background=\'#ffffcc\';this.firstChild.style.color=\'#B34502\';"><a style="COLOR: #B34502" href="javascript:vod()" onclick="name_popup.handler.toResume()">查看简历</a></div>'
		+'</div></div>';
		name_popup._ajaxUrl='/action/personal/personal.php';

	}

	name_popup._cTarget					=null;
	name_popup._cTargetId				=null;
	name_popup._cTargetNumber	 	=null;

	name_popup._patchInt=126;

	name_popup._intPos=[
	function(){
		//屏蔽层定位

		if(!name_popup._cTarget || !name_popup._cTarget.parentNode || !name_popup._cTargetId){
			if($(name_popup._boxId)) {
				$(name_popup._boxId).style.display="none";
			}
			name_popup._cTargetId				=null;
			name_popup._cTargetNumber	 	=null;
			name_popup._cTarget					=null;
			return false;
		}

		var o=name_popup._cTarget;

		//内容层定位
		var pos=nameCumulativeOffset(o);
		//alert(pos[0]+","+pos[1]);
		var offset=realOffset(o);
		//alert(offset[0]+","+offset[1]);
		var i=$(name_popup._boxId);

		var charWidth=6;//平均单字体长度；注：如果没有width属性，就按字数估算偏移宽度
		var wordLength1=parseInt(o.innerHTML.length||0);
		var wordLength2=parseInt(o.innerHTML.replace(/\w/ig,"").length||0);

		var wordLength=(((wordLength1-wordLength2)+wordLength2*2)||0);

		var oWidth=charWidth*wordLength+5;//模拟的宽度,+5:微调
		var turnFactorX=0.7,turnFactorY=0.7;//转换伸展方向的限度

		var _x=pos[0]-(offset[0]+innerSize()[0]*turnFactorX)>=0?1:0;
		var _y=pos[1]-(offset[1]+innerSize()[1]*turnFactorY)>=0?1:0;

		var x=[],y=[];

		x[0]=pos[0]+(parseInt(o.style.width.replace("px","")) || oWidth);
		x[1]=pos[0]-parseInt(i.style.width.replace("px","")||0);

		if(top.frames.length>=1) {//框架页处理
			var re = new RegExp("(?:.+\\/)?(.+?)\\.(.+?)\\.(.+?)/","ig");
			var arr = re.exec(location.href);
			var curDomain = RegExp.$1;
			if(curDomain=="so" && top.needJobuiLeftbar == false) {//so页面的处理方式
				y[0]=pos[1]
				y[1]=pos[1]-parseInt(i.style.height.replace("px","")||0);
			} else {
				y[0]=pos[1]-offset[1];
				y[1]=pos[1]-parseInt(i.style.height.replace("px","")||0)-offset[1];
			}
			if(top.document.getElementById("jobuiRightIframe")) {		//人个后台框架页处理 2006-12-29
				var rfLocation=top.document.getElementById("jobuiRightIframe").src;
				if( rfLocation.indexOf("?nowPlace")!=-1) {
					y[0]=pos[1];
					y[1]=pos[1]-parseInt(i.style.height.replace("px","")||0);
				}
				if(top.frames.length==2) {
					if(top.frames[1].location.href.indexOf("q.jobui.com")!=-1){
						y[0]=pos[1]-offset[1];
						y[1]=pos[1]-parseInt(i.style.height.replace("px","")||0)-offset[1];
					}
				}
			}
		} else {//通用页面处理方式
			var re = new RegExp("(?:.+\\/)?(.+?)\\.(.+?)\\.(.+?)/","ig");
			var arr = re.exec(location.href);
			var curDomain = RegExp.$1;
			if(curDomain=="so" && top.needJobuiLeftbar == false) {//so页面的处理方式
				y[0]=pos[1];
				y[1]=pos[1]-parseInt(i.style.height.replace("px","")||0);
			} else {
				y[0]=pos[1]-offset[1];
				y[1]=pos[1]-parseInt(i.style.height.replace("px","")||0)-offset[1];
			}
		}

		//ie patch 06-8-18 begin
		var patchArray=[
		[/[^\w]w.jobui.com/ig,name_popup._patchInt]
		];

		if(navigator.userAgent.search(/MSIE/ig)!=-1){
			for(var j=0;j<patchArray.length;j++){
				if(location.href.search(patchArray[j][0])!=-1){
					x[0]+=patchArray[j][1];
					x[1]+=patchArray[j][1];
				}
			}
		}

		//ie patch 06-8-18 end

		//other patch begin (style_personal) 个人主页的定位方式不考虑<a>的长度

		if(name_popup_xForm) eval(name_popup_xForm);

		//other patch end

		i.style.left=x[_x]+"px";
		i.style.top=y[_y]+"px";


		i.style.display="inline";
		i.style.visibility="visible";

		if (!$(name_popup._boxId)) { // Maxthon下有个弹出框偶尔会丢失的问题，所以重新init一下～～DvD
			name_popup_init();
		}
		
		$(name_popup._boxId).onmouseover=function(){
			if(name_popup._hideTimeoutId){
				window.clearTimeout(name_popup._hideTimeoutId);
				name_popup._hideTimeoutId=null;
			}
		}

		$(name_popup._boxId).onmouseout=function(){
			name_popup._hideTimeoutId=window.setTimeout(function(){
				name_popup._cTarget					=null;
				name_popup._cTargetId				=null;
				name_popup._cTargetNumber	 	=null;
				name_popup._hideTimeoutId		=null;
			},1000);
		}
	}
	];

	name_popup.openDiv();
}

function show_name_popup(o){
	if(name_popup._hideTimeoutId){
		window.clearTimeout(name_popup._hideTimeoutId);
		name_popup._hideTimeoutId=null;
	}
	name_popup._cTarget					=o;
	name_popup._cTargetId				=o.getAttribute("userID");
	name_popup._cTargetNumber	 	=o.getAttribute("userNumber");
}

function hide_name_popup(){
	name_popup._hideTimeoutId=window.setTimeout(function(){
		name_popup._cTarget					=null;
		name_popup._cTargetId				=null;
		name_popup._cTargetNumber	 	=null;
		name_popup._hideTimeoutId		=null;
	},1000);
}

//name_popup操作

/*
个人
toHomepage	查看主页
toResume			查看简历
addFriend			加为好友
addEspial			观察名单/关注名单
sendMsg			发送信息
*/

/*
未登录
toHomepage	查看主页
toResume			查看简历
*/

name_popup._handler=function(action,id){
	keeper.load(
	"http://htm.jobui.com/script/objAjax.js",
	function(){
		hide_name_popup();
		if (!name_popup._cTarget) return false;
		ajaxPostDate(name_popup._ajaxUrl,"targetID="+id+"&formAction=name_"+action,function(o){
			eval(o.returnMessageText);
		});
	}
	);
}

name_popup.handler={
"toHomepage":function(){
	hide_name_popup();
	if(!name_popup._cTarget)return false;
	if(name_popup._cTarget.getAttribute("userDomain")){
		window.open("http://"+name_popup._cTarget.getAttribute('userDomain')+".jobui.com/");
	}else{
		name_popup._handler("toHomepage");
	}
},

"toResume":function(){
	hide_name_popup();
	if(!name_popup._cTarget)return false;
	if(name_popup._cTarget.getAttribute("userResumeID")){
		window.open("http://r.jobui.com/"+name_popup._cTarget.getAttribute('userResumeID')+"/resume.php");
	}else{
		name_popup._handler("toResume",name_popup._cTarget.getAttribute('userID'));
	}
},

"addFriend":function(){
	hide_name_popup();
	var id=name_popup._cTargetId;
	show_confirm_popup("确认加为好友吗？",function(){
		ajaxPostDate(name_popup._ajaxUrl,"targetID="+id+"&formAction=name_addFriend",function(o){show_info_popup(o.returnMessageText)});
	});
},

"addEspial":function(){
	hide_name_popup();
	var id=name_popup._cTargetId;
	show_confirm_popup("确定加入关注名单吗？",function(){
		ajaxPostDate(name_popup._ajaxUrl,"targetID="+id+"&formAction=name_addEspial",function(o){show_info_popup(o.returnMessageText)});
	});
},

"sendMsg":function(){
	hide_name_popup();
	var id=name_popup._cTargetId;
	ajaxPostDate(name_popup._ajaxUrl,"targetID="+id+"&formAction=name_isMe",function(o){
		if(o.returnMessageText=="1") {
			show_info_popup("e:不能发信息给自己。");
		} else {
			ajaxPostDate(name_popup._ajaxUrl,"targetID="+id+"&formAction=name_isFriend",function(o){
				switch(o.returnMessageText){
					case "0":
					show_confirm_popup("此人目前还不是好友一员，无法发送信息。是否先加为好友？",function(){
						ajaxPostDate(name_popup._ajaxUrl,"targetID="+id+"&formAction=name_addFriend",function(o){show_info_popup(o.returnMessageText)});
					});
					break;
					case "1":
					show_common_popup("http://www.jobui.com/personal_name_msg_personal.html?targetID="+id);
					break;
					default:
					show_common_popup("http://www.jobui.com/personal_name_msg_personal.html?targetID="+id);
					break;
				}
			});
		}//end if
	});// end ajaxPostDate
}
};

/* 来自原 objAjax.js 的东西 */

function ajaxObject() {
	/*
	gReturnMessage：返回内容类型，XML|TEXT
	targetArea：目标区域ID或对象
	URL：提交的地址
	dateVal：POST提交的提交参数
	actionMessage：提示框中的提示内容
	returnMessage：处理成功返回的内容
	doResponseMethod：处理方法
	*/
	this.objType = "POST";
	this.gReturnMessage = "TEXT";
	this.targetArea = "";
	this.URL = "";
	this.dateVal = "";
	this.actionMessage = "";
	this.returnMessage = "";
	this.doResponseMethod = "";
	this.xmlreq = false;
	this.returnMessageText ="";
	this.returnMessageXML = "";



	/*右边内容的类型 control.js */
	this.pageType = "";

	this.newXMLHttpRequest = function(){

		if (window.XMLHttpRequest) {
			try {
				xmlreq = new XMLHttpRequest();
			} catch (e1) {
				alert("HTTP error ");
			}
		} else {
			if (window.ActiveXObject) {
				try {
					xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e1) {
					try {
						xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch (e2) {
						xmlreq = false;
					}
				}
			}
		}
		return xmlreq;
	}

	/*
	actionMessage 提示内容框的内容
	*/
	this.getReadyStateHandler = function (xmlreq, obj) {
		/*(xmlreq, responseXmlHandler, gReturnMessage, targetArea, URL, actionMessage) {*/
		return function () {
			if (xmlreq.readyState == 4) {
				try {
					if (xmlreq.status == 200) {

						if(xmlreq.responseText == "-100") {
							top.location.reload();
						}
						if (obj.gReturnMessage == "TEXT") {
							obj.returnMessage = xmlreq.responseText.toString();
							obj.returnMessageText = xmlreq.responseText;
							obj.returnMessageXML = xmlreq.responseXML;
							obj.doResponseMethod(obj);
						} else {

							if(document.all){
								var xmlDomObject = xmlreq.responseXML;
							} else {
								var xmlDomObject = new DOMParser().parseFromString(xmlreq.responseText, "text/xml");
							}

							obj.returnMessage = xmlDomObject;
							obj.returnMessageText = xmlreq.responseText;
							obj.returnMessageXML = xmlDomObject;
							obj.doResponseMethod(obj);
						}
						if(document.getElementById("ajaxLoading")) {
							document.getElementById("ajaxLoading").style.display="NONE";
						}
					} else {
						/*if(obj.objType == "GET") {
						alert(obj.objType);
						this.ajaxGetDate(obj);
						} else if(obj.objType == "POST") {
						alert(obj.objType);
						this.ajaxPostDate(obj);
						} else{
						alert(xmlreq.status);
						}*/
						//return false;
						alert("HTTP error " + xmlreq.status + ": " + xmlreq.statusText+"："+obj.URL);
					}
				} catch(e) { }
			} else {
				if(document.getElementById("ajaxLoading")) {
					document.getElementById("ajaxLoading").style.display="";
				}
			}
		};
	}

	/*get方式取得数据*/
	this.ajaxGetDate = function(obj) {
		/*URL, processRequest, targetArea , gReturnMessage, actionMessage*/
		//alert("try get");
		if(document.getElementById("ajaxLoading")) {
			document.getElementById("ajaxLoading").style.display="";
		}
		obj.objType = "GET";
		obj.xmlreq = obj.newXMLHttpRequest();
		obj.xmlreq.onreadystatechange = obj.getReadyStateHandler(obj.xmlreq, obj);
		obj.xmlreq.open("GET", obj.URL, true);
		obj.xmlreq.send(null);
		delete (obj.xmlreq);
	}

	/*post方式取得数据*/
	this.ajaxPostDate = function(obj) {
		if(document.getElementById("ajaxLoading")) {
			document.getElementById("ajaxLoading").style.display="";
		}
		obj.objType = "POST";
		obj.xmlreq = obj.newXMLHttpRequest();
		obj.xmlreq.onreadystatechange = obj.getReadyStateHandler(obj.xmlreq, obj);
		obj.xmlreq.open("POST", obj.URL, true);
		obj.xmlreq.setRequestHeader("Method", "POST " + obj.URL + " HTTP/1.1");
		obj.xmlreq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		obj.xmlreq.setRequestHeader("Cache-Control", "no-cache");
		obj.xmlreq.setRequestHeader("Pragma", "no-cache");
		//alert(obj.doResponseMethod);
		obj.xmlreq.send(obj.dateVal);
		delete (obj.xmlreq);
	}


	/*内容插入页面中*/
	this.dataInsertPage = function (obj) {
		if(obj.targetArea) {
			if(document.getElementById("ajaxLoading")) {
				document.getElementById("ajaxLoading").style.display="NONE";
			}//调换了位置，即使<script>有问题也会隐掉ajax

			var regexp1 = /<script(.|\n)*?>(.|\n|\r\n)*?<\/script>/ig;
			var regexp2 = /<script(.|\n)*?>((.|\n|\r\n)*)?<\/script>/im;

			var message = obj.returnMessage;
			//alert(message);
			/* draw the html first */
			var returnMessage = message.replace(regexp1, "");

			document.getElementById(obj.targetArea).innerHTML = returnMessage;
			var result = message.match(regexp1);
			if (result) {
				for (var i = 0; i < result.length; i++) {
					var realScript = result[i].match(regexp2);
					//alert(obj.targetArea);
					_executeScript(realScript[2], obj.targetArea);
					/* Note: do not try to write more than one <script> in your view.*/
					/* break;  process only one script element */
				}
			}
			document.getElementById(obj.targetArea).style.display="";
		} else {
			if(document.getElementById("ajaxLoading")) {
				document.getElementById("ajaxLoading").style.display="NONE";
			}
			return true;
		}
		if(document.getElementById("ajaxLoading")) {
			document.getElementById("ajaxLoading").style.display="NONE";
		}

	}

	/*get方式取得数据并插入页面*/
	this.ajaxGetDateToPage = function (obj) {
		obj.doResponseMethod = obj.dataInsertPage;
		obj.gReturnMessage = "TEXT";
		obj.ajaxGetDate(obj);
	}
	/*Post方式取得数据并插入页面*/
	this.ajaxPostDateToPage = function (obj) {
		obj.doResponseMethod = obj.dataInsertPage;
		obj.gReturnMessage = "TEXT";
		obj.ajaxPostDate(obj);
	}

	/*处理element*/
	this.replaceElement = function (mtObj) {
		var xmldoc = mtObj.returnMessage;
		//alert(mtObj.returnMessageText);
		if(xmldoc.getElementsByTagName("elements").length > 0) {
			var rowNames = xmldoc.getElementsByTagName("elements");
			for(var ri=rowNames[0].childNodes.length-1; ri>=0; ri--) {
				if(rowNames[0].childNodes[ri].nodeType == 1) {
					elementValue = rowNames[0].childNodes[ri].firstChild.nodeValue;
					elementID = rowNames[0].childNodes[ri].getAttribute("elementID");
					elementType = rowNames[0].childNodes[ri].getAttribute("elementType");
					if(document.getElementById(elementID)) {
						if(elementType == "innerText") {
							if(navigator.appName.indexOf("Explorer") > -1){
								document.getElementById(elementID).innerText = elementValue;
							} else{
								document.getElementById(elementID).textContent = elementValue;
							}
						} else {

							if(document.getElementById(elementID)) {
								if(document.getElementById(elementID).type == "hidden" || document.getElementById(elementID).type == "text"  || document.getElementById(elementID).type == "textArea") {
									document.getElementById(elementID).value = elementValue;
								} else {
									document.getElementById(elementID).innerHTML = elementValue;
								}
							}
						}
					}
				}
			}
		}
		if(document.getElementById("ajaxLoading")) {
			document.getElementById("ajaxLoading").style.display="NONE";
		}
	}
}

/*get方式取得数据并插入页面*/
function ajaxGetDateToPage(URL, targetArea, actionMessage) {
	aoNew = new ajaxObject();
	aoNew.URL = URL;
	aoNew.targetArea = targetArea;
	aoNew.doResponseMethod = aoNew.dataInsertPage;
	aoNew.actionMessage = aoNew.actionMessage;
	aoNew.ajaxGetDate(aoNew);
}

//Post方式取得数据并插入页面
function ajaxPostDateToPage(URL, dateVal, targetArea, actionMessage) {
	aoNew = new ajaxObject();
	aoNew.URL = URL;
	aoNew.dateVal = dateVal;
	aoNew.targetArea = targetArea;
	aoNew.doResponseMethod = aoNew.dataInsertPage;
	aoNew.actionMessage = aoNew.actionMessage;
	aoNew.ajaxPostDate(aoNew);
}

/*get方式取得数据*/
function ajaxGetDate(URL, responseMethod, returnMessage) {
	aoNew = new ajaxObject();
	aoNew.URL = URL;
	aoNew.targetArea = null;
	aoNew.doResponseMethod = responseMethod;
	aoNew.gReturnMessage = returnMessage;
	aoNew.actionMessage = null;
	aoNew.ajaxGetDate(aoNew);

}
//Post方式取得数据
function ajaxPostDate(URL, dateVal, responseMethod, returnMessage) {
	aoNew = new ajaxObject();
	aoNew.URL = URL;
	aoNew.dateVal = dateVal;
	aoNew.targetArea = null;
	aoNew.doResponseMethod = responseMethod;
	aoNew.gReturnMessage = returnMessage;
	//alert(aoNew.doResponseMethod);
	aoNew.ajaxPostDate(aoNew);

}

/*处理element*/
function ajaxReplaceElement(URL, dateVal) {
	aoNew = new ajaxObject();
	aoNew.URL = URL;
	aoNew.gReturnMessage = "XML";
	aoNew.dateVal = dateVal;
	aoNew.doResponseMethod = aoNew.replaceElement;
	aoNew.ajaxPostDate(aoNew);
}