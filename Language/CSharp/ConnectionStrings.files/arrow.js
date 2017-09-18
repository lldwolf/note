var ns=document.all?false:true;
var dhtml=(document.all||document.layers)&&(navigator.platform.search(new RegExp("mac","gi"))>-1 || navigator.platform.search(new RegExp("win","gi"))>-1)?true:false;

if(dhtml){
var arrows=new Array();
var navs=new Array();
var y=99;
arrows[0]=new arrow_item(0,'./img/pil.gif',4,8,0,0.75,0.3);
navs[0]=new navpoint(0,-10,y,1,true);
navs[1]=new navpoint(0,3,y,0);
navs[2]=new navpoint(0,145,y,0);
navs[3]=new navpoint(0,279,y,0);
navs[4]=new navpoint(0,360,y,0);
navs[5]=new navpoint(0,469,y,0);
navs[6]=new navpoint(0,522,y,0);
}

if(dhtml){
var mac=navigator.platform.search(new RegExp("mac","gi"))>-1?true:false;
var win=navigator.platform.search(new RegExp("win","gi"))>-1?true:false;
if(ns){
window.captureEvents(Event.LOAD);
window.onLoad=startup;
}else{
window.onload=startup;
}
}
var mX=0;
function mousemove(e){
mX=ns?e.pageX:window.event.x;
for(a=0;a<arrows.length;a++){
teX=mX-20;
if(teX<navs[arrows[a].anav].x){
teX=navs[arrows[a].anav].x;
}
if(teX>navs[arrows[a].anav].x+navs[arrows[a].anav].spanX){
teX=navs[arrows[a].anav].x+navs[arrows[a].anav].spanX;
}
arrows[a].eX=teX;
}
}
function arrow_item(id,img,width,height,snav,grav1,grav2){
this.anav=0;
this.id=id;
this.img=img;
this.width=width;
this.height=height;
this.x=0;
this.y=0;
this.snav=snav;
this.sX=0;
this.sY=0;
this.eX=0;
this.eY=0;
this.evi=true;
this.grav1=grav1;
this.grav2=grav2;
this.rY=0;
this.fi=false;
this.createarrow=createarrow;
this.move=movearrow;
this.moveAround=movearrowAround;
this.snav=snav;
}
function createarrow(){
this.x=navs[this.snav].x;
this.y=navs[this.snav].y;
this.eX=this.x;
if(ns){
this.alayer=new Layer(this.width);
this.alayer.document.open();
this.alayer.document.write('<img src="'+this.img+'" border=0 width="'+this.width+'" height="'+this.height+'">');
this.alayer.document.close();
this.alayer.resizeTo(this.width,this.height);
this.alayer.moveTo(this.x,this.y);
this.alayer.visibility='show';
}else{
t='<div id="alayer'+this.id+'" style="position:absolute;visibility:visible;width:'+this.width+';height:'+this.height+';top:'+this.y+';left:'+this.x+';">';
t+='<img src="'+this.img+'" border=0 width="'+this.width+'" height="'+this.height+'">';
t+='</div>';
document.body.insertAdjacentHTML('BeforeEnd',t);
}
}
function startup(){
for(var a=0;a<arrows.length;a++){
arrows[a].createarrow();
}
setInterval('arrowmove();',5);
for(var a=0;a<arrows.length;a++){
goback(arrows[a].snav);
}
if(ns){
window.releaseEvents(Event.LOAD);
window.captureEvents(Event.MOUSEMOVE);
window.onMouseMove=mousemove;
}else{
document.onmousemove=mousemove;
}
}
function go(nav){
arrow=navs[nav].arrow;
arrows[arrow].anav=nav;
arrows[arrow].evi=!navs[nav].hidden;
if(arrows[arrow].fi){
arrows[arrow].sX=0;
arrows[arrow].fi=false;
}
}
function goback(nav){
arrow=navs[nav].arrow;
arrows[arrow].anav=arrows[arrow].snav;
arrows[arrow].evi=!navs[arrows[arrow].snav].hidden;
if(arrows[arrow].fi){
arrows[arrow].sX=0;
arrows[arrow].fi=false;
}
}
function arrowmove(){
for(var a=0;a<arrows.length;a++){
if(arrows[a].fi){
arrows[a].moveAround();
}else{
arrows[a].move();
}
}
}
function movearrowAround(){
if(ns){
this.alayer.visibility=this.y<0||!this.evi?'hide':'show';
this.alayer.moveTo(this.x+(0.7*Math.sin(this.sX))+(0.6*Math.sin(this.sY)),this.y);
}else{
document.all["alayer"+this.id].style.visibility=this.y<0||!this.evi?'hidden':'visible';
document.all["alayer"+this.id].style.top=this.y;
document.all["alayer"+this.id].style.left=this.x+(0.7*Math.sin(this.sX))+(0.6*Math.sin(this.sY));
}
if(this.eX!=Math.ceil(this.x)){
go(this.anav);
}
this.sX+=0.1;
this.sY+=0.13;
}
function movearrow(){
if(this.x>this.eX){
if(this.sX>0){
this.sX-=this.grav1;
}else{
if(this.sX<-2.5 && this.x-this.eX<40){
this.sX+=this.grav1;
}else{
this.sX-=this.grav2;
}
}
}
if(this.x<this.eX){
if(this.sX<0){
this.sX+=this.grav1;
}else{
if(this.sX>2.5 && this.eX-this.x<40){
this.sX-=this.grav1;
}else{
this.sX+=this.grav2;
}
}
}
if(this.x<0 && this.eX>=0){
this.sX=Math.abs(this.sX);
}
if(this.sX>4.5){this.sX=4.5;}
if(this.sX<-4.5){this.sX=-4.5;}
this.sX+=0.25*Math.cos(this.rY);
this.x+=this.sX;
this.rY+=0.06;
if(ns){
this.alayer.visibility=this.x<0?'hide':'show';
this.alayer.moveTo(this.x,this.y);
}else{
document.all["alayer"+this.id].style.visibility=this.x<0?'hidden':'visible';
document.all["alayer"+this.id].style.top=this.y+Math.cos(this.x/10)*5;//this.y;
document.all["alayer"+this.id].style.left=this.x;
}
if(this.sX>-0.7 && this.sX<0.7 && (this.x-this.eX)<1 && (this.x-this.eX)>-1){
this.x=this.eX;
this.sX=4.71;
this.sY=4.71;
this.fi=true;
}
}
function navpoint(arrow,x,y,spanX,hidden){
this.arrow=arrow;
this.x=x;
this.y=y;
this.spanX=spanX;
this.hidden=hidden;
}
