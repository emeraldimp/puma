/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
function dj_undef(_1,_2){
if(_2==null){
_2=dojo.global();
}
return (typeof _2[_1]=="undefined");
}
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo._currentContext=this;
if(!dj_undef("document",dojo._currentContext)){
dojo._currentDocument=this.document;
}
dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:Number("$Rev: 4525 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
return (_4&&!dj_undef(_3,_4)?_4[_3]:(_5?(_4[_3]={}):undefined));
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7!=null?_7:dj_global);
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_d,_e){
if(typeof _d!="string"){
return dj_global;
}
if(_d.indexOf(".")==-1){
return dojo.evalProp(_d,dj_global,_e);
}
var _f=dojo.parseObjPath(_d,dj_global,_e);
if(_f){
return dojo.evalProp(_f.prop,_f.obj,_e);
}
return null;
};
dojo.global=function(){
return dojo._currentContext;
};
dojo.doc=function(){
return dojo._currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.withGlobal=function(_10,_11,_12){
var _13=dojo._currentDocument;
var _14=dojo._currentContext;
var _15;
try{
dojo._currentContext=_10;
dojo._currentDocument=_10.document;
if(_12){
_15=dojo.lang.curryArguments(_12,_11,arguments,3);
}else{
_15=_11();
}
}
catch(e){
dojo._currentContext=_14;
dojo._currentDocument=_13;
throw e;
}
dojo._currentContext=_14;
dojo._currentDocument=_13;
return _15;
};
dojo.withDoc=function(_16,_17,_18){
var _19=this._currentDocument;
var _1a;
try{
dojo._currentDocument=_16;
if(_18){
_1a=dojo.lang.curryArguments(_18,_17,arguments,3);
}else{
_1a=_17();
}
}
catch(e){
dojo._currentDocument=_19;
throw e;
}
dojo._currentDocument=_19;
return _1a;
};
dojo.errorToString=function(_1b){
if(!dj_undef("message",_1b)){
return _1b.message;
}else{
if(!dj_undef("description",_1b)){
return _1b.description;
}else{
return _1b;
}
}
};
dojo.raise=function(_1c,_1d){
if(_1d){
_1c=_1c+": "+dojo.errorToString(_1d);
}
try{
dojo.hostenv.println("FATAL: "+_1c);
}
catch(e){
}
throw Error(_1c);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_1f){
return dj_global.eval?dj_global.eval(_1f):eval(_1f);
}
dojo.unimplemented=function(_20,_21){
var _22="'"+_20+"' not implemented";
if(_21!=null){
_22+=" "+_21;
}
dojo.raise(_22);
};
dojo.deprecated=function(_23,_24,_25){
var _26="DEPRECATED: "+_23;
if(_24){
_26+=" "+_24;
}
if(_25){
_26+=" -- will be removed in version: "+_25;
}
dojo.debug(_26);
};
dojo.inherits=function(_27,_28){
if(typeof _28!="function"){
dojo.raise("dojo.inherits: superclass argument ["+_28+"] must be a function (subclass: ["+_27+"']");
}
_27.prototype=new _28();
_27.prototype.constructor=_27;
_27.superclass=_28.prototype;
_27["super"]=_28.prototype;
};
dojo.render=(function(){
function vscaffold(_29,_2a){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_29};
for(var i=0;i<_2a.length;i++){
tmp[_2a[i]]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _2d={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_2d;
}else{
for(var _2e in _2d){
if(typeof djConfig[_2e]=="undefined"){
djConfig[_2e]=_2d[_2e];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _31=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _32={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_33,_34){
this.modulePrefixes_[_33]={name:_33,value:_34};
},getModulePrefix:function(_35){
var mp=this.modulePrefixes_;
if((mp[_35])&&(mp[_35]["name"])){
return mp[_35].value;
}
return _35;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _37 in _32){
dojo.hostenv[_37]=_32[_37];
}
})();
dojo.hostenv.loadPath=function(_38,_39,cb){
var uri;
if((_38.charAt(0)=="/")||(_38.match(/^\w+:/))){
uri=_38;
}else{
uri=this.getBaseScriptUri()+_38;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return ((!_39)?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_39,cb));
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return 1;
}
var _3e=this.getText(uri,null,true);
if(_3e==null){
return 0;
}
this.loadedUris[uri]=true;
if(cb){
_3e="("+_3e+")";
}
var _3f=dj_eval(_3e);
if(cb){
cb(_3f);
}
return 1;
};
dojo.hostenv.loadUriAndCheck=function(uri,_41,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return ((ok)&&(this.findModule(_41,false)))?true:false;
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_48){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_48]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_4b){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_4b]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if((this.loadUriStack.length==0)&&(this.getTextStack.length==0)){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_4d){
var _4e=_4d.split(".");
for(var i=_4e.length-1;i>0;i--){
var _50=_4e.slice(0,i).join(".");
var _51=this.getModulePrefix(_50);
if(_51!=_50){
_4e.splice(0,i,_51);
break;
}
}
return _4e;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_52,_53,_54){
if(!_52){
return;
}
_54=this._global_omit_module_check||_54;
var _55=this.findModule(_52,false);
if(_55){
return _55;
}
if(dj_undef(_52,this.loading_modules_)){
this.addedToLoadingCount.push(_52);
}
this.loading_modules_[_52]=1;
var _56=_52.replace(/\./g,"/")+".js";
var _57=_52.split(".");
if(djConfig.autoLoadNamespace){
dojo.getNamespace(_57[0]);
}
var _58=this.getModuleSymbols(_52);
var _59=((_58[0].charAt(0)!="/")&&(!_58[0].match(/^\w+:/)));
var _5a=_58[_58.length-1];
if(_5a=="*"){
_52=(_57.slice(0,-1)).join(".");
while(_58.length){
_58.pop();
_58.push(this.pkgFileName);
_56=_58.join("/")+".js";
if(_59&&(_56.charAt(0)=="/")){
_56=_56.slice(1);
}
ok=this.loadPath(_56,((!_54)?_52:null));
if(ok){
break;
}
_58.pop();
}
}else{
_56=_58.join("/")+".js";
_52=_57.join(".");
var ok=this.loadPath(_56,((!_54)?_52:null));
if((!ok)&&(!_53)){
_58.pop();
while(_58.length){
_56=_58.join("/")+".js";
ok=this.loadPath(_56,((!_54)?_52:null));
if(ok){
break;
}
_58.pop();
_56=_58.join("/")+"/"+this.pkgFileName+".js";
if(_59&&(_56.charAt(0)=="/")){
_56=_56.slice(1);
}
ok=this.loadPath(_56,((!_54)?_52:null));
if(ok){
break;
}
}
}
if((!ok)&&(!_54)){
dojo.raise("Could not load '"+_52+"'; last tried '"+_56+"'");
}
}
if(!_54&&!this["isXDomain"]){
_55=this.findModule(_52,false);
if(!_55){
dojo.raise("symbol '"+_52+"' is not defined after loading '"+_56+"'");
}
}
return _55;
};
dojo.hostenv.startPackage=function(_5c){
var _5d=dojo.evalObjPath((_5c.split(".").slice(0,-1)).join("."));
this.loaded_modules_[(new String(_5c)).toLowerCase()]=_5d;
var _5e=_5c.split(/\./);
if(_5e[_5e.length-1]=="*"){
_5e.pop();
}
return dojo.evalObjPath(_5e.join("."),true);
};
dojo.hostenv.findModule=function(_5f,_60){
var lmn=(new String(_5f)).toLowerCase();
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
var _62=dojo.evalObjPath(_5f);
if((_5f)&&(typeof _62!="undefined")&&(_62)){
this.loaded_modules_[lmn]=_62;
return _62;
}
if(_60){
dojo.raise("no loaded module named '"+_5f+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_63){
var _64=_63["common"]||[];
var _65=(_63[dojo.hostenv.name_])?_64.concat(_63[dojo.hostenv.name_]||[]):_64.concat(_63["default"]||[]);
for(var x=0;x<_65.length;x++){
var _67=_65[x];
if(_67.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_67);
}else{
dojo.hostenv.loadModule(_67);
}
}
};
dojo.require=function(){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(){
if((arguments[0]===true)||(arguments[0]=="common")||(arguments[0]&&dojo.render[arguments[0]].capable)){
var _68=[];
for(var i=1;i<arguments.length;i++){
_68.push(arguments[i]);
}
dojo.require.apply(dojo,_68);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.setModulePrefix=function(_6a,_6b){
return dojo.hostenv.setModulePrefix(_6a,_6b);
};
dojo.exists=function(obj,_6d){
var p=_6d.split(".");
for(var i=0;i<p.length;i++){
if(!(obj[p[i]])){
return false;
}
obj=obj[p[i]];
}
return true;
};
}
if(typeof window=="undefined"){
dojo.raise("no window object");
}
(function(){
if(djConfig.allowQueryConfig){
var _70=document.location.toString();
var _71=_70.split("?",2);
if(_71.length>1){
var _72=_71[1];
var _73=_72.split("&");
for(var x in _73){
var sp=_73[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _77=document.getElementsByTagName("script");
var _78=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_77.length;i++){
var src=_77[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_78);
if(m){
var _7c=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
_7c+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=_7c;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=_7c;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _84=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_84>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_84+6,_84+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
dojo.locale=(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
if(document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("org.w3c.dom.svg","1.0")){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _85=null;
var _86=null;
try{
_85=new XMLHttpRequest();
}
catch(e){
}
if(!_85){
for(var i=0;i<3;++i){
var _88=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
_85=new ActiveXObject(_88);
}
catch(e){
_86=e;
}
if(_85){
dojo.hostenv._XMLHTTP_PROGIDS=[_88];
break;
}
}
}
if(!_85){
return dojo.raise("XMLHTTP not available",_86);
}
return _85;
};
dojo.hostenv.getText=function(uri,_8a,_8b){
var _8c=this.getXmlhttpObject();
function isDocumentOk(_8d){
var _8e=_8d["status"];
return Boolean((!_8e)||((200<=_8e)&&(300>_8e))||(_8e==304));
}
if(_8a){
_8c.onreadystatechange=function(){
if(4==_8c.readyState){
if(isDocumentOk(_8c)){
_8a(_8c.responseText);
}
}
};
}
_8c.open("GET",uri,_8a?true:false);
try{
_8c.send(null);
if(_8a){
return null;
}
if(!isDocumentOk(_8c)){
var err=Error("Unable to load "+uri+" status:"+_8c.status);
err.status=_8c.status;
err.responseText=_8c.responseText;
throw err;
}
}
catch(e){
if((_8b)&&(!_8a)){
return null;
}else{
throw e;
}
}
return _8c.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_90){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_90);
}else{
try{
var _91=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_91){
_91=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_90));
_91.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_90+"</div>");
}
catch(e2){
window.status=_90;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_93,_94,fp,_96){
var _97=_93["on"+_94]||function(){
};
_93["on"+_94]=function(){
fp.apply(_93,arguments);
_97.apply(_93,arguments);
};
return true;
}
dj_addNodeEvtHdlr(window,"load",function(){
if(arguments.callee.initialized){
return;
}
arguments.callee.initialized=true;
var _98=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_98();
dojo.hostenv.modulesLoaded();
}else{
dojo.addOnLoad(_98);
}
});
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
});
dojo.hostenv.makeWidgets=function(){
var _99=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_99=_99.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_99=_99.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_99.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _9a=new dojo.xml.Parse();
if(_99.length>0){
for(var x=0;x<_99.length;x++){
var _9c=document.getElementById(_99[x]);
if(!_9c){
continue;
}
var _9d=_9a.parseElement(_9c,null,true);
dojo.widget.getParser().createComponents(_9d);
}
}else{
if(djConfig.parseWidgets){
var _9d=_9a.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(_9d);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
dojo.byId=function(id,doc){
if(id&&(typeof id=="string"||id instanceof String)){
if(!doc){
doc=dojo.doc();
}
return doc.getElementById(id);
}
return id;
};
(function(){
if(typeof dj_usingBootstrap!="undefined"){
return;
}
var _a0=false;
var _a1=false;
var _a2=false;
if((typeof this["load"]=="function")&&((typeof this["Packages"]=="function")||(typeof this["Packages"]=="object"))){
_a0=true;
}else{
if(typeof this["load"]=="function"){
_a1=true;
}else{
if(window.widget){
_a2=true;
}
}
}
var _a3=[];
if((this["djConfig"])&&((djConfig["isDebug"])||(djConfig["debugAtAllCosts"]))){
_a3.push("debug.js");
}
if((this["djConfig"])&&(djConfig["debugAtAllCosts"])&&(!_a0)&&(!_a2)){
_a3.push("browser_debug.js");
}
if((this["djConfig"])&&(djConfig["compat"])){
_a3.push("compat/"+djConfig["compat"]+".js");
}
var _a4=djConfig["baseScriptUri"];
if((this["djConfig"])&&(djConfig["baseLoaderUri"])){
_a4=djConfig["baseLoaderUri"];
}
for(var x=0;x<_a3.length;x++){
var _a6=_a4+"src/"+_a3[x];
if(_a0||_a1){
load(_a6);
}else{
try{
document.write("<scr"+"ipt type='text/javascript' src='"+_a6+"'></scr"+"ipt>");
}
catch(e){
var _a7=document.createElement("script");
_a7.src=_a6;
document.getElementsByTagName("head")[0].appendChild(_a7);
}
}
}
})();
dojo.fallback_locale="en";
dojo.normalizeLocale=function(_a8){
return _a8?_a8.toLowerCase():dojo.locale;
};
dojo.requireLocalization=function(_a9,_aa,_ab){
dojo.debug("EXPERIMENTAL: dojo.requireLocalization");
var _ac=dojo.hostenv.getModuleSymbols(_a9);
var _ad=_ac.concat("nls").join("/");
_ab=dojo.normalizeLocale(_ab);
var _ae=_ab.split("-");
var _af=[];
for(var i=_ae.length;i>0;i--){
_af.push(_ae.slice(0,i).join("-"));
}
if(_af[_af.length-1]!=dojo.fallback_locale){
_af.push(dojo.fallback_locale);
}
var _b1=[_a9,"_nls",_aa].join(".");
var _b2=dojo.hostenv.startPackage(_b1);
dojo.hostenv.loaded_modules_[_b1]=_b2;
var _b3=false;
for(var i=_af.length-1;i>=0;i--){
var loc=_af[i];
var pkg=[_b1,loc].join(".");
var _b6=false;
if(!dojo.hostenv.findModule(pkg)){
dojo.hostenv.loaded_modules_[pkg]=null;
var _b7=[_ad,loc,_aa].join("/")+".js";
_b6=dojo.hostenv.loadPath(_b7,null,function(_b8){
_b2[loc]=_b8;
if(_b3){
for(var _b9 in _b3){
if(!_b2[loc][_b9]){
_b2[loc][_b9]=_b3[_b9];
}
}
}
});
}else{
_b6=true;
}
if(_b6&&_b2[loc]){
_b3=_b2[loc];
}
}
};
dojo.Namespace=function(_ba,_bb,_bc,_bd){
this.root=_ba;
this.location=_bb;
this.nsPrefix=_bc;
this.resolver=_bd;
dojo.setModulePrefix(_bc,_bb);
};
dojo.Namespace.prototype.loaded=[];
dojo.Namespace.prototype.load=function(_be,_bf){
if(this.resolver){
var _c0=this.resolver(_be,_bf);
if(_c0&&!this.loaded[_c0]){
var req=dojo.require;
req(_c0);
this.loaded[_c0]=true;
}
if(this.loaded[_c0]){
return true;
}
}
return false;
};
djConfig.namespaces=[];
djConfig.loadingNamespaces={};
djConfig.failedNamespaces=[];
dojo.defineNamespace=function(_c2,_c3,_c4,_c5,_c6){
if(djConfig.namespaces[_c2]){
return;
}
var ns=new dojo.Namespace(_c2,_c3,_c4,_c5);
djConfig.namespaces[_c2]=ns;
if(_c4){
djConfig.namespaces[_c4]=ns;
}
if(_c6){
dojo.widget.manager.registerWidgetPackage(_c6);
}
};
dojo.getNamespace=function(_c8){
if(!djConfig.namespaces[_c8]&&!djConfig.failedNamespaces[_c8]){
var req=dojo.require;
var _ca="dojo.namespaces."+_c8;
if(!djConfig.loadingNamespaces[_ca]){
djConfig.loadingNamespaces[_ca]=true;
req(_ca,false,true);
djConfig.loadingNamespaces[_ca]=false;
if(!djConfig.namespaces[_c8]){
djConfig.failedNamespaces[_c8]=true;
}
}
}
return djConfig.namespaces[_c8];
};
dojo.provide("dojo.lang.common");
dojo.require("dojo.lang");
dojo.lang._mixin=function(obj,_cc){
var _cd={};
for(var x in _cc){
if(typeof _cd[x]=="undefined"||_cd[x]!=_cc[x]){
obj[x]=_cc[x];
}
}
if(dojo.render.html.ie&&dojo.lang.isFunction(_cc["toString"])&&_cc["toString"]!=obj["toString"]){
obj.toString=_cc.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_d0){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_d2,_d3){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_d2.prototype,arguments[i]);
}
return _d2;
};
dojo.lang.find=function(_d5,_d6,_d7,_d8){
if(!dojo.lang.isArrayLike(_d5)&&dojo.lang.isArrayLike(_d6)){
var _d9=_d5;
_d5=_d6;
_d6=_d9;
}
var _da=dojo.lang.isString(_d5);
if(_da){
_d5=_d5.split("");
}
if(_d8){
var _db=-1;
var i=_d5.length-1;
var end=-1;
}else{
var _db=1;
var i=0;
var end=_d5.length;
}
if(_d7){
while(i!=end){
if(_d5[i]===_d6){
return i;
}
i+=_db;
}
}else{
while(i!=end){
if(_d5[i]==_d6){
return i;
}
i+=_db;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_de,_df,_e0){
return dojo.lang.find(_de,_df,_e0,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_e1,_e2){
return dojo.lang.find(_e1,_e2)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if(typeof it!="undefined"&&it&&dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
if(!it){
return false;
}
return (it instanceof Function||typeof it=="function");
};
dojo.lang.isString=function(it){
return (it instanceof String||typeof it=="string");
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction()&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((it==undefined)&&(typeof it=="undefined"));
};
dojo.provide("dojo.lang");
dojo.provide("dojo.lang.Lang");
dojo.require("dojo.lang.common");
dojo.provide("dojo.animation.AnimationEvent");
dojo.require("dojo.lang");
dojo.animation.AnimationEvent=function(_ec,_ed,_ee,_ef,_f0,_f1,_f2,_f3,fps){
this.type=_ed;
this.animation=_ec;
this.coords=_ee;
this.x=_ee[0];
this.y=_ee[1];
this.z=_ee[2];
this.startTime=_ef;
this.currentTime=_f0;
this.endTime=_f1;
this.duration=_f2;
this.percent=_f3;
this.fps=fps;
};
dojo.lang.extend(dojo.animation.AnimationEvent,{coordsAsInts:function(){
var _f5=new Array(this.coords.length);
for(var i=0;i<this.coords.length;i++){
_f5[i]=Math.round(this.coords[i]);
}
return _f5;
}});
dojo.provide("dojo.lang.func");
dojo.require("dojo.lang.common");
dojo.lang.hitch=function(_f7,_f8){
if(dojo.lang.isString(_f8)){
var fcn=_f7[_f8];
}else{
var fcn=_f8;
}
return function(){
return fcn.apply(_f7,arguments);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_fa,_fb,_fc){
var nso=(_fb||dojo.lang.anon);
if((_fc)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
if(nso[x]===_fa){
return x;
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_fa;
return ret;
};
dojo.lang.forward=function(_100){
return function(){
return this[_100].apply(this,arguments);
};
};
dojo.lang.curry=function(ns,func){
var _103=[];
ns=ns||dj_global;
if(dojo.lang.isString(func)){
func=ns[func];
}
for(var x=2;x<arguments.length;x++){
_103.push(arguments[x]);
}
var _105=(func["__preJoinArity"]||func.length)-_103.length;
function gather(_106,_107,_108){
var _109=_108;
var _10a=_107.slice(0);
for(var x=0;x<_106.length;x++){
_10a.push(_106[x]);
}
_108=_108-_106.length;
if(_108<=0){
var res=func.apply(ns,_10a);
_108=_109;
return res;
}else{
return function(){
return gather(arguments,_10a,_108);
};
}
}
return gather([],_103,_105);
};
dojo.lang.curryArguments=function(ns,func,args,_110){
var _111=[];
var x=_110||0;
for(x=_110;x<args.length;x++){
_111.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[ns,func].concat(_111));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_117,_118){
if(!farr.length){
if(typeof _118=="function"){
_118();
}
return;
}
if((typeof _117=="undefined")&&(typeof cb=="number")){
_117=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_117){
_117=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_117,_118);
},_117);
};
dojo.provide("dojo.math");
dojo.math.degToRad=function(x){
return (x*Math.PI)/180;
};
dojo.math.radToDeg=function(x){
return (x*180)/Math.PI;
};
dojo.math.factorial=function(n){
if(n<1){
return 0;
}
var _11c=1;
for(var i=1;i<=n;i++){
_11c*=i;
}
return _11c;
};
dojo.math.permutations=function(n,k){
if(n==0||k==0){
return 1;
}
return (dojo.math.factorial(n)/dojo.math.factorial(n-k));
};
dojo.math.combinations=function(n,r){
if(n==0||r==0){
return 1;
}
return (dojo.math.factorial(n)/(dojo.math.factorial(n-r)*dojo.math.factorial(r)));
};
dojo.math.bernstein=function(t,n,i){
return (dojo.math.combinations(n,i)*Math.pow(t,i)*Math.pow(1-t,n-i));
};
dojo.math.gaussianRandom=function(){
var k=2;
do{
var i=2*Math.random()-1;
var j=2*Math.random()-1;
k=i*i+j*j;
}while(k>=1);
k=Math.sqrt((-2*Math.log(k))/k);
return i*k;
};
dojo.math.mean=function(){
var _128=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
var mean=0;
for(var i=0;i<_128.length;i++){
mean+=_128[i];
}
return mean/_128.length;
};
dojo.math.round=function(_12b,_12c){
if(!_12c){
var _12d=1;
}else{
var _12d=Math.pow(10,_12c);
}
return Math.round(_12b*_12d)/_12d;
};
dojo.math.sd=function(){
var _12e=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
return Math.sqrt(dojo.math.variance(_12e));
};
dojo.math.variance=function(){
var _12f=dojo.lang.isArray(arguments[0])?arguments[0]:arguments;
var mean=0,squares=0;
for(var i=0;i<_12f.length;i++){
mean+=_12f[i];
squares+=Math.pow(_12f[i],2);
}
return (squares/_12f.length)-Math.pow(mean/_12f.length,2);
};
dojo.math.range=function(a,b,step){
if(arguments.length<2){
b=a;
a=0;
}
if(arguments.length<3){
step=1;
}
var _135=[];
if(step>0){
for(var i=a;i<b;i+=step){
_135.push(i);
}
}else{
if(step<0){
for(var i=a;i>b;i+=step){
_135.push(i);
}
}else{
throw new Error("dojo.math.range: step must be non-zero");
}
}
return _135;
};
dojo.provide("dojo.math.curves");
dojo.require("dojo.math");
dojo.math.curves={Line:function(_137,end){
this.start=_137;
this.end=end;
this.dimensions=_137.length;
for(var i=0;i<_137.length;i++){
_137[i]=Number(_137[i]);
}
for(var i=0;i<end.length;i++){
end[i]=Number(end[i]);
}
this.getValue=function(n){
var _13b=new Array(this.dimensions);
for(var i=0;i<this.dimensions;i++){
_13b[i]=((this.end[i]-this.start[i])*n)+this.start[i];
}
return _13b;
};
return this;
},Bezier:function(pnts){
this.getValue=function(step){
if(step>=1){
return this.p[this.p.length-1];
}
if(step<=0){
return this.p[0];
}
var _13f=new Array(this.p[0].length);
for(var k=0;j<this.p[0].length;k++){
_13f[k]=0;
}
for(var j=0;j<this.p[0].length;j++){
var C=0;
var D=0;
for(var i=0;i<this.p.length;i++){
C+=this.p[i][j]*this.p[this.p.length-1][0]*dojo.math.bernstein(step,this.p.length,i);
}
for(var l=0;l<this.p.length;l++){
D+=this.p[this.p.length-1][0]*dojo.math.bernstein(step,this.p.length,l);
}
_13f[j]=C/D;
}
return _13f;
};
this.p=pnts;
return this;
},CatmullRom:function(pnts,c){
this.getValue=function(step){
var _149=step*(this.p.length-1);
var node=Math.floor(_149);
var _14b=_149-node;
var i0=node-1;
if(i0<0){
i0=0;
}
var i=node;
var i1=node+1;
if(i1>=this.p.length){
i1=this.p.length-1;
}
var i2=node+2;
if(i2>=this.p.length){
i2=this.p.length-1;
}
var u=_14b;
var u2=_14b*_14b;
var u3=_14b*_14b*_14b;
var _153=new Array(this.p[0].length);
for(var k=0;k<this.p[0].length;k++){
var x1=(-this.c*this.p[i0][k])+((2-this.c)*this.p[i][k])+((this.c-2)*this.p[i1][k])+(this.c*this.p[i2][k]);
var x2=(2*this.c*this.p[i0][k])+((this.c-3)*this.p[i][k])+((3-2*this.c)*this.p[i1][k])+(-this.c*this.p[i2][k]);
var x3=(-this.c*this.p[i0][k])+(this.c*this.p[i1][k]);
var x4=this.p[i][k];
_153[k]=x1*u3+x2*u2+x3*u+x4;
}
return _153;
};
if(!c){
this.c=0.7;
}else{
this.c=c;
}
this.p=pnts;
return this;
},Arc:function(_159,end,ccw){
var _15c=dojo.math.points.midpoint(_159,end);
var _15d=dojo.math.points.translate(dojo.math.points.invert(_15c),_159);
var rad=Math.sqrt(Math.pow(_15d[0],2)+Math.pow(_15d[1],2));
var _15f=dojo.math.radToDeg(Math.atan(_15d[1]/_15d[0]));
if(_15d[0]<0){
_15f-=90;
}else{
_15f+=90;
}
dojo.math.curves.CenteredArc.call(this,_15c,rad,_15f,_15f+(ccw?-180:180));
},CenteredArc:function(_160,_161,_162,end){
this.center=_160;
this.radius=_161;
this.start=_162||0;
this.end=end;
this.getValue=function(n){
var _165=new Array(2);
var _166=dojo.math.degToRad(this.start+((this.end-this.start)*n));
_165[0]=this.center[0]+this.radius*Math.sin(_166);
_165[1]=this.center[1]-this.radius*Math.cos(_166);
return _165;
};
return this;
},Circle:function(_167,_168){
dojo.math.curves.CenteredArc.call(this,_167,_168,0,360);
return this;
},Path:function(){
var _169=[];
var _16a=[];
var _16b=[];
var _16c=0;
this.add=function(_16d,_16e){
if(_16e<0){
dojo.raise("dojo.math.curves.Path.add: weight cannot be less than 0");
}
_169.push(_16d);
_16a.push(_16e);
_16c+=_16e;
computeRanges();
};
this.remove=function(_16f){
for(var i=0;i<_169.length;i++){
if(_169[i]==_16f){
_169.splice(i,1);
_16c-=_16a.splice(i,1)[0];
break;
}
}
computeRanges();
};
this.removeAll=function(){
_169=[];
_16a=[];
_16c=0;
};
this.getValue=function(n){
var _172=false,value=0;
for(var i=0;i<_16b.length;i++){
var r=_16b[i];
if(n>=r[0]&&n<r[1]){
var subN=(n-r[0])/r[2];
value=_169[i].getValue(subN);
_172=true;
break;
}
}
if(!_172){
value=_169[_169.length-1].getValue(1);
}
for(var j=0;j<i;j++){
value=dojo.math.points.translate(value,_169[j].getValue(1));
}
return value;
};
function computeRanges(){
var _177=0;
for(var i=0;i<_16a.length;i++){
var end=_177+_16a[i]/_16c;
var len=end-_177;
_16b[i]=[_177,end,len];
_177=end;
}
}
return this;
}};
dojo.provide("dojo.animation.Animation");
dojo.require("dojo.animation.AnimationEvent");
dojo.require("dojo.lang.func");
dojo.require("dojo.math");
dojo.require("dojo.math.curves");
dojo.animation.Animation=function(_17b,_17c,_17d,_17e,rate){
if(dojo.lang.isArray(_17b)){
_17b=new dojo.math.curves.Line(_17b[0],_17b[1]);
}
this.curve=_17b;
this.duration=_17c;
this.repeatCount=_17e||0;
this.rate=rate||25;
if(_17d){
if(dojo.lang.isFunction(_17d.getValue)){
this.accel=_17d;
}else{
var i=0.35*_17d+0.5;
this.accel=new dojo.math.curves.CatmullRom([[0],[i],[1]],0.45);
}
}
};
dojo.lang.extend(dojo.animation.Animation,{curve:null,duration:0,repeatCount:0,accel:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,handler:null,_animSequence:null,_startTime:null,_endTime:null,_lastFrame:null,_timer:null,_percent:0,_active:false,_paused:false,_startRepeatCount:0,play:function(_181){
if(_181){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return;
}
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._lastFrame=this._startTime;
var e=new dojo.animation.AnimationEvent(this,null,this.curve.getValue(this._percent),this._startTime,this._startTime,this._endTime,this.duration,this._percent,0);
this._active=true;
this._paused=false;
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
e.type="begin";
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onBegin=="function"){
this.onBegin(e);
}
}
e.type="play";
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onPlay=="function"){
this.onPlay(e);
}
if(this._animSequence){
this._animSequence._setCurrent(this);
}
this._cycle();
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return;
}
this._paused=true;
var e=new dojo.animation.AnimationEvent(this,"pause",this.curve.getValue(this._percent),this._startTime,new Date().valueOf(),this._endTime,this.duration,this._percent,0);
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onPause=="function"){
this.onPause(e);
}
},playPause:function(){
if(!this._active||this._paused){
this.play();
}else{
this.pause();
}
},gotoPercent:function(pct,_185){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_185){
this.play();
}
},stop:function(_186){
clearTimeout(this._timer);
var step=this._percent/100;
if(_186){
step=1;
}
var e=new dojo.animation.AnimationEvent(this,"stop",this.curve.getValue(step),this._startTime,new Date().valueOf(),this._endTime,this.duration,this._percent);
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onStop=="function"){
this.onStop(e);
}
this._active=false;
this._paused=false;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
var fps=1000/(curr-this._lastFrame);
this._lastFrame=curr;
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if(this.accel&&this.accel.getValue){
step=this.accel.getValue(step);
}
var e=new dojo.animation.AnimationEvent(this,"animate",this.curve.getValue(step),this._startTime,curr,this._endTime,this.duration,this._percent,Math.round(fps));
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onAnimate=="function"){
this.onAnimate(e);
}
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
e.type="end";
this._active=false;
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onEnd=="function"){
this.onEnd(e);
}
if(this.repeatCount>0){
this.repeatCount--;
this.play(true);
}else{
if(this.repeatCount==-1){
this.play(true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
if(this._animSequence){
this._animSequence._playNext();
}
}
}
}
}
}});
dojo.provide("dojo.animation.AnimationSequence");
dojo.require("dojo.animation.AnimationEvent");
dojo.require("dojo.animation.Animation");
dojo.animation.AnimationSequence=function(_18d){
this._anims=[];
this.repeatCount=_18d||0;
};
dojo.lang.extend(dojo.animation.AnimationSequence,{repeatCount:0,_anims:[],_currAnim:-1,onBegin:null,onEnd:null,onNext:null,handler:null,add:function(){
for(var i=0;i<arguments.length;i++){
this._anims.push(arguments[i]);
arguments[i]._animSequence=this;
}
},remove:function(anim){
for(var i=0;i<this._anims.length;i++){
if(this._anims[i]==anim){
this._anims[i]._animSequence=null;
this._anims.splice(i,1);
break;
}
}
},removeAll:function(){
for(var i=0;i<this._anims.length;i++){
this._anims[i]._animSequence=null;
}
this._anims=[];
this._currAnim=-1;
},clear:function(){
this.removeAll();
},play:function(_192){
if(this._anims.length==0){
return;
}
if(_192||!this._anims[this._currAnim]){
this._currAnim=0;
}
if(this._anims[this._currAnim]){
if(this._currAnim==0){
var e={type:"begin",animation:this._anims[this._currAnim]};
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onBegin=="function"){
this.onBegin(e);
}
}
this._anims[this._currAnim].play(_192);
}
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
}
},playPause:function(){
if(this._anims.length==0){
return;
}
if(this._currAnim==-1){
this._currAnim=0;
}
if(this._anims[this._currAnim]){
this._anims[this._currAnim].playPause();
}
},stop:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].stop();
}
},status:function(){
if(this._anims[this._currAnim]){
return this._anims[this._currAnim].status();
}else{
return "stopped";
}
},_setCurrent:function(anim){
for(var i=0;i<this._anims.length;i++){
if(this._anims[i]==anim){
this._currAnim=i;
break;
}
}
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return;
}
this._currAnim++;
if(this._anims[this._currAnim]){
var e={type:"next",animation:this._anims[this._currAnim]};
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onNext=="function"){
this.onNext(e);
}
this._anims[this._currAnim].play(true);
}else{
var e={type:"end",animation:this._anims[this._anims.length-1]};
if(typeof this.handler=="function"){
this.handler(e);
}
if(typeof this.onEnd=="function"){
this.onEnd(e);
}
if(this.repeatCount>0){
this._currAnim=0;
this.repeatCount--;
this._anims[this._currAnim].play(true);
}else{
if(this.repeatCount==-1){
this._currAnim=0;
this._anims[this._currAnim].play(true);
}else{
this._currAnim=-1;
}
}
}
}});
dojo.kwCompoundRequire({common:["dojo.animation.AnimationEvent","dojo.animation.Animation","dojo.animation.AnimationSequence"]});
dojo.provide("dojo.animation.*");
dojo.provide("dojo.lang.array");
dojo.require("dojo.lang.common");
dojo.lang.has=function(obj,name){
try{
return (typeof obj[name]!="undefined");
}
catch(e){
return false;
}
};
dojo.lang.isEmpty=function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _19b=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_19b++;
break;
}
}
return (_19b==0);
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
};
dojo.lang.map=function(arr,obj,_19f){
var _1a0=dojo.lang.isString(arr);
if(_1a0){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_19f)){
_19f=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_19f){
var _1a1=obj;
obj=_19f;
_19f=_1a1;
}
}
if(Array.map){
var _1a2=Array.map(arr,_19f,obj);
}else{
var _1a2=[];
for(var i=0;i<arr.length;++i){
_1a2.push(_19f.call(obj,arr[i]));
}
}
if(_1a0){
return _1a2.join("");
}else{
return _1a2;
}
};
dojo.lang.forEach=function(_1a4,_1a5,_1a6){
if(dojo.lang.isString(_1a4)){
_1a4=_1a4.split("");
}
if(Array.forEach){
Array.forEach(_1a4,_1a5,_1a6);
}else{
if(!_1a6){
_1a6=dj_global;
}
for(var i=0,l=_1a4.length;i<l;i++){
_1a5.call(_1a6,_1a4[i],i,_1a4);
}
}
};
dojo.lang._everyOrSome=function(_1a8,arr,_1aa,_1ab){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[(_1a8)?"every":"some"](arr,_1aa,_1ab);
}else{
if(!_1ab){
_1ab=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _1ad=_1aa.call(_1ab,arr[i],i,arr);
if((_1a8)&&(!_1ad)){
return false;
}else{
if((!_1a8)&&(_1ad)){
return true;
}
}
}
return (_1a8)?true:false;
}
};
dojo.lang.every=function(arr,_1af,_1b0){
return this._everyOrSome(true,arr,_1af,_1b0);
};
dojo.lang.some=function(arr,_1b2,_1b3){
return this._everyOrSome(false,arr,_1b2,_1b3);
};
dojo.lang.filter=function(arr,_1b5,_1b6){
var _1b7=dojo.lang.isString(arr);
if(_1b7){
arr=arr.split("");
}
if(Array.filter){
var _1b8=Array.filter(arr,_1b5,_1b6);
}else{
if(!_1b6){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_1b6=dj_global;
}
var _1b8=[];
for(var i=0;i<arr.length;i++){
if(_1b5.call(_1b6,arr[i],i,arr)){
_1b8.push(arr[i]);
}
}
}
if(_1b7){
return _1b8.join("");
}else{
return _1b8;
}
};
dojo.lang.unnest=function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
};
dojo.lang.toArray=function(_1bd,_1be){
var _1bf=[];
for(var i=_1be||0;i<_1bd.length;i++){
_1bf.push(_1bd[i]);
}
return _1bf;
};
dojo.provide("dojo.dom");
dojo.require("dojo.lang.array");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="object"){
try{
return wh instanceof Element;
}
catch(E){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getTagName=function(node){
dojo.deprecated("dojo.dom.getTagName","use node.tagName instead","0.4");
var _1c3=node.tagName;
if(_1c3.substr(0,5).toLowerCase()!="dojo:"){
if(_1c3.substr(0,4).toLowerCase()=="dojo"){
return "dojo:"+_1c3.substring(4).toLowerCase();
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((node.getAttributeNS)&&(node.getAttributeNS(this.dojoml,"type"))){
return "dojo:"+node.getAttributeNS(this.dojoml,"type").toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((!dj_global["djConfig"])||(!djConfig["ignoreClassNames"])){
var _1c5=node.className||node.getAttribute("class");
if((_1c5)&&(_1c5.indexOf)&&(_1c5.indexOf("dojo-")!=-1)){
var _1c6=_1c5.split(" ");
for(var x=0;x<_1c6.length;x++){
if((_1c6[x].length>5)&&(_1c6[x].indexOf("dojo-")>=0)){
return "dojo:"+_1c6[x].substr(5).toLowerCase();
}
}
}
}
}
return _1c3.toLowerCase();
};
dojo.dom.getUniqueId=function(){
var _1c8=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_1c8.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_1ca,_1cb){
var node=_1ca.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_1cb&&node&&node.tagName&&node.tagName.toLowerCase()!=_1cb.toLowerCase()){
node=dojo.dom.nextElement(node,_1cb);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_1cd,_1ce){
var node=_1cd.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_1ce&&node&&node.tagName&&node.tagName.toLowerCase()!=_1ce.toLowerCase()){
node=dojo.dom.prevElement(node,_1ce);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_1d1){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_1d1&&_1d1.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_1d1);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_1d3){
if(!node){
return null;
}
if(_1d3){
_1d3=_1d3.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_1d3&&_1d3.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_1d3);
}
return node;
};
dojo.dom.moveChildren=function(_1d4,_1d5,trim){
var _1d7=0;
if(trim){
while(_1d4.hasChildNodes()&&_1d4.firstChild.nodeType==dojo.dom.TEXT_NODE){
_1d4.removeChild(_1d4.firstChild);
}
while(_1d4.hasChildNodes()&&_1d4.lastChild.nodeType==dojo.dom.TEXT_NODE){
_1d4.removeChild(_1d4.lastChild);
}
}
while(_1d4.hasChildNodes()){
_1d5.appendChild(_1d4.firstChild);
_1d7++;
}
return _1d7;
};
dojo.dom.copyChildren=function(_1d8,_1d9,trim){
var _1db=_1d8.cloneNode(true);
return this.moveChildren(_1db,_1d9,trim);
};
dojo.dom.removeChildren=function(node){
var _1dd=node.childNodes.length;
while(node.hasChildNodes()){
node.removeChild(node.firstChild);
}
return _1dd;
};
dojo.dom.replaceChildren=function(node,_1df){
dojo.dom.removeChildren(node);
node.appendChild(_1df);
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_1e2,_1e3){
var _1e4=[];
var _1e5=dojo.lang.isFunction(_1e2);
while(node){
if(!_1e5||_1e2(node)){
_1e4.push(node);
}
if(_1e3&&_1e4.length>0){
return _1e4[0];
}
node=node.parentNode;
}
if(_1e3){
return null;
}
return _1e4;
};
dojo.dom.getAncestorsByTag=function(node,tag,_1e8){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_1e8);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_1ed,_1ee){
if(_1ee&&node){
node=node.parentNode;
}
while(node){
if(node==_1ed){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _1f1=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _1f2=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_1f2.length;i++){
try{
doc=new ActiveXObject(_1f2[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_1f1.implementation)&&(_1f1.implementation.createDocument)){
doc=_1f1.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_1f5){
if(!_1f5){
_1f5="text/xml";
}
if(!dj_undef("DOMParser")){
var _1f6=new DOMParser();
return _1f6.parseFromString(str,_1f5);
}else{
if(!dj_undef("ActiveXObject")){
var _1f7=dojo.dom.createDocument();
if(_1f7){
_1f7.async=false;
_1f7.loadXML(str);
return _1f7;
}else{
dojo.debug("toXml didn't work?");
}
}else{
_document=dojo.doc();
if(_document.createElement){
var tmp=_document.createElement("xml");
tmp.innerHTML=str;
if(_document.implementation&&_document.implementation.createDocument){
var _1f9=_document.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_1f9.importNode(tmp.childNodes.item(i),true);
}
return _1f9;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_1fc){
if(_1fc.firstChild){
_1fc.insertBefore(node,_1fc.firstChild);
}else{
_1fc.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_1ff){
if(_1ff!=true&&(node===ref||node.nextSibling===ref)){
return false;
}
var _200=ref.parentNode;
_200.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_203){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_203!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_203);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_207){
if((!node)||(!ref)||(!_207)){
return false;
}
switch(_207.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_209,_20a){
var _20b=_209.childNodes;
if(!_20b.length){
_209.appendChild(node);
return true;
}
var _20c=null;
for(var i=0;i<_20b.length;i++){
var _20e=_20b.item(i)["getAttribute"]?parseInt(_20b.item(i).getAttribute("dojoinsertionindex")):-1;
if(_20e<_20a){
_20c=_20b.item(i);
}
}
if(_20c){
return dojo.dom.insertAfter(node,_20c);
}else{
return dojo.dom.insertBefore(node,_20b.item(0));
}
};
dojo.dom.textContent=function(node,text){
if(text){
var _211=dojo.doc();
dojo.dom.replaceChildren(node,_211.createTextNode(text));
return text;
}else{
var _212="";
if(node==null){
return _212;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_212+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_212+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _212;
}
};
dojo.dom.collectionToArray=function(_214){
dojo.deprecated("dojo.dom.collectionToArray","use dojo.lang.toArray instead","0.4");
return dojo.lang.toArray(_214);
};
dojo.dom.hasParent=function(node){
return node&&node.parentNode&&dojo.dom.isNode(node.parentNode);
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
var arr=dojo.lang.toArray(arguments,1);
return arr[dojo.lang.find(node.tagName,arr)]||"";
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_219,_21a,_21b){
if(elem==null||dojo.lang.isUndefined(elem)){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(dojo.lang.isUndefined(elem.setAttributeNS)==false){
elem.setAttributeNS(_219,_21a,_21b);
}else{
var _21c=elem.ownerDocument;
var _21d=_21c.createNode(2,_21a,_219);
_21d.nodeValue=_21b;
elem.setAttributeNode(_21d);
}
};
dojo.provide("dojo.lang.extras");
dojo.require("dojo.lang.common");
dojo.lang.setTimeout=function(func,_21f){
var _220=window,argsStart=2;
if(!dojo.lang.isFunction(func)){
_220=func;
func=_21f;
_21f=arguments[2];
argsStart++;
}
if(dojo.lang.isString(func)){
func=_220[func];
}
var args=[];
for(var i=argsStart;i<arguments.length;i++){
args.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
func.apply(_220,args);
},_21f);
};
dojo.lang.clearTimeout=function(_223){
dojo.global().clearTimeout(_223);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj){
var ret={},key;
for(key in obj){
if(dojo.lang.isUndefined(ret[key])){
ret[key]=obj[key];
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_22a,_22b,_22c){
with(dojo.parseObjPath(_22a,_22b,_22c)){
return dojo.evalProp(prop,obj,_22c);
}
};
dojo.lang.setObjPathValue=function(_22d,_22e,_22f,_230){
if(arguments.length<4){
_230=true;
}
with(dojo.parseObjPath(_22d,_22f,_230)){
if(obj&&(_230||(prop in obj))){
obj[prop]=_22e;
}
}
};
dojo.provide("dojo.event");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.extras");
dojo.require("dojo.lang.func");
dojo.event=new function(){
this.canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_232){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _235=dl.nameAnonFunc(args[2],ao.adviceObj,_232);
ao.adviceFunc=_235;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _235=dl.nameAnonFunc(args[0],ao.srcObj,_232);
ao.srcFunc=_235;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _235=dl.nameAnonFunc(args[1],dj_global,_232);
ao.srcFunc=_235;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _235=dl.nameAnonFunc(args[3],dj_global,_232);
ao.adviceObj=dj_global;
ao.adviceFunc=_235;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _235=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_232);
ao.aroundFunc=_235;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _237={};
for(var x in ao){
_237[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_237.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_237));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _23f;
if((arguments.length==1)&&(typeof a1=="object")){
_23f=a1;
}else{
_23f={srcObj:a1,srcFunc:a2};
}
_23f.adviceFunc=function(){
var _240=[];
for(var x=0;x<arguments.length;x++){
_240.push(arguments[x]);
}
dojo.debug("("+_23f.srcObj+")."+_23f.srcFunc,":",_240.join(", "));
};
this.kwConnect(_23f);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this._kwConnectImpl=function(_247,_248){
var fn=(_248)?"disconnect":"connect";
if(typeof _247["srcFunc"]=="function"){
_247.srcObj=_247["srcObj"]||dj_global;
var _24a=dojo.lang.nameAnonFunc(_247.srcFunc,_247.srcObj,true);
_247.srcFunc=_24a;
}
if(typeof _247["adviceFunc"]=="function"){
_247.adviceObj=_247["adviceObj"]||dj_global;
var _24a=dojo.lang.nameAnonFunc(_247.adviceFunc,_247.adviceObj,true);
_247.adviceFunc=_24a;
}
return dojo.event[fn]((_247["type"]||_247["adviceType"]||"after"),_247["srcObj"]||dj_global,_247["srcFunc"],_247["adviceObj"]||_247["targetObj"]||dj_global,_247["adviceFunc"]||_247["targetFunc"],_247["aroundObj"],_247["aroundFunc"],_247["once"],_247["delay"],_247["rate"],_247["adviceMsg"]||false);
};
this.kwConnect=function(_24b){
return this._kwConnectImpl(_24b,false);
};
this.disconnect=function(){
var ao=interpolateArgs(arguments,true);
if(!ao.adviceFunc){
return;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
return mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
};
this.kwDisconnect=function(_24e){
return this._kwConnectImpl(_24e,true);
};
};
dojo.event.MethodInvocation=function(_24f,obj,args){
this.jp_=_24f;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_257){
this.object=obj||dj_global;
this.methodname=_257;
this.methodfunc=this.object[_257];
this.before=[];
this.after=[];
this.around=[];
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_259){
if(!obj){
obj=dj_global;
}
if(!obj[_259]){
obj[_259]=function(){
};
if(!obj[_259]){
dojo.raise("Cannot set do-nothing method on that object "+_259);
}
}else{
if((!dojo.lang.isFunction(obj[_259]))&&(!dojo.lang.isAlien(obj[_259]))){
return null;
}
}
var _25a=_259+"$joinpoint";
var _25b=_259+"$joinpoint$method";
var _25c=obj[_25a];
if(!_25c){
var _25d=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_25d=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_25a,_25b,_259]);
}
}
var _25e=obj[_259].length;
obj[_25b]=obj[_259];
_25c=obj[_25a]=new dojo.event.MethodJoinPoint(obj,_25b);
obj[_259]=function(){
var args=[];
if((_25d)&&(!arguments.length)){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
evt=window.event;
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(_25d)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _25c.run.apply(_25c,args);
};
obj[_259].__preJoinArity=_25e;
}
return _25c;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _264=[];
for(var x=0;x<args.length;x++){
_264[x]=args[x];
}
var _266=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _268=marr[0]||dj_global;
var _269=marr[1];
if(!_268[_269]){
dojo.raise("function \""+_269+"\" does not exist on \""+_268+"\"");
}
var _26a=marr[2]||dj_global;
var _26b=marr[3];
var msg=marr[6];
var _26d;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _268[_269].apply(_268,to.args);
}};
to.args=_264;
var _26f=parseInt(marr[4]);
var _270=((!isNaN(_26f))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _273=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event.canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_266(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_26b){
_26a[_26b].call(_26a,to);
}else{
if((_270)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_268[_269].call(_268,to);
}else{
_268[_269].apply(_268,args);
}
},_26f);
}else{
if(msg){
_268[_269].call(_268,to);
}else{
_268[_269].apply(_268,args);
}
}
}
};
if(this.before.length>0){
dojo.lang.forEach(this.before.concat(new Array()),_266);
}
var _276;
if(this.around.length>0){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_276=mi.proceed();
}else{
if(this.methodfunc){
_276=this.object[this.methodname].apply(this.object,args);
}
}
if(this.after.length>0){
dojo.lang.forEach(this.after.concat(new Array()),_266);
}
return (this.methodfunc)?_276:null;
},getArr:function(kind){
var arr=this.after;
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
arr=this.before;
}else{
if(kind=="around"){
arr=this.around;
}
}
return arr;
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"]);
},addAdvice:function(_27b,_27c,_27d,_27e,_27f,_280,once,_282,rate,_284){
var arr=this.getArr(_27f);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_27b,_27c,_27d,_27e,_282,rate,_284];
if(once){
if(this.hasAdvice(_27b,_27c,_27f,arr)>=0){
return;
}
}
if(_280=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_287,_288,_289,arr){
if(!arr){
arr=this.getArr(_289);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _288=="object")?(new String(_288)).toString():_288;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_287)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_28f,_290,_291,once){
var arr=this.getArr(_291);
var ind=this.hasAdvice(_28f,_290,_291,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_28f,_290,_291,arr);
}
return true;
}});
dojo.require("dojo.event");
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_295){
if(!this.topics[_295]){
this.topics[_295]=new this.TopicImpl(_295);
}
return this.topics[_295];
};
this.registerPublisher=function(_296,obj,_298){
var _296=this.getTopic(_296);
_296.registerPublisher(obj,_298);
};
this.subscribe=function(_299,obj,_29b){
var _299=this.getTopic(_299);
_299.subscribe(obj,_29b);
};
this.unsubscribe=function(_29c,obj,_29e){
var _29c=this.getTopic(_29c);
_29c.unsubscribe(obj,_29e);
};
this.destroy=function(_29f){
this.getTopic(_29f).destroy();
delete this.topics[_29f];
};
this.publishApply=function(_2a0,args){
var _2a0=this.getTopic(_2a0);
_2a0.sendMessage.apply(_2a0,args);
};
this.publish=function(_2a2,_2a3){
var _2a2=this.getTopic(_2a2);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_2a2.sendMessage.apply(_2a2,args);
};
};
dojo.event.topic.TopicImpl=function(_2a6){
this.topicName=_2a6;
this.subscribe=function(_2a7,_2a8){
var tf=_2a8||_2a7;
var to=(!_2a8)?dj_global:_2a7;
dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_2ab,_2ac){
var tf=(!_2ac)?_2ab:_2ac;
var to=(!_2ac)?null:_2ab;
dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.destroy=function(){
dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage").disconnect();
};
this.registerPublisher=function(_2af,_2b0){
dojo.event.connect(_2af,_2b0,this,"sendMessage");
};
this.sendMessage=function(_2b1){
};
};
dojo.provide("dojo.event.browser");
dojo.require("dojo.event");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_2b4){
var na;
var tna;
if(_2b4){
tna=_2b4.all||_2b4.getElementsByTagName("*");
na=[_2b4];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _2b8={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
if(el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _2bc=0;
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_2c0){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_2c0.length;x++){
node.__clobberAttrs__.push(_2c0[x]);
}
};
this.removeListener=function(node,_2c3,fp,_2c5){
if(!_2c5){
var _2c5=false;
}
_2c3=_2c3.toLowerCase();
if(_2c3.substr(0,2)=="on"){
_2c3=_2c3.substr(2);
}
if(node.removeEventListener){
node.removeEventListener(_2c3,fp,_2c5);
}
};
this.addListener=function(node,_2c7,fp,_2c9,_2ca){
if(!node){
return;
}
if(!_2c9){
var _2c9=false;
}
_2c7=_2c7.toLowerCase();
if(_2c7.substr(0,2)!="on"){
_2c7="on"+_2c7;
}
if(!_2ca){
var _2cb=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_2c9){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_2cb=fp;
}
if(node.addEventListener){
node.addEventListener(_2c7.substr(2),_2cb,_2c9);
return _2cb;
}else{
if(typeof node[_2c7]=="function"){
var _2ce=node[_2c7];
node[_2c7]=function(e){
_2ce(e);
return _2cb(e);
};
}else{
node[_2c7]=_2cb;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_2c7]);
}
return _2cb;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_2d1,_2d2){
if(typeof _2d1!="function"){
dojo.raise("listener not a function: "+_2d1);
}
dojo.event.browser.currentEvent.currentTarget=_2d2;
return _2d1.call(_2d2,dojo.event.browser.currentEvent);
};
this.stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this.preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_2d5){
if((!evt)&&(window["event"])){
var evt=window.event;
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if((dojo.render.html.ie)&&(evt["type"]=="keypress")){
evt.charCode=evt.keyCode;
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_2d5?_2d5:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var _2d7=((dojo.render.html.ie55)||(document["compatMode"]=="BackCompat"))?document.body:document.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_2d7.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_2d7.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this.stopPropagation;
evt.preventDefault=this.preventDefault;
}
return evt;
};
this.stopEvent=function(ev){
if(window.event){
ev.returnValue=false;
ev.cancelBubble=true;
}else{
ev.preventDefault();
ev.stopPropagation();
}
};
};
dojo.kwCompoundRequire({common:["dojo.event","dojo.event.topic"],browser:["dojo.event.browser"],dashboard:["dojo.event.browser"]});
dojo.provide("dojo.event.*");
dojo.provide("dojo.string.common");
dojo.require("dojo.string");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_2df,_2e0){
var out="";
for(var i=0;i<_2df;i++){
out+=str;
if(_2e0&&i<_2df-1){
out+=_2e0;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string");
dojo.require("dojo.string.common");
dojo.provide("dojo.io.IO");
dojo.require("dojo.string");
dojo.require("dojo.lang.extras");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_2ef,_2f0,_2f1){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_2ef){
this.mimetype=_2ef;
}
if(_2f0){
this.transport=_2f0;
}
if(arguments.length>=4){
this.changeUrl=_2f1;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,evt){
},error:function(type,_2f6){
},timeout:function(type){
},handle:function(){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_2f8){
if(_2f8["url"]){
_2f8.url=_2f8.url.toString();
}
if(_2f8["formNode"]){
_2f8.formNode=dojo.byId(_2f8.formNode);
}
if(!_2f8["method"]&&_2f8["formNode"]&&_2f8["formNode"].method){
_2f8.method=_2f8["formNode"].method;
}
if(!_2f8["handle"]&&_2f8["handler"]){
_2f8.handle=_2f8.handler;
}
if(!_2f8["load"]&&_2f8["loaded"]){
_2f8.load=_2f8.loaded;
}
if(!_2f8["changeUrl"]&&_2f8["changeURL"]){
_2f8.changeUrl=_2f8.changeURL;
}
_2f8.encoding=dojo.lang.firstValued(_2f8["encoding"],djConfig["bindEncoding"],"");
_2f8.sendTransport=dojo.lang.firstValued(_2f8["sendTransport"],djConfig["ioSendTransport"],false);
var _2f9=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_2f9(_2f8[fn])){
continue;
}
if(_2f9(_2f8["handle"])){
_2f8[fn]=_2f8.handle;
}
}
dojo.lang.mixin(this,_2f8);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_300){
if(!(_300 instanceof dojo.io.Request)){
try{
_300=new dojo.io.Request(_300);
}
catch(e){
dojo.debug(e);
}
}
var _301="";
if(_300["transport"]){
_301=_300["transport"];
if(!this[_301]){
return _300;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_300))){
_301=tmp;
}
}
if(_301==""){
return _300;
}
}
this[_301].bind(_300);
_300.bindSuccess=true;
return _300;
};
dojo.io.queueBind=function(_304){
if(!(_304 instanceof dojo.io.Request)){
try{
_304=new dojo.io.Request(_304);
}
catch(e){
dojo.debug(e);
}
}
var _305=_304.load;
_304.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_305.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _307=_304.error;
_304.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_307.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_304);
dojo.io._dispatchNextQueueBind();
return _304;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_30a,last){
var enc=/utf/i.test(_30a||"")?encodeURIComponent:dojo.string.encodeAscii;
var _30d=[];
var _30e=new Object();
for(var name in map){
var _310=function(elt){
var val=enc(name)+"="+enc(elt);
_30d[(last==name)?"push":"unshift"](val);
};
if(!_30e[name]){
var _313=map[name];
if(dojo.lang.isArray(_313)){
dojo.lang.forEach(_313,_310);
}else{
_310(_313);
}
}
}
return _30d.join("&");
};
dojo.io.setIFrameSrc=function(_314,src,_316){
try{
var r=dojo.render.html;
if(!_316){
if(r.safari){
_314.location=src;
}else{
frames[_314.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_314.contentWindow.document;
}else{
if(r.safari){
idoc=_314.document;
}else{
idoc=_314.contentWindow;
}
}
if(!idoc){
_314.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.string.extras");
dojo.require("dojo.string.common");
dojo.require("dojo.lang.common");
dojo.require("dojo.lang.array");
dojo.string.substituteParams=function(_319,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _319.replace(/\%\{(\w+)\}/g,function(_31c,key){
return map[key]||dojo.raise("Substitution not found: "+key);
});
};
dojo.string.paramString=function(str,_31f,_320){
dojo.deprecated("dojo.string.paramString","use dojo.string.substituteParams instead","0.4");
for(var name in _31f){
var re=new RegExp("\\%\\{"+name+"\\}","g");
str=str.replace(re,_31f[name]);
}
if(_320){
str=str.replace(/%\{([^\}\s]+)\}/g,"");
}
return str;
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _324=str.split(" ");
for(var i=0;i<_324.length;i++){
_324[i]=_324[i].charAt(0).toUpperCase()+_324[i].substring(1);
}
return _324.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _329=escape(str);
var _32a,re=/%u([0-9A-F]{4})/i;
while((_32a=_329.match(re))){
var num=Number("0x"+_32a[1]);
var _32c=escape("&#"+num+";");
ret+=_329.substring(0,_32a.index)+_32c;
_329=_329.substring(_32a.index+_32a[0].length);
}
ret+=_329.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_331){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_331){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}else{
return str.substring(0,len).replace(/\.+$/,"")+"...";
}
};
dojo.string.endsWith=function(str,end,_33a){
if(_33a){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_33e,_33f){
if(_33f){
str=str.toLowerCase();
_33e=_33e.toLowerCase();
}
return str.indexOf(_33e)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_345){
if(_345=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_345=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n");
text=text.replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_347){
var _348=[];
for(var i=0,prevcomma=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_347){
_348.push(str.substring(prevcomma,i));
prevcomma=i+1;
}
}
_348.push(str.substr(prevcomma));
return _348;
};
dojo.provide("dojo.undo.browser");
dojo.require("dojo.io");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:window.location.href,initialHash:window.location.hash,moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState={"url":this.initialHref,"kwArgs":args,"urlHash":this.initialHash};
},addToHistory:function(args){
var hash=null;
if(!this.historyIframe){
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if((!args["changeUrl"])||(dojo.render.html.ie)){
var url=dojo.hostenv.getBaseScriptUri()+"iframe_history.html?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
}
if(args["changeUrl"]){
this.changingUrl=true;
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
var _34e=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_350){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_34e.apply(this,[_350]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
this.forwardStack=[];
var _351=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_353){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_351){
_351.apply(this,[_353]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}
this.historyStack.push({"url":url,"kwArgs":args,"urlHash":hash});
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_356){
if(!dojo.render.html.opera){
var _357=this._getUrlQuery(_356.href);
if(_357==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_357==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_357==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _358=this.historyStack.pop();
if(!_358){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_358);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_getUrlQuery:function(url){
var _35c=url.split("?");
if(_35c.length<2){
return null;
}else{
return _35c[1];
}
}};
dojo.provide("dojo.io.BrowserIO");
dojo.require("dojo.io");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.func");
dojo.require("dojo.string.extras");
dojo.require("dojo.dom");
dojo.require("dojo.undo.browser");
dojo.io.checkChildrenForFile=function(node){
var _35e=false;
var _35f=node.getElementsByTagName("input");
dojo.lang.forEach(_35f,function(_360){
if(_35e){
return;
}
if(_360.getAttribute("type")=="file"){
_35e=true;
}
});
return _35e;
};
dojo.io.formHasFile=function(_361){
return dojo.io.checkChildrenForFile(_361);
};
dojo.io.updateNode=function(node,_363){
node=dojo.byId(node);
var args=_363;
if(dojo.lang.isString(_363)){
args={url:_363};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
if(dojo["event"]){
try{
dojo.event.browser.clean(node.firstChild);
}
catch(e){
}
}
node.removeChild(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(type,["file","submit","image","reset","button"]);
};
dojo.io.encodeForm=function(_36a,_36b,_36c){
if((!_36a)||(!_36a.tagName)||(!_36a.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_36c){
_36c=dojo.io.formFilter;
}
var enc=/utf/i.test(_36b||"")?encodeURIComponent:dojo.string.encodeAscii;
var _36e=[];
for(var i=0;i<_36a.elements.length;i++){
var elm=_36a.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_36c(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_36e.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(type,["radio","checkbox"])){
if(elm.checked){
_36e.push(name+"="+enc(elm.value));
}
}else{
_36e.push(name+"="+enc(elm.value));
}
}
}
var _374=_36a.getElementsByTagName("input");
for(var i=0;i<_374.length;i++){
var _375=_374[i];
if(_375.type.toLowerCase()=="image"&&_375.form==_36a&&_36c(_375)){
var name=enc(_375.name);
_36e.push(name+"="+enc(_375.value));
_36e.push(name+".x=0");
_36e.push(name+".y=0");
}
}
return _36e.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(node.type.toLowerCase(),["submit","button"])){
this.connect(node,"onclick","click");
}
}
var _37b=form.getElementsByTagName("input");
for(var i=0;i<_37b.length;i++){
var _37c=_37b[i];
if(_37c.type.toLowerCase()=="image"&&_37c.form==form){
this.connect(_37c,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _383=false;
if(node.disabled||!node.name){
_383=false;
}else{
if(dojo.lang.inArray(type,["submit","button","image"])){
if(!this.clickedButton){
this.clickedButton=node;
}
_383=node==this.clickedButton;
}else{
_383=!dojo.lang.inArray(type,["file","submit","reset","button"]);
}
}
return _383;
},connect:function(_384,_385,_386){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_384,_385,this,_386);
}else{
var fcn=dojo.lang.hitch(this,_386);
_384[_385]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _389=this;
var _38a={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_38c,_38d){
return url+"|"+_38c+"|"+_38d.toLowerCase();
}
function addToCache(url,_38f,_390,http){
_38a[getCacheKey(url,_38f,_390)]=http;
}
function getFromCache(url,_393,_394){
return _38a[getCacheKey(url,_393,_394)];
}
this.clearCache=function(){
_38a={};
};
function doLoad(_395,http,url,_398,_399){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_395.method.toLowerCase()=="head"){
var _39b=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _39b;
};
var _39c=_39b.split(/[\r\n]+/g);
for(var i=0;i<_39c.length;i++){
var pair=_39c[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_395.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_395.mimetype=="text/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_395.mimetype=="application/xml")||(_395.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_399){
addToCache(url,_398,_395.method,http);
}
_395[(typeof _395.load=="function")?"load":"handle"]("load",ret,http,_395);
}else{
var _39f=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_395[(typeof _395.error=="function")?"error":"handle"]("error",_39f,http,_395);
}
}
function setHeaders(http,_3a1){
if(_3a1["headers"]){
for(var _3a2 in _3a1["headers"]){
if(_3a2.toLowerCase()=="content-type"&&!_3a1["contentType"]){
_3a1["contentType"]=_3a1["headers"][_3a2];
}else{
http.setRequestHeader(_3a2,_3a1["headers"][_3a2]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setInterval("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
for(var x=this.inFlight.length-1;x>=0;x--){
var tif=this.inFlight[x];
if(!tif){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
if(this.inFlight.length==0){
clearInterval(this.inFlightTimer);
this.inFlightTimer=null;
}
};
var _3a6=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_3a7){
return _3a6&&dojo.lang.inArray((_3a7["mimetype"].toLowerCase()||""),["text/plain","text/html","application/xml","text/xml","text/javascript","text/json"])&&!(_3a7["formNode"]&&dojo.io.formHasFile(_3a7["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_3a8){
if(!_3a8["url"]){
if(!_3a8["formNode"]&&(_3a8["backButton"]||_3a8["back"]||_3a8["changeUrl"]||_3a8["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_3a8);
return true;
}
}
var url=_3a8.url;
var _3aa="";
if(_3a8["formNode"]){
var ta=_3a8.formNode.getAttribute("action");
if((ta)&&(!_3a8["url"])){
url=ta;
}
var tp=_3a8.formNode.getAttribute("method");
if((tp)&&(!_3a8["method"])){
_3a8.method=tp;
}
_3aa+=dojo.io.encodeForm(_3a8.formNode,_3a8.encoding,_3a8["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_3a8["file"]){
_3a8.method="post";
}
if(!_3a8["method"]){
_3a8.method="get";
}
if(_3a8.method.toLowerCase()=="get"){
_3a8.multipart=false;
}else{
if(_3a8["file"]){
_3a8.multipart=true;
}else{
if(!_3a8["multipart"]){
_3a8.multipart=false;
}
}
}
if(_3a8["backButton"]||_3a8["back"]||_3a8["changeUrl"]){
dojo.undo.browser.addToHistory(_3a8);
}
var _3ad=_3a8["content"]||{};
if(_3a8.sendTransport){
_3ad["dojo.transport"]="xmlhttp";
}
do{
if(_3a8.postContent){
_3aa=_3a8.postContent;
break;
}
if(_3ad){
_3aa+=dojo.io.argsFromMap(_3ad,_3a8.encoding);
}
if(_3a8.method.toLowerCase()=="get"||!_3a8.multipart){
break;
}
var t=[];
if(_3aa.length){
var q=_3aa.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_3a8.file){
if(dojo.lang.isArray(_3a8.file)){
for(var i=0;i<_3a8.file.length;++i){
var o=_3a8.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_3a8.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_3aa=t.join("\r\n");
}
}while(false);
var _3b3=_3a8["sync"]?false:true;
var _3b4=_3a8["preventCache"]||(this.preventCache==true&&_3a8["preventCache"]!=false);
var _3b5=_3a8["useCache"]==true||(this.useCache==true&&_3a8["useCache"]!=false);
if(!_3b4&&_3b5){
var _3b6=getFromCache(url,_3aa,_3a8.method);
if(_3b6){
doLoad(_3a8,_3b6,url,_3aa,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_3a8);
var _3b8=false;
if(_3b3){
var _3b9=this.inFlight.push({"req":_3a8,"http":http,"url":url,"query":_3aa,"useCache":_3b5,"startTime":_3a8.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}
if(_3a8.method.toLowerCase()=="post"){
http.open("POST",url,_3b3);
setHeaders(http,_3a8);
http.setRequestHeader("Content-Type",_3a8.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_3a8.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_3aa);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_3a8,{status:404},url,_3aa,_3b5);
}
}else{
var _3ba=url;
if(_3aa!=""){
_3ba+=(_3ba.indexOf("?")>-1?"&":"?")+_3aa;
}
if(_3b4){
_3ba+=(dojo.string.endsWithAny(_3ba,"?","&")?"":(_3ba.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
http.open(_3a8.method.toUpperCase(),_3ba,_3b3);
setHeaders(http,_3a8);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_3a8,{status:404},url,_3aa,_3b5);
}
}
if(!_3b3){
doLoad(_3a8,http,url,_3aa,_3b5);
}
_3a8.abort=function(){
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_3bc,days,path,_3bf,_3c0){
var _3c1=-1;
if(typeof days=="number"&&days>=0){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_3c1=d.toGMTString();
}
_3bc=escape(_3bc);
document.cookie=name+"="+_3bc+";"+(_3c1!=-1?" expires="+_3c1+";":"")+(path?"path="+path:"")+(_3bf?"; domain="+_3bf:"")+(_3c0?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _3c5=document.cookie.substring(idx+name.length+1);
var end=_3c5.indexOf(";");
if(end==-1){
end=_3c5.length;
}
_3c5=_3c5.substring(0,end);
_3c5=unescape(_3c5);
return _3c5;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_3cc,_3cd,_3ce){
if(arguments.length==5){
_3ce=_3cc;
_3cc=null;
_3cd=null;
}
var _3cf=[],cookie,value="";
if(!_3ce){
cookie=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!cookie){
cookie={};
}
for(var prop in obj){
if(prop==null){
delete cookie[prop];
}else{
if(typeof obj[prop]=="string"||typeof obj[prop]=="number"){
cookie[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in cookie){
_3cf.push(escape(prop)+"="+escape(cookie[prop]));
}
value=_3cf.join("&");
}
dojo.io.cookie.setCookie(name,value,days,path,_3cc,_3cd);
};
dojo.io.cookie.getObjectCookie=function(name){
var _3d2=null,cookie=dojo.io.cookie.getCookie(name);
if(cookie){
_3d2={};
var _3d3=cookie.split("&");
for(var i=0;i<_3d3.length;i++){
var pair=_3d3[i].split("=");
var _3d6=pair[1];
if(isNaN(_3d6)){
_3d6=unescape(pair[1]);
}
_3d2[unescape(pair[0])]=_3d6;
}
}
return _3d2;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _3d7=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_3d7=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.kwCompoundRequire({common:["dojo.io"],rhino:["dojo.io.RhinoIO"],browser:["dojo.io.BrowserIO","dojo.io.cookie"],dashboard:["dojo.io.BrowserIO","dojo.io.cookie"]});
dojo.provide("dojo.io.*");
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.joinPath=function(){
dojo.deprecated("dojo.uri.joinPath","use the dojo.uri.Uri object instead","0.4");
var arr=[];
for(var i=0;i<arguments.length;i++){
arr.push(arguments[i]);
}
return arr.join("/").replace(/\/{2,}/g,"/").replace(/((https*|ftps*):)/i,"$1/");
};
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.nsUri=function(_3db,uri){
var ns=dojo.getNamespace(_3db);
if(!ns){
return null;
}
var loc=ns.location;
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri()+loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _3e1=new dojo.uri.Uri(arguments[i].toString());
var _3e2=new dojo.uri.Uri(uri.toString());
if(_3e1.path==""&&_3e1.scheme==null&&_3e1.authority==null&&_3e1.query==null){
if(_3e1.fragment!=null){
_3e2.fragment=_3e1.fragment;
}
_3e1=_3e2;
}else{
if(_3e1.scheme==null){
_3e1.scheme=_3e2.scheme;
if(_3e1.authority==null){
_3e1.authority=_3e2.authority;
if(_3e1.path.charAt(0)!="/"){
var path=_3e2.path.substring(0,_3e2.path.lastIndexOf("/")+1)+_3e1.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_3e1.path=segs.join("/");
}
}
}
}
uri="";
if(_3e1.scheme!=null){
uri+=_3e1.scheme+":";
}
if(_3e1.authority!=null){
uri+="//"+_3e1.authority;
}
uri+=_3e1.path;
if(_3e1.query!=null){
uri+="?"+_3e1.query;
}
if(_3e1.fragment!=null){
uri+="#"+_3e1.fragment;
}
}
this.uri=uri.toString();
var _3e6="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_3e6));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_3e6="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_3e6));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.kwCompoundRequire({common:["dojo.uri.Uri",false,false]});
dojo.provide("dojo.uri.*");
dojo.provide("dojo.graphics.color");
dojo.require("dojo.lang.array");
dojo.graphics.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.graphics.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.graphics.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.graphics.color.Color.fromArray=function(arr){
return new dojo.graphics.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.lang.extend(dojo.graphics.color.Color,{toRgb:function(_3ee){
if(_3ee){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.graphics.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_3ef,_3f0){
return dojo.graphics.color.blend(this.toRgb(),new dojo.graphics.color.Color(_3ef).toRgb(),_3f0);
}});
dojo.graphics.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.graphics.color.blend=function(a,b,_3f3){
if(typeof a=="string"){
return dojo.graphics.color.blendHex(a,b,_3f3);
}
if(!_3f3){
_3f3=0;
}else{
if(_3f3>1){
_3f3=1;
}else{
if(_3f3<-1){
_3f3=-1;
}
}
}
var c=new Array(3);
for(var i=0;i<3;i++){
var half=Math.abs(a[i]-b[i])/2;
c[i]=Math.floor(Math.min(a[i],b[i])+half+(half*_3f3));
}
return c;
};
dojo.graphics.color.blendHex=function(a,b,_3f9){
return dojo.graphics.color.rgb2hex(dojo.graphics.color.blend(dojo.graphics.color.hex2rgb(a),dojo.graphics.color.hex2rgb(b),_3f9));
};
dojo.graphics.color.extractRGB=function(_3fa){
var hex="0123456789abcdef";
_3fa=_3fa.toLowerCase();
if(_3fa.indexOf("rgb")==0){
var _3fc=_3fa.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_3fc.splice(1,3);
return ret;
}else{
var _3fe=dojo.graphics.color.hex2rgb(_3fa);
if(_3fe){
return _3fe;
}else{
return dojo.graphics.color.named[_3fa]||[255,255,255];
}
}
};
dojo.graphics.color.hex2rgb=function(hex){
var _400="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_400+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_400.indexOf(rgb[i].charAt(0))*16+_400.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.graphics.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.style");
dojo.require("dojo.graphics.color");
dojo.require("dojo.uri.Uri");
dojo.require("dojo.lang.common");
(function(){
var h=dojo.render.html;
var ds=dojo.style;
var db=document["body"]||document["documentElement"];
ds.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
var bs=ds.boxSizing;
ds.getBoxSizing=function(node){
if((h.ie)||(h.opera)){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _40f=ds.getStyle(node,"-moz-box-sizing");
if(!_40f){
_40f=ds.getStyle(node,"box-sizing");
}
return (_40f?_40f:bs.CONTENT_BOX);
}
};
ds.isBorderBox=function(node){
return (ds.getBoxSizing(node)==bs.BORDER_BOX);
};
ds.getUnitValue=function(node,_412,_413){
var s=ds.getComputedStyle(node,_412);
if((!s)||((s=="auto")&&(_413))){
return {value:0,units:"px"};
}
if(dojo.lang.isUndefined(s)){
return ds.getUnitValue.bad;
}
var _415=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_415){
return ds.getUnitValue.bad;
}
return {value:Number(_415[1]),units:_415[2].toLowerCase()};
};
ds.getUnitValue.bad={value:NaN,units:""};
ds.getPixelValue=function(node,_417,_418){
var _419=ds.getUnitValue(node,_417,_418);
if(isNaN(_419.value)){
return 0;
}
if((_419.value)&&(_419.units!="px")){
return NaN;
}
return _419.value;
};
ds.getNumericStyle=function(){
dojo.deprecated("dojo.(style|html).getNumericStyle","in favor of dojo.(style|html).getPixelValue","0.4");
return ds.getPixelValue.apply(this,arguments);
};
ds.setPositivePixelValue=function(node,_41b,_41c){
if(isNaN(_41c)){
return false;
}
node.style[_41b]=Math.max(0,_41c)+"px";
return true;
};
ds._sumPixelValues=function(node,_41e,_41f){
var _420=0;
for(var x=0;x<_41e.length;x++){
_420+=ds.getPixelValue(node,_41e[x],_41f);
}
return _420;
};
ds.isPositionAbsolute=function(node){
return (ds.getComputedStyle(node,"position")=="absolute");
};
ds.getBorderExtent=function(node,side){
return (ds.getStyle(node,"border-"+side+"-style")=="none"?0:ds.getPixelValue(node,"border-"+side+"-width"));
};
ds.getMarginExtent=function(node,side){
return ds._sumPixelValues(node,["margin-"+side],ds.isPositionAbsolute(node));
};
ds.getPaddingExtent=function(node,side){
return ds._sumPixelValues(node,["padding-"+side],true);
};
ds.getMarginWidth=function(node){
return ds._sumPixelValues(node,["margin-left","margin-right"],ds.isPositionAbsolute(node));
};
ds.getBorderWidth=function(node){
return ds.getBorderExtent(node,"left")+ds.getBorderExtent(node,"right");
};
ds.getPaddingWidth=function(node){
return ds._sumPixelValues(node,["padding-left","padding-right"],true);
};
ds.getPadBorderWidth=function(node){
return ds.getPaddingWidth(node)+ds.getBorderWidth(node);
};
ds.getContentBoxWidth=function(node){
node=dojo.byId(node);
return node.offsetWidth-ds.getPadBorderWidth(node);
};
ds.getBorderBoxWidth=function(node){
node=dojo.byId(node);
return node.offsetWidth;
};
ds.getMarginBoxWidth=function(node){
return ds.getInnerWidth(node)+ds.getMarginWidth(node);
};
ds.setContentBoxWidth=function(node,_431){
node=dojo.byId(node);
if(ds.isBorderBox(node)){
_431+=ds.getPadBorderWidth(node);
}
return ds.setPositivePixelValue(node,"width",_431);
};
ds.setMarginBoxWidth=function(node,_433){
node=dojo.byId(node);
if(!ds.isBorderBox(node)){
_433-=ds.getPadBorderWidth(node);
}
_433-=ds.getMarginWidth(node);
return ds.setPositivePixelValue(node,"width",_433);
};
ds.getContentWidth=ds.getContentBoxWidth;
ds.getInnerWidth=ds.getBorderBoxWidth;
ds.getOuterWidth=ds.getMarginBoxWidth;
ds.setContentWidth=ds.setContentBoxWidth;
ds.setOuterWidth=ds.setMarginBoxWidth;
ds.getMarginHeight=function(node){
return ds._sumPixelValues(node,["margin-top","margin-bottom"],ds.isPositionAbsolute(node));
};
ds.getBorderHeight=function(node){
return ds.getBorderExtent(node,"top")+ds.getBorderExtent(node,"bottom");
};
ds.getPaddingHeight=function(node){
return ds._sumPixelValues(node,["padding-top","padding-bottom"],true);
};
ds.getPadBorderHeight=function(node){
return ds.getPaddingHeight(node)+ds.getBorderHeight(node);
};
ds.getContentBoxHeight=function(node){
node=dojo.byId(node);
return node.offsetHeight-ds.getPadBorderHeight(node);
};
ds.getBorderBoxHeight=function(node){
node=dojo.byId(node);
return node.offsetHeight;
};
ds.getMarginBoxHeight=function(node){
return ds.getInnerHeight(node)+ds.getMarginHeight(node);
};
ds.setContentBoxHeight=function(node,_43c){
node=dojo.byId(node);
if(ds.isBorderBox(node)){
_43c+=ds.getPadBorderHeight(node);
}
return ds.setPositivePixelValue(node,"height",_43c);
};
ds.setMarginBoxHeight=function(node,_43e){
node=dojo.byId(node);
if(!ds.isBorderBox(node)){
_43e-=ds.getPadBorderHeight(node);
}
_43e-=ds.getMarginHeight(node);
return ds.setPositivePixelValue(node,"height",_43e);
};
ds.getContentHeight=ds.getContentBoxHeight;
ds.getInnerHeight=ds.getBorderBoxHeight;
ds.getOuterHeight=ds.getMarginBoxHeight;
ds.setContentHeight=ds.setContentBoxHeight;
ds.setOuterHeight=ds.setMarginBoxHeight;
ds.getAbsolutePosition=ds.abs=function(node,_440){
node=dojo.byId(node,node.ownerDocument);
var ret=[];
ret.x=ret.y=0;
var st=dojo.html.getScrollTop();
var sl=dojo.html.getScrollLeft();
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
try{
var bo=node.ownerDocument.getBoxObjectFor(node);
ret.x=bo.x-ds.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-ds.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _445;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_445=db;
}else{
_445=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=ds.sumAncestorProperties(nd,"scrollLeft");
ret.y-=ds.sumAncestorProperties(nd,"scrollTop");
}
do{
var n=node["offsetLeft"];
if(!dojo.render.html.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=node["offsetTop"];
ret.y+=isNaN(m)?0:m;
node=node.offsetParent;
}while((node!=_445)&&(node!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_440){
ret.y+=st;
ret.x+=sl;
}
ret[0]=ret.x;
ret[1]=ret.y;
return ret;
};
ds.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _44b=0;
while(node){
var val=node[prop];
if(val){
_44b+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _44b;
};
ds.getTotalOffset=function(node,type,_44f){
return ds.abs(node,_44f)[(type=="top")?"y":"x"];
};
ds.getAbsoluteX=ds.totalOffsetLeft=function(node,_451){
return ds.getTotalOffset(node,"left",_451);
};
ds.getAbsoluteY=ds.totalOffsetTop=function(node,_453){
return ds.getTotalOffset(node,"top",_453);
};
ds.styleSheet=null;
ds.insertCssRule=function(_454,_455,_456){
if(!ds.styleSheet){
if(document.createStyleSheet){
ds.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
ds.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(ds.styleSheet.cssRules){
_456=ds.styleSheet.cssRules.length;
}else{
if(ds.styleSheet.rules){
_456=ds.styleSheet.rules.length;
}else{
return null;
}
}
}
if(ds.styleSheet.insertRule){
var rule=_454+" { "+_455+" }";
return ds.styleSheet.insertRule(rule,_456);
}else{
if(ds.styleSheet.addRule){
return ds.styleSheet.addRule(_454,_455,_456);
}else{
return null;
}
}
};
ds.removeCssRule=function(_458){
if(!ds.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(h.ie){
if(!_458){
_458=ds.styleSheet.rules.length;
ds.styleSheet.removeRule(_458);
}
}else{
if(document.styleSheets[0]){
if(!_458){
_458=ds.styleSheet.cssRules.length;
}
ds.styleSheet.deleteRule(_458);
}
}
return true;
};
ds._insertedCssFiles=[];
ds.insertCssFile=function(URI,doc,_45b){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _45c=dojo.hostenv.getText(URI);
_45c=ds.fixPathsInCssText(_45c,URI);
if(_45b){
var idx=-1,node,ent=ds._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_45c)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _45f=doc.getElementsByTagName("style");
for(var i=0;i<_45f.length;i++){
if(_45f[i]==node){
return;
}
}
ds._insertedCssFiles.shift(idx,1);
}
}
var _460=ds.insertCssText(_45c);
ds._insertedCssFiles.push({"doc":doc,"cssText":_45c,"nodeRef":_460});
if(_460&&djConfig.isDebug){
_460.setAttribute("dbgHref",URI);
}
return _460;
};
ds.insertCssText=function(_461,doc,URI){
if(!_461){
return;
}
if(!doc){
doc=document;
}
if(URI){
_461=ds.fixPathsInCssText(_461,URI);
}
var _464=doc.createElement("style");
_464.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_464);
}
if(_464.styleSheet){
_464.styleSheet.cssText=_461;
}else{
var _466=doc.createTextNode(_461);
_464.appendChild(_466);
}
return _464;
};
ds.fixPathsInCssText=function(_467,URI){
if(!_467||!URI){
return;
}
var _469,str="",url="";
var _46a=/url\(\s*([\t\s\w()\/.\\'"-:#=&?]*)\s*\)/;
var _46b=/(file|https?|ftps?):\/\//;
var _46c=/^[\s]*(['"]?)([\w()\/.\\'"-:#=&?]*)\1[\s]*?$/;
while(_469=_46a.exec(_467)){
url=_469[1].replace(_46c,"$2");
if(!_46b.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_467.substring(0,_469.index)+"url("+url+")";
_467=_467.substr(_469.index+_469[0].length);
}
return str+_467;
};
ds.getBackgroundColor=function(node){
node=dojo.byId(node);
var _46e;
do{
_46e=ds.getStyle(node,"background-color");
if(_46e.toLowerCase()=="rgba(0, 0, 0, 0)"){
_46e="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(_46e,["transparent",""]));
if(_46e=="transparent"){
_46e=[255,255,255,0];
}else{
_46e=dojo.graphics.color.extractRGB(_46e);
}
return _46e;
};
ds.getComputedStyle=function(node,_470,_471){
node=dojo.byId(node);
var _470=ds.toSelectorCase(_470);
var _472=ds.toCamelCase(_470);
if(!node||!node.style){
return _471;
}else{
if(document.defaultView){
try{
var cs=document.defaultView.getComputedStyle(node,"");
if(cs){
return cs.getPropertyValue(_470);
}
}
catch(e){
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_470);
}else{
return _471;
}
}
}else{
if(node.currentStyle){
return node.currentStyle[_472];
}
}
}
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_470);
}else{
return _471;
}
};
ds.getStyleProperty=function(node,_475){
node=dojo.byId(node);
return (node&&node.style?node.style[ds.toCamelCase(_475)]:undefined);
};
ds.getStyle=function(node,_477){
var _478=ds.getStyleProperty(node,_477);
return (_478?_478:ds.getComputedStyle(node,_477));
};
ds.setStyle=function(node,_47a,_47b){
node=dojo.byId(node);
if(node&&node.style){
var _47c=ds.toCamelCase(_47a);
node.style[_47c]=_47b;
}
};
ds.toCamelCase=function(_47d){
var arr=_47d.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
ds.toSelectorCase=function(_480){
return _480.replace(/([A-Z])/g,"-$1").toLowerCase();
};
ds.setOpacity=function setOpacity(node,_482,_483){
node=dojo.byId(node);
if(!_483){
if(_482>=1){
if(h.ie){
ds.clearOpacity(node);
return;
}else{
_482=0.999999;
}
}else{
if(_482<0){
_482=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_482*100+")";
}
}
node.style.filter="Alpha(Opacity="+_482*100+")";
}else{
if(h.moz){
node.style.opacity=_482;
node.style.MozOpacity=_482;
}else{
if(h.safari){
node.style.opacity=_482;
node.style.KhtmlOpacity=_482;
}else{
node.style.opacity=_482;
}
}
}
};
ds.getOpacity=function getOpacity(node){
node=dojo.byId(node);
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
ds.clearOpacity=function clearOpacity(node){
node=dojo.byId(node);
var ns=node.style;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
ds.setStyleAttributes=function(node,_48b){
var _48c={"opacity":dojo.style.setOpacity,"content-height":dojo.style.setContentHeight,"content-width":dojo.style.setContentWidth,"outer-height":dojo.style.setOuterHeight,"outer-width":dojo.style.setOuterWidth};
var _48d=_48b.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_48d.length;i++){
var _48f=_48d[i].split(":");
var name=_48f[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _491=_48f[1].replace(/\s*$/,"").replace(/^\s*/,"");
if(dojo.lang.has(_48c,name)){
_48c[name](node,_491);
}else{
node.style[dojo.style.toCamelCase(name)]=_491;
}
}
};
ds._toggle=function(node,_493,_494){
node=dojo.byId(node);
_494(node,!_493(node));
return _493(node);
};
ds.show=function(node){
node=dojo.byId(node);
if(ds.getStyleProperty(node,"display")=="none"){
ds.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
ds.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=ds.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
ds.setStyle(node,"display","none");
};
ds.setShowing=function(node,_499){
ds[(_499?"show":"hide")](node);
};
ds.isShowing=function(node){
return (ds.getStyleProperty(node,"display")!="none");
};
ds.toggleShowing=function(node){
return ds._toggle(node,ds.isShowing,ds.setShowing);
};
ds.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
ds.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in ds.displayMap?ds.displayMap[tag]:"block");
}
};
ds.setDisplay=function(node,_49f){
ds.setStyle(node,"display",(dojo.lang.isString(_49f)?_49f:(_49f?ds.suggestDisplayByTagName(node):"none")));
};
ds.isDisplayed=function(node){
return (ds.getComputedStyle(node,"display")!="none");
};
ds.toggleDisplay=function(node){
return ds._toggle(node,ds.isDisplayed,ds.setDisplay);
};
ds.setVisibility=function(node,_4a3){
ds.setStyle(node,"visibility",(dojo.lang.isString(_4a3)?_4a3:(_4a3?"visible":"hidden")));
};
ds.isVisible=function(node){
return (ds.getComputedStyle(node,"visibility")!="hidden");
};
ds.toggleVisibility=function(node){
return ds._toggle(node,ds.isVisible,ds.setVisibility);
};
ds.toCoordinateArray=function(_4a6,_4a7){
if(dojo.lang.isArray(_4a6)){
while(_4a6.length<4){
_4a6.push(0);
}
while(_4a6.length>4){
_4a6.pop();
}
var ret=_4a6;
}else{
var node=dojo.byId(_4a6);
var pos=ds.getAbsolutePosition(node,_4a7);
var ret=[pos.x,pos.y,ds.getBorderBoxWidth(node),ds.getBorderBoxHeight(node)];
}
ret.x=ret[0];
ret.y=ret[1];
ret.w=ret[2];
ret.h=ret[3];
return ret;
};
})();
dojo.provide("dojo.html");
dojo.require("dojo.lang.func");
dojo.require("dojo.dom");
dojo.require("dojo.style");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.lang.mixin(dojo.html,dojo.style);
dojo.html.clearSelection=function(){
var _4ab=dojo.global();
var _4ac=dojo.doc();
try{
if(_4ab["getSelection"]){
if(dojo.render.html.safari){
_4ab.getSelection().collapse();
}else{
_4ab.getSelection().removeAllRanges();
}
}else{
if(_4ac.selection){
if(_4ac.selection.empty){
_4ac.selection.empty();
}else{
if(_4ac.selection.clear){
_4ac.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_4ad){
_4ad=dojo.byId(_4ad)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_4ad.style.MozUserSelect="none";
}else{
if(h.safari){
_4ad.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_4ad.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_4af){
_4af=dojo.byId(_4af)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_4af.style.MozUserSelect="";
}else{
if(h.safari){
_4af.style.KhtmlUserSelect="";
}else{
if(h.ie){
_4af.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_4b1){
var _4b2=dojo.global();
var _4b3=dojo.doc();
_4b1=dojo.byId(_4b1);
if(_4b3.selection&&dojo.body().createTextRange){
var _4b4=dojo.body().createTextRange();
_4b4.moveToElementText(_4b1);
_4b4.select();
}else{
if(_4b2["getSelection"]){
var _4b5=_4b2.getSelection();
if(_4b5["selectAllChildren"]){
_4b5.selectAllChildren(_4b1);
}
}
}
};
dojo.html.selectInputText=function(_4b6){
var _4b7=dojo.global();
var _4b8=dojo.doc();
_4b6=dojo.byId(_4b6);
if(_4b8.selection&&dojo.body().createTextRange){
var _4b9=_4b6.createTextRange();
_4b9.moveStart("character",0);
_4b9.moveEnd("character",_4b6.value.length);
_4b9.select();
}else{
if(_4b7["getSelection"]){
var _4ba=_4b7.getSelection();
_4b6.setSelectionRange(0,_4b6.value.length);
}
}
_4b6.focus();
};
dojo.html.isSelectionCollapsed=function(){
var _4bb=dojo.global();
var _4bc=dojo.doc();
if(_4bc["selection"]){
return _4bc.selection.createRange().text=="";
}else{
if(_4bb["getSelection"]){
var _4bd=_4bb.getSelection();
if(dojo.lang.isString(_4bd)){
return _4bd=="";
}else{
return _4bd.isCollapsed;
}
}
}
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getDocumentWidth=function(){
dojo.deprecated("dojo.html.getDocument*","replaced by dojo.html.getViewport*","0.4");
return dojo.html.getViewportWidth();
};
dojo.html.getDocumentHeight=function(){
dojo.deprecated("dojo.html.getDocument*","replaced by dojo.html.getViewport*","0.4");
return dojo.html.getViewportHeight();
};
dojo.html.getDocumentSize=function(){
dojo.deprecated("dojo.html.getDocument*","replaced of dojo.html.getViewport*","0.4");
return dojo.html.getViewportSize();
};
dojo.html.getViewportWidth=function(){
var _4c0=dojo.global();
var _4c1=dojo.doc();
var w=0;
if(_4c0.innerWidth){
w=_4c0.innerWidth;
}
if(dojo.exists(_4c1,"documentElement.clientWidth")){
var w2=_4c1.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
return w;
}
if(dojo.body()){
return dojo.body().clientWidth;
}
return 0;
};
dojo.html.getViewportHeight=function(){
var _4c4=dojo.global();
var _4c5=dojo.doc();
if(_4c4.innerHeight){
return _4c4.innerHeight;
}
if(dojo.exists(_4c5,"documentElement.clientHeight")){
return _4c5.documentElement.clientHeight;
}
if(dojo.body()){
return dojo.body().clientHeight;
}
return 0;
};
dojo.html.getViewportSize=function(){
var ret=[dojo.html.getViewportWidth(),dojo.html.getViewportHeight()];
ret.w=ret[0];
ret.h=ret[1];
return ret;
};
dojo.html.getScrollTop=function(){
var _4c7=dojo.doc();
return dojo.global().pageYOffset||_4c7.documentElement.scrollTop||dojo.body().scrollTop||0;
};
dojo.html.getScrollLeft=function(){
var _4c8=dojo.doc();
return dojo.global().pageXOffset||_4c8.documentElement.scrollLeft||dojo.body().scrollLeft||0;
};
dojo.html.getScrollOffset=function(){
var off=[dojo.html.getScrollLeft(),dojo.html.getScrollTop()];
off.x=off[0];
off.y=off[1];
return off;
};
dojo.html.getParentOfType=function(node,type){
dojo.deprecated("dojo.html.getParentOfType","replaced by dojo.html.getParentByType*","0.4");
return dojo.html.getParentByType(node,type);
};
dojo.html.getParentByType=function(node,type){
var _4ce=dojo.doc();
var _4cf=dojo.byId(node);
type=type.toLowerCase();
while((_4cf)&&(_4cf.nodeName.toLowerCase()!=type)){
if(_4cf==(_4ce["body"]||_4ce["documentElement"])){
return null;
}
_4cf=_4cf.parentNode;
}
return _4cf;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
node=dojo.byId(node);
return dojo.html.getAttribute(node,attr)?true:false;
};
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_4db){
return (new RegExp("(^|\\s+)"+_4db+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_4dd){
_4dd+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_4dd);
};
dojo.html.addClass=function(node,_4df){
if(dojo.html.hasClass(node,_4df)){
return false;
}
_4df=(dojo.html.getClass(node)+" "+_4df).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_4df);
};
dojo.html.setClass=function(node,_4e1){
node=dojo.byId(node);
var cs=new String(_4e1);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_4e1);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_4e4,_4e5){
try{
if(!_4e5){
var _4e6=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_4e4+"(\\s+|$)"),"$1$2");
}else{
var _4e6=dojo.html.getClass(node).replace(_4e4,"");
}
dojo.html.setClass(node,_4e6);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_4e8,_4e9){
dojo.html.removeClass(node,_4e9);
dojo.html.addClass(node,_4e8);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_4ea,_4eb,_4ec,_4ed,_4ee){
var _4ef=dojo.doc();
_4eb=dojo.byId(_4eb)||_4ef;
var _4f0=_4ea.split(/\s+/g);
var _4f1=[];
if(_4ed!=1&&_4ed!=2){
_4ed=0;
}
var _4f2=new RegExp("(\\s|^)(("+_4f0.join(")|(")+"))(\\s|$)");
var _4f3=_4f0.join(" ").length;
var _4f4=[];
if(!_4ee&&_4ef.evaluate){
var _4f5="//"+(_4ec||"*")+"[contains(";
if(_4ed!=dojo.html.classMatchType.ContainsAny){
_4f5+="concat(' ',@class,' '), ' "+_4f0.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_4ed==2){
_4f5+=" and string-length(@class)="+_4f3+"]";
}else{
_4f5+="]";
}
}else{
_4f5+="concat(' ',@class,' '), ' "+_4f0.join(" ')) or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _4f6=_4ef.evaluate(_4f5,_4eb,null,XPathResult.ANY_TYPE,null);
var _4f7=_4f6.iterateNext();
while(_4f7){
try{
_4f4.push(_4f7);
_4f7=_4f6.iterateNext();
}
catch(e){
break;
}
}
return _4f4;
}else{
if(!_4ec){
_4ec="*";
}
_4f4=_4eb.getElementsByTagName(_4ec);
var node,i=0;
outer:
while(node=_4f4[i++]){
var _4f9=dojo.html.getClasses(node);
if(_4f9.length==0){
continue outer;
}
var _4fa=0;
for(var j=0;j<_4f9.length;j++){
if(_4f2.test(_4f9[j])){
if(_4ed==dojo.html.classMatchType.ContainsAny){
_4f1.push(node);
continue outer;
}else{
_4fa++;
}
}else{
if(_4ed==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_4fa==_4f0.length){
if((_4ed==dojo.html.classMatchType.IsOnly)&&(_4fa==_4f9.length)){
_4f1.push(node);
}else{
if(_4ed==dojo.html.classMatchType.ContainsAll){
_4f1.push(node);
}
}
}
}
return _4f1;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _4fd={x:0,y:0};
if(e.pageX||e.pageY){
_4fd.x=e.pageX;
_4fd.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_4fd.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_4fd.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _4fd;
};
dojo.html.overElement=function(_500,e){
_500=dojo.byId(_500);
var _502=dojo.html.getCursorPosition(e);
with(dojo.html){
var top=getAbsoluteY(_500,true);
var _504=top+getInnerHeight(_500);
var left=getAbsoluteX(_500,true);
var _506=left+getInnerWidth(_500);
}
return (_502.x>=left&&_502.x<=_506&&_502.y>=top&&_502.y<=_504);
};
dojo.html.setActiveStyleSheet=function(_507){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_507){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var arr=dojo.lang.map(dojo.lang.toArray(arguments,1),function(a){
return String(a).toLowerCase();
});
return arr[dojo.lang.find(node.tagName.toLowerCase(),arr)]||"";
}
return "";
};
dojo.html.copyStyle=function(_50e,_50f){
if(dojo.lang.isUndefined(_50f.style.cssText)){
_50e.setAttribute("style",_50f.getAttribute("style"));
}else{
_50e.style.cssText=_50f.style.cssText;
}
dojo.html.addClass(_50e,dojo.html.getClass(_50f));
};
dojo.html._callExtrasDeprecated=function(_510,args){
var _512="dojo.html.extras";
dojo.deprecated("dojo.html."+_510,"moved to "+_512,"0.4");
dojo["require"](_512);
return dojo.html[_510].apply(dojo.html,args);
};
dojo.html.createNodesFromText=function(){
return dojo.html._callExtrasDeprecated("createNodesFromText",arguments);
};
dojo.html.gravity=function(){
return dojo.html._callExtrasDeprecated("gravity",arguments);
};
dojo.html.placeOnScreen=function(){
return dojo.html._callExtrasDeprecated("placeOnScreen",arguments);
};
dojo.html.placeOnScreenPoint=function(){
return dojo.html._callExtrasDeprecated("placeOnScreenPoint",arguments);
};
dojo.html.renderedTextContent=function(){
return dojo.html._callExtrasDeprecated("renderedTextContent",arguments);
};
dojo.html.BackgroundIframe=function(){
return dojo.html._callExtrasDeprecated("BackgroundIframe",arguments);
};
dojo.require("dojo.html");
dojo.provide("dojo.html.extras");
dojo.require("dojo.string.extras");
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _515=dojo.html.getCursorPosition(e);
with(dojo.html){
var _516=getAbsoluteX(node,true)+(getInnerWidth(node)/2);
var _517=getAbsoluteY(node,true)+(getInnerHeight(node)/2);
}
with(dojo.html.gravity){
return ((_515.x<_516?WEST:EAST)|(_515.y<_517?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _519="";
if(node==null){
return _519;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _51b="unknown";
try{
_51b=dojo.style.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_51b){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_519+="\n";
_519+=dojo.html.renderedTextContent(node.childNodes[i]);
_519+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_519+="\n";
}else{
_519+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _51d="unknown";
try{
_51d=dojo.style.getStyle(node,"text-transform");
}
catch(E){
}
switch(_51d){
case "capitalize":
text=dojo.string.capitalize(text);
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_51d){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_519)){
text.replace(/^\s/,"");
}
break;
}
_519+=text;
break;
default:
break;
}
}
return _519;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=dojo.string.trim(txt);
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _521="none";
if((/^<t[dh][\s\r\n>]/i).test(dojo.string.trimStart(txt))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_521="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(dojo.string.trimStart(txt))){
txt="<table><tbody>"+txt+"</tbody></table>";
_521="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(dojo.string.trimStart(txt))){
txt="<table>"+txt+"</table>";
_521="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _522=null;
switch(_521){
case "cell":
_522=tn.getElementsByTagName("tr")[0];
break;
case "row":
_522=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_522=tn.getElementsByTagName("table")[0];
break;
default:
_522=tn;
break;
}
var _523=[];
for(var x=0;x<_522.childNodes.length;x++){
_523.push(_522.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.body().removeChild(tn);
return _523;
};
dojo.html.placeOnScreen=function(node,_526,_527,_528,_529){
if(dojo.lang.isArray(_526)){
_529=_528;
_528=_527;
_527=_526[1];
_526=_526[0];
}
if(!isNaN(_528)){
_528=[Number(_528),Number(_528)];
}else{
if(!dojo.lang.isArray(_528)){
_528=[0,0];
}
}
var _52a=dojo.html.getScrollOffset();
var view=dojo.html.getViewportSize();
node=dojo.byId(node);
var w=node.offsetWidth+_528[0];
var h=node.offsetHeight+_528[1];
if(_529){
_526-=_52a.x;
_527-=_52a.y;
}
var x=_526+w;
if(x>view.w){
x=view.w-w;
}else{
x=_526;
}
x=Math.max(_528[0],x)+_52a.x;
var y=_527+h;
if(y>view.h){
y=view.h-h;
}else{
y=_527;
}
y=Math.max(_528[1],y)+_52a.y;
node.style.left=x+"px";
node.style.top=y+"px";
var ret=[x,y];
ret.x=x;
ret.y=y;
return ret;
};
dojo.html.placeOnScreenPoint=function(node,_532,_533,_534,_535){
if(dojo.lang.isArray(_532)){
_535=_534;
_534=_533;
_533=_532[1];
_532=_532[0];
}
if(!isNaN(_534)){
_534=[Number(_534),Number(_534)];
}else{
if(!dojo.lang.isArray(_534)){
_534=[0,0];
}
}
var _536=dojo.html.getScrollOffset();
var view=dojo.html.getViewportSize();
node=dojo.byId(node);
var _538=node.style.display;
node.style.display="";
var w=dojo.style.getInnerWidth(node);
var h=dojo.style.getInnerHeight(node);
node.style.display=_538;
if(_535){
_532-=_536.x;
_533-=_536.y;
}
var x=-1,y=-1;
if((_532+_534[0])+w<=view.w&&(_533+_534[1])+h<=view.h){
x=(_532+_534[0]);
y=(_533+_534[1]);
}
if((x<0||y<0)&&(_532-_534[0])<=view.w&&(_533+_534[1])+h<=view.h){
x=(_532-_534[0])-w;
y=(_533+_534[1]);
}
if((x<0||y<0)&&(_532+_534[0])+w<=view.w&&(_533-_534[1])<=view.h){
x=(_532+_534[0]);
y=(_533-_534[1])-h;
}
if((x<0||y<0)&&(_532-_534[0])<=view.w&&(_533-_534[1])<=view.h){
x=(_532-_534[0])-w;
y=(_533-_534[1])-h;
}
if(x<0||y<0||(x+w>view.w)||(y+h>view.h)){
return dojo.html.placeOnScreen(node,_532,_533,_534,_535);
}
x+=_536.x;
y+=_536.y;
node.style.left=x+"px";
node.style.top=y+"px";
var ret=[x,y];
ret.x=x;
ret.y=y;
return ret;
};
dojo.html.getElementWindow=function(_53d){
return dojo.html.getDocumentWindow(_53d.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
dojo.html._fixSafariDocumentParentWindow(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html._fixSafariDocumentParentWindow=function(_53f){
_53f.document.parentWindow=_53f;
for(var i=0;i<_53f.frames.length;i++){
dojo.html._fixSafariDocumentParentWindow(_53f.frames[i]);
}
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe "+"style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=dojo.doc().createElement(html);
this.iframe.tabIndex=-1;
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentElement){
var w=dojo.style.getOuterWidth(this.domNode);
var h=dojo.style.getOuterHeight(this.domNode);
if(w==0||h==0){
dojo.lang.setTimeout(this,this.onResized,50);
return;
}
var s=this.iframe.style;
s.width=w+"px";
s.height=h+"px";
}
},size:function(node){
if(!this.iframe){
return;
}
var _547=dojo.style.toCoordinateArray(node,true);
var s=this.iframe.style;
s.width=_547.w+"px";
s.height=_547.h+"px";
s.left=_547.x+"px";
s.top=_547.y+"px";
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
}
}
},show:function(){
if(!this.iframe){
return;
}
this.iframe.style.display="block";
},hide:function(){
if(!this.ie){
return;
}
var s=this.iframe.style;
s.display="none";
},remove:function(){
dojo.dom.removeNode(this.iframe);
}});
dojo.require("dojo.html.extras");
dojo.provide("dojo.html.iframe");
dojo.html.iframeContentWindow=function(_54b){
var win=dojo.html.getDocumentWindow(dojo.html.iframeContentDocument(_54b))||dojo.html.iframeContentDocument(_54b).__parent__||(_54b.name&&document.frames[_54b.name])||null;
return win;
};
dojo.html.iframeContentDocument=function(_54d){
var doc=_54d.contentDocument||((_54d.contentWindow)&&(_54d.contentWindow.document))||((_54d.name)&&(document.frames[_54d.name])&&(document.frames[_54d.name].document))||null;
return doc;
};
dojo.provide("dojo.io.IframeIO");
dojo.require("dojo.io.BrowserIO");
dojo.require("dojo.uri.*");
dojo.require("dojo.html.iframe");
dojo.io.createIFrame=function(_54f,_550){
if(window[_54f]){
return window[_54f];
}
if(window.frames[_54f]){
return window.frames[_54f];
}
var r=dojo.render.html;
var _552=null;
var turi=dojo.uri.dojoUri("iframe_history.html?noInit=true");
var _554=((r.ie)&&(dojo.render.os.win))?"<iframe name='"+_54f+"' src='"+turi+"' onload='"+_550+"'>":"iframe";
_552=document.createElement(_554);
with(_552){
name=_54f;
setAttribute("name",_54f);
id=_54f;
}
dojo.body().appendChild(_552);
window[_54f]=_552;
with(_552.style){
position="absolute";
left=top="0px";
height=width="1px";
visibility="hidden";
}
if(!r.ie){
dojo.io.setIFrameSrc(_552,turi,true);
_552.onload=new Function(_550);
}
return _552;
};
dojo.io.IframeTransport=new function(){
var _555=this;
this.currentRequest=null;
this.requestQueue=[];
this.iframeName="dojoIoIframe";
this.fireNextRequest=function(){
if((this.currentRequest)||(this.requestQueue.length==0)){
return;
}
var cr=this.currentRequest=this.requestQueue.shift();
cr._contentToClean=[];
var fn=cr["formNode"];
var _558=cr["content"]||{};
if(cr.sendTransport){
_558["dojo.transport"]="iframe";
}
if(fn){
if(_558){
for(var x in _558){
if(!fn[x]){
var tn;
if(dojo.render.html.ie){
tn=document.createElement("<input type='hidden' name='"+x+"' value='"+_558[x]+"'>");
fn.appendChild(tn);
}else{
tn=document.createElement("input");
fn.appendChild(tn);
tn.type="hidden";
tn.name=x;
tn.value=_558[x];
}
cr._contentToClean.push(x);
}else{
fn[x].value=_558[x];
}
}
}
if(cr["url"]){
cr._originalAction=fn.getAttribute("action");
fn.setAttribute("action",cr.url);
}
if(!fn.getAttribute("method")){
fn.setAttribute("method",(cr["method"])?cr["method"]:"post");
}
cr._originalTarget=fn.getAttribute("target");
fn.setAttribute("target",this.iframeName);
fn.target=this.iframeName;
fn.submit();
}else{
var _55b=dojo.io.argsFromMap(this.currentRequest.content);
var _55c=(cr.url.indexOf("?")>-1?"&":"?")+_55b;
dojo.io.setIFrameSrc(this.iframe,_55c,true);
}
};
this.canHandle=function(_55d){
return ((dojo.lang.inArray(_55d["mimetype"],["text/plain","text/html","text/javascript","text/json"]))&&((_55d["formNode"])&&(dojo.io.checkChildrenForFile(_55d["formNode"])))&&(dojo.lang.inArray(_55d["method"].toLowerCase(),["post","get"]))&&(!((_55d["sync"])&&(_55d["sync"]==true))));
};
this.bind=function(_55e){
if(!this["iframe"]){
this.setUpIframe();
}
this.requestQueue.push(_55e);
this.fireNextRequest();
return;
};
this.setUpIframe=function(){
this.iframe=dojo.io.createIFrame(this.iframeName,"dojo.io.IframeTransport.iframeOnload();");
};
this.iframeOnload=function(){
if(!_555.currentRequest){
_555.fireNextRequest();
return;
}
var req=_555.currentRequest;
var _560=req._contentToClean;
for(var i=0;i<_560.length;i++){
var key=_560[i];
if(dojo.render.html.safari){
var _563=req.formNode;
for(var j=0;j<_563.childNodes.length;j++){
var _565=_563.childNodes[j];
if(_565.name==key){
var _566=_565.parentNode;
_566.removeChild(_565);
break;
}
}
}else{
var _567=req.formNode[key];
req.formNode.removeChild(_567);
req.formNode[key]=null;
}
}
if(req["_originalAction"]){
req.formNode.setAttribute("action",req._originalAction);
}
req.formNode.setAttribute("target",req._originalTarget);
req.formNode.target=req._originalTarget;
var ifd=dojo.html.iframeContentDocument(_555.iframe);
var _569;
var _56a=false;
try{
var cmt=req.mimetype;
if((cmt=="text/javascript")||(cmt=="text/json")){
var js=ifd.getElementsByTagName("textarea")[0].value;
if(cmt=="text/json"){
js="("+js+")";
}
_569=dj_eval(js);
}else{
if(cmt=="text/html"){
_569=ifd;
}else{
_569=ifd.getElementsByTagName("textarea")[0].value;
}
}
_56a=true;
}
catch(e){
var _56d=new dojo.io.Error("IframeTransport Error");
if(dojo.lang.isFunction(req["error"])){
req.error("error",_56d,req);
}
}
try{
if(_56a&&dojo.lang.isFunction(req["load"])){
req.load("load",_569,req);
}
}
catch(e){
throw e;
}
finally{
_555.currentRequest=null;
_555.fireNextRequest();
}
};
dojo.io.transports.addTransport("IframeTransport");
};
dojo.provide("dojo.lang.type");
dojo.require("dojo.lang.common");
dojo.lang.whatAmI=function(wh){
try{
if(dojo.lang.isArray(wh)){
return "array";
}
if(dojo.lang.isFunction(wh)){
return "function";
}
if(dojo.lang.isString(wh)){
return "string";
}
if(dojo.lang.isNumber(wh)){
return "number";
}
if(dojo.lang.isBoolean(wh)){
return "boolean";
}
if(dojo.lang.isAlien(wh)){
return "alien";
}
if(dojo.lang.isUndefined(wh)){
return "undefined";
}
for(var name in dojo.lang.whatAmI.custom){
if(dojo.lang.whatAmI.custom[name](wh)){
return name;
}
}
if(dojo.lang.isObject(wh)){
return "object";
}
}
catch(E){
}
return "unknown";
};
dojo.lang.whatAmI.custom={};
dojo.lang.isNumeric=function(wh){
return (!isNaN(wh)&&isFinite(wh)&&(wh!=null)&&!dojo.lang.isBoolean(wh)&&!dojo.lang.isArray(wh));
};
dojo.lang.isBuiltIn=function(wh){
return (dojo.lang.isArray(wh)||dojo.lang.isFunction(wh)||dojo.lang.isString(wh)||dojo.lang.isNumber(wh)||dojo.lang.isBoolean(wh)||(wh==null)||(wh instanceof Error)||(typeof wh=="error"));
};
dojo.lang.isPureObject=function(wh){
return ((wh!=null)&&dojo.lang.isObject(wh)&&wh.constructor==Object);
};
dojo.lang.isOfType=function(_573,type){
if(dojo.lang.isArray(type)){
var _575=type;
for(var i in _575){
var _577=_575[i];
if(dojo.lang.isOfType(_573,_577)){
return true;
}
}
return false;
}else{
if(dojo.lang.isString(type)){
type=type.toLowerCase();
}
switch(type){
case Array:
case "array":
return dojo.lang.isArray(_573);
break;
case Function:
case "function":
return dojo.lang.isFunction(_573);
break;
case String:
case "string":
return dojo.lang.isString(_573);
break;
case Number:
case "number":
return dojo.lang.isNumber(_573);
break;
case "numeric":
return dojo.lang.isNumeric(_573);
break;
case Boolean:
case "boolean":
return dojo.lang.isBoolean(_573);
break;
case Object:
case "object":
return dojo.lang.isObject(_573);
break;
case "pureobject":
return dojo.lang.isPureObject(_573);
break;
case "builtin":
return dojo.lang.isBuiltIn(_573);
break;
case "alien":
return dojo.lang.isAlien(_573);
break;
case "undefined":
return dojo.lang.isUndefined(_573);
break;
case null:
case "null":
return (_573===null);
break;
case "optional":
return ((_573===null)||dojo.lang.isUndefined(_573));
break;
default:
if(dojo.lang.isFunction(type)){
return (_573 instanceof type);
}else{
dojo.raise("dojo.lang.isOfType() was passed an invalid type");
}
break;
}
}
dojo.raise("If we get here, it means a bug was introduced above.");
};
dojo.lang.getObject=function(str){
var _579=str.split("."),i=0,obj=dj_global;
do{
obj=obj[_579[i++]];
}while(i<_579.length&&obj);
return (obj!=dj_global)?obj:null;
};
dojo.lang.doesObjectExist=function(str){
var _57b=str.split("."),i=0,obj=dj_global;
do{
obj=obj[_57b[i++]];
}while(i<_57b.length&&obj);
return (obj&&obj!=dj_global);
};
dojo.provide("dojo.lang.assert");
dojo.require("dojo.lang.common");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.type");
dojo.lang.assert=function(_57c,_57d){
if(!_57c){
var _57e="An assert statement failed.\n"+"The method dojo.lang.assert() was called with a 'false' value.\n";
if(_57d){
_57e+="Here's the assert message:\n"+_57d+"\n";
}
throw new Error(_57e);
}
};
dojo.lang.assertType=function(_57f,type,_581){
if(!dojo.lang.isOfType(_57f,type)){
if(!_581){
if(!dojo.lang.assertType._errorMessage){
dojo.lang.assertType._errorMessage="Type mismatch: dojo.lang.assertType() failed.";
}
_581=dojo.lang.assertType._errorMessage;
}
dojo.lang.assert(false,_581);
}
};
dojo.lang.assertValidKeywords=function(_582,_583,_584){
var key;
if(!_584){
if(!dojo.lang.assertValidKeywords._errorMessage){
dojo.lang.assertValidKeywords._errorMessage="In dojo.lang.assertValidKeywords(), found invalid keyword:";
}
_584=dojo.lang.assertValidKeywords._errorMessage;
}
if(dojo.lang.isArray(_583)){
for(key in _582){
if(!dojo.lang.inArray(_583,key)){
dojo.lang.assert(false,_584+" "+key);
}
}
}else{
for(key in _582){
if(!(key in _583)){
dojo.lang.assert(false,_584+" "+key);
}
}
}
};
dojo.provide("dojo.AdapterRegistry");
dojo.require("dojo.lang.func");
dojo.AdapterRegistry=function(){
this.pairs=[];
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(name,_587,wrap,_589){
if(_589){
this.pairs.unshift([name,_587,wrap]);
}else{
this.pairs.push([name,_587,wrap]);
}
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
return pair[2].apply(this,arguments);
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dojo.lang.repr");
dojo.require("dojo.lang.common");
dojo.require("dojo.AdapterRegistry");
dojo.require("dojo.string.extras");
dojo.lang.reprRegistry=new dojo.AdapterRegistry();
dojo.lang.registerRepr=function(name,_590,wrap,_592){
dojo.lang.reprRegistry.register(name,_590,wrap,_592);
};
dojo.lang.repr=function(obj){
if(typeof (obj)=="undefined"){
return "undefined";
}else{
if(obj===null){
return "null";
}
}
try{
if(typeof (obj["__repr__"])=="function"){
return obj["__repr__"]();
}else{
if((typeof (obj["repr"])=="function")&&(obj.repr!=arguments.callee)){
return obj["repr"]();
}
}
return dojo.lang.reprRegistry.match(obj);
}
catch(e){
if(typeof (obj.NAME)=="string"&&(obj.toString==Function.prototype.toString||obj.toString==Object.prototype.toString)){
return o.NAME;
}
}
if(typeof (obj)=="function"){
obj=(obj+"").replace(/^\s+/,"");
var idx=obj.indexOf("{");
if(idx!=-1){
obj=obj.substr(0,idx)+"{...}";
}
}
return obj+"";
};
dojo.lang.reprArrayLike=function(arr){
try{
var na=dojo.lang.map(arr,dojo.lang.repr);
return "["+na.join(", ")+"]";
}
catch(e){
}
};
dojo.lang.reprString=function(str){
dojo.deprecated("dojo.lang.reprNumber","use `String(num)` instead","0.4");
return dojo.string.escapeString(str);
};
dojo.lang.reprNumber=function(num){
dojo.deprecated("dojo.lang.reprNumber","use `String(num)` instead","0.4");
return num+"";
};
(function(){
var m=dojo.lang;
m.registerRepr("arrayLike",m.isArrayLike,m.reprArrayLike);
m.registerRepr("string",m.isString,m.reprString);
m.registerRepr("numbers",m.isNumber,m.reprNumber);
m.registerRepr("boolean",m.isBoolean,m.reprNumber);
})();
dojo.provide("dojo.lang.declare");
dojo.require("dojo.lang.common");
dojo.require("dojo.lang.extras");
dojo.lang.declare=function(_59a,_59b,init,_59d){
if((dojo.lang.isFunction(_59d))||((!_59d)&&(!dojo.lang.isFunction(init)))){
var temp=_59d;
_59d=init;
init=temp;
}
var _59f=[];
if(dojo.lang.isArray(_59b)){
_59f=_59b;
_59b=_59f.shift();
}
if(!init){
init=dojo.evalObjPath(_59a,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_59b?_59b.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _59b();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_59f;
for(var i=0,l=_59f.length;i<l;i++){
dojo.lang.extend(ctor,_59f[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_59a;
if(dojo.lang.isArray(_59d)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_59d));
}else{
dojo.lang.extend(ctor,(_59d)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare.base);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
dojo.lang.setObjPathValue(_59a,ctor,null,true);
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this.inherited("constructor",arguments);
}else{
this._inherited(s,"constructor",arguments);
}
}
var m=(self.constructor.mixins)||([]);
for(var i=0,l=m.length;i<l;i++){
(((m[i].prototype)&&(m[i].prototype.initializer))||(m[i])).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare.base={_getPropContext:function(){
return (this.___proto||this);
},_inherited:function(_5a7,_5a8,args){
var _5aa=this.___proto;
this.___proto=_5a7;
var _5ab=_5a7[_5a8].apply(this,(args||[]));
this.___proto=_5aa;
return _5ab;
},inheritedFrom:function(ctor,prop,args){
var p=((ctor)&&(ctor.prototype)&&(ctor.prototype[prop]));
return (dojo.lang.isFunction(p)?p.apply(this,(args||[])):p);
},inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._inherited(p,prop,args):p[prop]);
}};
dojo.declare=dojo.lang.declare;
dojo.kwCompoundRequire({common:["dojo.lang","dojo.lang.common","dojo.lang.assert","dojo.lang.array","dojo.lang.type","dojo.lang.func","dojo.lang.extras","dojo.lang.repr","dojo.lang.declare"]});
dojo.provide("dojo.lang.*");
dojo.provide("dojo.xml.Parse");
dojo.require("dojo.dom");
dojo.xml.Parse=function(){
function getDojoTagName(node){
var _5b4=node.tagName;
if(_5b4.substr(0,5).toLowerCase()=="dojo:"){
return _5b4.toLowerCase();
}
if(_5b4.substr(0,4).toLowerCase()=="dojo"){
return "dojo:"+_5b4.substring(4).toLowerCase();
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
if(node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type")){
return "dojo:"+node.getAttributeNS(dojo.dom.dojoml,"type").toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if(!dj_global["djConfig"]||!djConfig["ignoreClassNames"]){
var _5b6=node.className||node.getAttribute("class");
if(_5b6&&_5b6.indexOf&&_5b6.indexOf("dojo-")!=-1){
var _5b7=_5b6.split(" ");
for(var x=0;x<_5b7.length;x++){
if(_5b7[x].length>5&&_5b7[x].indexOf("dojo-")>=0){
return "dojo:"+_5b7[x].substr(5).toLowerCase();
}
}
}
}
return _5b4.toLowerCase();
}
this.parseElement=function(node,_5ba,_5bb,_5bc){
var _5bd={};
if(node.tagName&&node.tagName.indexOf("/")==0){
return null;
}
var _5be=getDojoTagName(node);
_5bd[_5be]=[];
if(_5be.substr(0,4).toLowerCase()=="dojo"){
_5bd.namespace="dojo";
}else{
var pos=_5be.indexOf(":");
if(pos>0){
_5bd.namespace=_5be.substring(0,pos);
}
}
if(!_5bb||(_5bd.namespace&&dojo.getNamespace(_5bd.namespace))){
var _5c0=this.parseAttributes(node);
for(var attr in _5c0){
if((!_5bd[_5be][attr])||(typeof _5bd[_5be][attr]!="array")){
_5bd[_5be][attr]=[];
}
_5bd[_5be][attr].push(_5c0[attr]);
}
_5bd[_5be].nodeRef=node;
_5bd.tagName=_5be;
_5bd.index=_5bc||0;
}
var _5c2=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
_5c2++;
var ctn=getDojoTagName(tcn);
if(!_5bd[ctn]){
_5bd[ctn]=[];
}
_5bd[ctn].push(this.parseElement(tcn,true,_5bb,_5c2));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_5bd[ctn][_5bd[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_5bd[_5be].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _5bd;
};
this.parseAttributes=function(node){
var _5c7={};
var atts=node.attributes;
var _5c9,i=0;
while((_5c9=atts[i++])){
if((dojo.render.html.capable)&&(dojo.render.html.ie)){
if(!_5c9){
continue;
}
if((typeof _5c9=="object")&&(typeof _5c9.nodeValue=="undefined")||(_5c9.nodeValue==null)||(_5c9.nodeValue=="")){
continue;
}
}
var nn=(_5c9.nodeName.indexOf("dojo:")==-1)?_5c9.nodeName:_5c9.nodeName.split("dojo:")[1];
_5c7[nn]={value:_5c9.nodeValue};
}
return _5c7;
};
};
dojo.provide("dojo.widget.Manager");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.func");
dojo.require("dojo.event.*");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _5cb={};
var _5cc=[];
this.getUniqueId=function(_5cd){
return _5cd+"_"+(_5cb[_5cd]!=undefined?++_5cb[_5cd]:_5cb[_5cd]=0);
};
this.add=function(_5ce){
this.widgets.push(_5ce);
if(!_5ce.extraArgs["id"]){
_5ce.extraArgs["id"]=_5ce.extraArgs["ID"];
}
if(_5ce.widgetId==""){
if(_5ce["id"]){
_5ce.widgetId=_5ce["id"];
}else{
if(_5ce.extraArgs["id"]){
_5ce.widgetId=_5ce.extraArgs["id"];
}else{
_5ce.widgetId=this.getUniqueId(_5ce.widgetType);
}
}
}
if(this.widgetIds[_5ce.widgetId]){
dojo.debug("widget ID collision on ID: "+_5ce.widgetId);
}
this.widgetIds[_5ce.widgetId]=_5ce;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_5d0){
var tw=this.widgets[_5d0].widgetId;
delete this.widgetIds[tw];
this.widgets.splice(_5d0,1);
};
this.removeById=function(id){
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
return this.widgetIds[id];
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(x.widgetType.toLowerCase()==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsOfType=function(id){
dojo.deprecated("getWidgetsOfType","use getWidgetsByType","0.4");
return dojo.widget.manager.getWidgetsByType(id);
};
this.getWidgetsByFilter=function(_5da,_5db){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_5da(x)){
ret.push(x);
if(_5db){
return false;
}
}
return true;
});
return (_5db?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _5e1={};
var _5e2=["dojo.widget"];
for(var i=0;i<_5e2.length;i++){
_5e2[_5e2[i]]=true;
}
this.registerWidgetPackage=function(_5e4){
if(!_5e2[_5e4]){
_5e2[_5e4]=true;
_5e2.push(_5e4);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_5e2,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_5e6,_5e7,_5e8){
var impl=this.getImplementationName(_5e6);
if(impl){
var ret=new impl(_5e7);
return ret;
}
};
this.getImplementationName=function(_5eb){
var _5ec=_5eb.toLowerCase();
var impl=_5e1[_5ec];
if(impl){
return impl;
}
if(!_5cc.length){
for(var _5ee in dojo.render){
if(dojo.render[_5ee]["capable"]===true){
var _5ef=dojo.render[_5ee].prefixes;
for(var i=0;i<_5ef.length;i++){
_5cc.push(_5ef[i].toLowerCase());
}
}
}
_5cc.push("");
}
for(var i=0;i<_5e2.length;i++){
var _5f1=dojo.evalObjPath(_5e2[i]);
if(!_5f1){
continue;
}
for(var j=0;j<_5cc.length;j++){
if(!_5f1[_5cc[j]]){
continue;
}
for(var _5f3 in _5f1[_5cc[j]]){
if(_5f3.toLowerCase()!=_5ec){
continue;
}
_5e1[_5ec]=_5f1[_5cc[j]][_5f3];
return _5e1[_5ec];
}
}
for(var j=0;j<_5cc.length;j++){
for(var _5f3 in _5f1){
if(_5f3.toLowerCase()!=(_5cc[j]+_5ec)){
continue;
}
_5e1[_5ec]=_5f1[_5f3];
return _5e1[_5ec];
}
}
}
throw new Error("Could not locate \""+_5eb+"\" class");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _5f5=this.topWidgets[id];
if(_5f5.checkSize){
_5f5.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_5fa,_5fb){
dw[(_5fb||_5fa)]=h(_5fa);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _5fd=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _5fd[n];
}
return _5fd;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.widget.Widget");
dojo.provide("dojo.widget.tags");
dojo.require("dojo.lang.func");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.extras");
dojo.require("dojo.lang.declare");
dojo.require("dojo.widget.Manager");
dojo.require("dojo.event.*");
dojo.declare("dojo.widget.Widget",null,{initializer:function(){
this.children=[];
this.extraArgs={};
},parent:null,isTopLevel:false,isModal:false,isEnabled:true,isHidden:false,isContainer:false,widgetId:"",widgetType:"Widget",namespace:"dojo",toString:function(){
return "[Widget "+this.widgetType+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.isEnabled=true;
},disable:function(){
this.isEnabled=false;
},hide:function(){
this.isHidden=true;
},show:function(){
this.isHidden=false;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _5ff=this.children[i];
if(_5ff.onResized){
_5ff.onResized();
}
}
},create:function(args,_601,_602,_603){
if(_603){
this.namespace=_603;
}
this.satisfyPropertySets(args,_601,_602);
this.mixInProperties(args,_601,_602);
this.postMixInProperties(args,_601,_602);
dojo.widget.manager.add(this);
this.buildRendering(args,_601,_602);
this.initialize(args,_601,_602);
this.postInitialize(args,_601,_602);
this.postCreate(args,_601,_602);
return this;
},destroy:function(_604){
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_604);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
while(this.children.length>0){
var tc=this.children[0];
this.removeChild(tc);
tc.destroy();
}
},getChildrenOfType:function(type,_607){
var ret=[];
var _609=dojo.lang.isFunction(type);
if(!_609){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_609){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_607){
ret=ret.concat(this.children[x].getChildrenOfType(type,_607));
}
}
return ret;
},getDescendants:function(){
var _60b=[];
var _60c=[this];
var elem;
while(elem=_60c.pop()){
_60b.push(elem);
dojo.lang.forEach(elem.children,function(elem){
_60c.push(elem);
});
}
return _60b;
},isFirstNode:function(){
return this===this.parent.children[0];
},isLastNode:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _613;
var _614=dojo.widget.lcArgsCache[this.widgetType];
if(_614==null){
_614={};
for(var y in this){
_614[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_614;
}
var _616={};
for(var x in args){
if(!this[x]){
var y=_614[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_616[x]){
continue;
}
_616[x]=true;
if((typeof this[x])!=(typeof _613)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.connect(this,x,this,tn);
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=args[x];
}else{
var _618=args[x].split(";");
for(var y=0;y<_618.length;y++){
var si=_618[y].indexOf(":");
if((si!=-1)&&(_618[y].length>si)){
this[x][_618[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_618[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(){
},initialize:function(args,frag){
return false;
},postInitialize:function(args,frag){
return false;
},postCreate:function(args,frag){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},cleanUp:function(){
dojo.unimplemented("dojo.widget.Widget.cleanUp");
return false;
},addedTo:function(_620){
},addChild:function(_621){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_622){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_622){
this.children.splice(x,1);
break;
}
}
return _622;
},resize:function(_624,_625){
this.setWidth(_624);
this.setHeight(_625);
},setWidth:function(_626){
if((typeof _626=="string")&&(_626.substr(-1)=="%")){
this.setPercentageWidth(_626);
}else{
this.setNativeWidth(_626);
}
},setHeight:function(_627){
if((typeof _627=="string")&&(_627.substr(-1)=="%")){
this.setPercentageHeight(_627);
}else{
this.setNativeHeight(_627);
}
},setPercentageHeight:function(_628){
return false;
},setNativeHeight:function(_629){
return false;
},setPercentageWidth:function(_62a){
return false;
},setNativeWidth:function(_62b){
return false;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.getSiblings()[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.getSiblings(),this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.getSiblings().length-1){
return null;
}
if(idx<0){
return null;
}
return this.getSiblings()[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
var _62f=type.toLowerCase();
this[_62f]=function(_630,_631,_632,_633,_634){
var _635=_62f;
dojo.profile.start(_635);
var n=dojo.widget.buildWidgetFromParseTree(_62f,_630,_631,_632,_633,_634);
dojo.profile.end(_635);
return n;
};
};
dojo.widget.tags.addParseTreeHandler("dojo:widget");
dojo.widget.tags["dojo:propertyset"]=function(_637,_638,_639){
var _63a=_638.parseProperties(_637["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_63b,_63c,_63d){
var _63e=_63c.parseProperties(_63b["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_641,_642,_643,_644){
var _645=type.split(":");
_645=(_645.length==2)?_645[1]:type;
var _646=_644||_641.parseProperties(frag[frag.namespace+":"+_645]);
var _647=dojo.widget.manager.getImplementation(_645);
if(!_647){
throw new Error("cannot find \""+_645+"\" widget");
}else{
if(!_647.create){
throw new Error("\""+_645+"\" widget object does not appear to implement *Widget");
}
}
_646["dojoinsertionindex"]=_643;
var ret=_647.create(_646,frag,_642,frag.namespace);
return ret;
};
dojo.widget.defineWidget=function(_649,_64a,_64b,init,_64d){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_64f,_650,_651,init,_653){
var _654=_64f.split(".");
var type=_654.pop();
var regx="\\.("+(_650?_650+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_64f.search(new RegExp(regx));
_654=(r<0?_654.join("."):_64f.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_654);
var pos=_654.indexOf(".");
var _659=(pos>-1)?_654.substring(0,pos):_654;
dojo.widget.tags.addParseTreeHandler(_659+":"+type.toLowerCase());
if(_659!="dojo"){
dojo.widget.tags.addParseTreeHandler("dojo:"+type.toLowerCase());
}
_653=(_653)||{};
_653.widgetType=type;
if((!init)&&(_653["classConstructor"])){
init=_653.classConstructor;
delete _653.classConstructor;
}
dojo.declare(_64f,_651,init,_653);
};
dojo.provide("dojo.widget.Parse");
dojo.require("dojo.widget.Manager");
dojo.require("dojo.dom");
dojo.widget.Parse=function(_65a){
this.propertySetsList=[];
this.fragment=_65a;
this.createComponents=function(frag,_65c){
var _65d=[];
var _65e=false;
try{
if((frag)&&(frag["tagName"])&&(frag!=frag["nodeRef"])){
var _65f=dojo.widget.tags;
var tna=String(frag["tagName"]).split(";");
for(var x=0;x<tna.length;x++){
var ltn=(tna[x].replace(/^\s+|\s+$/g,"")).toLowerCase();
if(!_65f[ltn]&&dojo.getNamespace&&dojo.lang.isString(ltn)){
var pos=ltn.indexOf(":");
if(pos>0){
var _664=ltn.substring(0,pos);
var ns=dojo.getNamespace(_664);
var _666=ltn.substring(pos+1,ltn.length);
var _667=null;
var _668=frag[ltn]["dojoDomain"]||frag[ltn]["dojodomain"];
if(_668){
_667=_668[0].value;
}
if(ns){
ns.load(_666,_667);
}
}
}
if(_65f[ltn]){
_65e=true;
frag.tagName=ltn;
var ret=_65f[ltn](frag,this,_65c,frag["index"]);
_65d.push(ret);
}else{
if(dojo.lang.isString(ltn)&&(ltn.substr(0,5)=="dojo:")){
dojo.debug("no tag handler registered for type: ",ltn);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_65e){
_65d=_65d.concat(this.createSubComponents(frag,_65c));
}
return _65d;
};
this.createSubComponents=function(_66a,_66b){
var frag,comps=[];
for(var item in _66a){
frag=_66a[item];
if((frag)&&(typeof frag=="object")&&(frag!=_66a.nodeRef)&&(frag!=_66a["tagName"])){
comps=comps.concat(this.createComponents(frag,_66b));
}
}
return comps;
};
this.parsePropertySets=function(_66e){
return [];
var _66f=[];
for(var item in _66e){
if((_66e[item]["tagName"]=="dojo:propertyset")){
_66f.push(_66e[item]);
}
}
this.propertySetsList.push(_66f);
return _66f;
};
this.parseProperties=function(_671){
var _672={};
for(var item in _671){
if((_671[item]==_671["tagName"])||(_671[item]==_671.nodeRef)){
}else{
if((_671[item]["tagName"])&&(dojo.widget.tags[_671[item].tagName.toLowerCase()])){
}else{
if((_671[item][0])&&(_671[item][0].value!="")&&(_671[item][0].value!=null)){
try{
if(item.toLowerCase()=="dataprovider"){
var _674=this;
this.getDataProvider(_674,_671[item][0].value);
_672.dataProvider=this.dataProvider;
}
_672[item]=_671[item][0].value;
var _675=this.parseProperties(_671[item]);
for(var _676 in _675){
_672[_676]=_675[_676];
}
}
catch(e){
dojo.debug(e);
}
}
}
}
}
return _672;
};
this.getDataProvider=function(_677,_678){
dojo.io.bind({url:_678,load:function(type,_67a){
if(type=="load"){
_677.dataProvider=_67a;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_67b){
for(var x=0;x<this.propertySetsList.length;x++){
if(_67b==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_67d){
var _67e=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl["componentClass"]||cpl["componentType"]||null;
if((cpcc)&&(propertySetId==cpcc[0].value)){
_67e.push(cpl);
}
}
return _67e;
};
this.getPropertySets=function(_682){
var ppl="dojo:propertyproviderlist";
var _684=[];
var _685=_682["tagName"];
if(_682[ppl]){
var _686=_682[ppl].value.split(" ");
for(var _687 in _686){
if((_687.indexOf("..")==-1)&&(_687.indexOf("://")==-1)){
var _688=this.getPropertySetById(_687);
if(_688!=""){
_684.push(_688);
}
}else{
}
}
}
return (this.getPropertySetsByType(_685)).concat(_684);
};
this.createComponentFromScript=function(_689,_68a,_68b,_68c){
if(!_68c){
_68c="dojo";
}
var ltn=_68c+":"+_68a.toLowerCase();
if(dojo.widget.tags[ltn]){
_68b.fastMixIn=true;
var ret=[dojo.widget.buildWidgetFromParseTree(ltn,_68b,this,null,null,_68b)];
return ret;
}else{
dojo.debug("no tag handler registered for type: ",ltn);
}
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_691,_692,_693){
var pos=name.indexOf(":");
var _695=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
function fromScript(_696,name,_698,_699){
var _69a=name.toLowerCase();
var _69b=_699+":"+_69a;
_698.namespace=_699;
_698[_69b]={dojotype:[{value:_69a}],nodeRef:_696,fastMixIn:true};
return dojo.widget.getParser().createComponentFromScript(_696,name,_698,_699);
}
if(typeof name!="string"&&typeof _691=="string"){
dojo.deprecated("dojo.widget.createWidget","argument order is now of the form "+"dojo.widget.createWidget(NAME, [PROPERTIES, [REFERENCENODE, [POSITION]]])","0.4");
return fromScript(name,_691,_692,_695);
}
_691=_691||{};
var _69c=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_692){
_69c=true;
_692=tn;
if(h){
dojo.body().appendChild(_692);
}
}else{
if(_693){
dojo.dom.insertAtPosition(tn,_692,_693);
}else{
tn=_692;
}
}
var _69f=fromScript(tn,name,_691,_695);
if(!_69f||!_69f[0]||typeof _69f[0].widgetType=="undefined"){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
if(_69c){
if(_69f[0].domNode.parentNode){
_69f[0].domNode.parentNode.removeChild(_69f[0].domNode);
}
}
return _69f[0];
};
dojo.widget.fromScript=function(name,_6a1,_6a2,_6a3){
dojo.deprecated("dojo.widget.fromScript"," use "+"dojo.widget.createWidget instead","0.4");
return dojo.widget.createWidget(name,_6a1,_6a2,_6a3);
};
dojo.provide("dojo.widget.DomWidget");
dojo.require("dojo.event.*");
dojo.require("dojo.widget.Widget");
dojo.require("dojo.dom");
dojo.require("dojo.xml.Parse");
dojo.require("dojo.uri.*");
dojo.require("dojo.lang.func");
dojo.require("dojo.lang.extras");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.buildFromTemplate=function(){
dojo.lang.forward("fillFromTemplateCache");
};
dojo.widget.fillFromTemplateCache=function(obj,_6a5,_6a6,_6a7,_6a8){
var _6a9=_6a5||obj.templatePath;
var _6aa=_6a6||obj.templateCssPath;
if(_6a9&&!(_6a9 instanceof dojo.uri.Uri)){
_6a9=dojo.uri.dojoUri(_6a9);
dojo.deprecated("templatePath should be of type dojo.uri.Uri",null,"0.4");
}
if(_6aa&&!(_6aa instanceof dojo.uri.Uri)){
_6aa=dojo.uri.dojoUri(_6aa);
dojo.deprecated("templateCssPath should be of type dojo.uri.Uri",null,"0.4");
}
var _6ab=dojo.widget._templateCache;
if(!obj["widgetType"]){
do{
var _6ac="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_6ab[_6ac]);
obj.widgetType=_6ac;
}
var wt=obj.widgetType;
if(_6aa&&!dojo.widget._cssFiles[_6aa.toString()]){
if((!obj.templateCssString)&&(_6aa)){
obj.templateCssString=dojo.hostenv.getText(_6aa);
obj.templateCssPath=null;
}
if((obj["templateCssString"])&&(!obj.templateCssString["loaded"])){
dojo.style.insertCssText(obj.templateCssString,null,_6aa);
if(!obj.templateCssString){
obj.templateCssString="";
}
obj.templateCssString.loaded=true;
}
dojo.widget._cssFiles[_6aa.toString()]=true;
}
var ts=_6ab[wt];
if(!ts){
_6ab[wt]={"string":null,"node":null};
if(_6a8){
ts={};
}else{
ts=_6ab[wt];
}
}
if((!obj.templateString)&&(!_6a8)){
obj.templateString=_6a7||ts["string"];
}
if((!obj.templateNode)&&(!_6a8)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_6a9)){
var _6af=dojo.hostenv.getText(_6a9);
if(_6af){
_6af=_6af.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _6b0=_6af.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_6b0){
_6af=_6b0[1];
}
}else{
_6af="";
}
obj.templateString=_6af;
if(!_6a8){
_6ab[wt]["string"]=_6af;
}
}
if((!ts["string"])&&(!_6a8)){
ts.string=obj.templateString;
}
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole",namespace:"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState",namespace:"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_6b4){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_6b4);
}else{
node.setAttributeNS(this[ns].namespace,attr,this[ns].prefix+_6b4);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns].namespace,attr);
}
}};
dojo.widget.attachTemplateNodes=function(_6b8,_6b9,_6ba){
var _6bb=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_6b8){
_6b8=_6b9.domNode;
}
if(_6b8.nodeType!=_6bb){
return;
}
var _6bd=_6b8.all||_6b8.getElementsByTagName("*");
var _6be=_6b9;
for(var x=-1;x<_6bd.length;x++){
var _6c0=(x==-1)?_6b8:_6bd[x];
var _6c1=[];
for(var y=0;y<this.attachProperties.length;y++){
var _6c3=_6c0.getAttribute(this.attachProperties[y]);
if(_6c3){
_6c1=_6c3.split(";");
for(var z=0;z<_6c1.length;z++){
if(dojo.lang.isArray(_6b9[_6c1[z]])){
_6b9[_6c1[z]].push(_6c0);
}else{
_6b9[_6c1[z]]=_6c0;
}
}
break;
}
}
var _6c5=_6c0.getAttribute(this.templateProperty);
if(_6c5){
_6b9[_6c5]=_6c0;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_6c0.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_6c0,wai.name,"role",val);
}else{
var _6c9=val.split("-");
dojo.widget.wai.setAttr(_6c0,wai.name,_6c9[0],_6c9[1]);
}
}
},this);
var _6ca=_6c0.getAttribute(this.eventAttachProperty);
if(_6ca){
var evts=_6ca.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _6cc=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _6ce=tevt.split(":");
tevt=trim(_6ce[0]);
_6cc=trim(_6ce[1]);
}
if(!_6cc){
_6cc=tevt;
}
var tf=function(){
var ntf=new String(_6cc);
return function(evt){
if(_6be[ntf]){
_6be[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_6c0,tevt,tf,false,true);
}
}
for(var y=0;y<_6ba.length;y++){
var _6d2=_6c0.getAttribute(_6ba[y]);
if((_6d2)&&(_6d2.length)){
var _6cc=null;
var _6d3=_6ba[y].substr(4);
_6cc=trim(_6d2);
var _6d4=[_6cc];
if(_6cc.indexOf(";")>=0){
_6d4=dojo.lang.map(_6cc.split(";"),trim);
}
for(var z=0;z<_6d4.length;z++){
if(!_6d4[z].length){
continue;
}
var tf=function(){
var ntf=new String(_6d4[z]);
return function(evt){
if(_6be[ntf]){
_6be[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_6c0,_6d3,tf,false,true);
}
}
}
var _6d7=_6c0.getAttribute(this.onBuildProperty);
if(_6d7){
eval("var node = baseNode; var widget = targetObj; "+_6d7);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].legth<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,{initializer:function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,addChild:function(_6df,_6e0,pos,ref,_6e3){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_6e3==undefined){
_6e3=this.children.length;
}
this.addWidgetAsDirectChild(_6df,_6e0,pos,ref,_6e3);
this.registerChild(_6df,_6e3);
}
return _6df;
},addWidgetAsDirectChild:function(_6e4,_6e5,pos,ref,_6e8){
if((!this.containerNode)&&(!_6e5)){
this.containerNode=this.domNode;
}
var cn=(_6e5)?_6e5:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_6e8){
_6e8=0;
}
_6e4.domNode.setAttribute("dojoinsertionindex",_6e8);
if(!ref){
cn.appendChild(_6e4.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_6e4.domNode,ref.parentNode,_6e8);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_6e4.domNode);
}else{
dojo.dom.insertAtPosition(_6e4.domNode,cn,pos);
}
}
}
},registerChild:function(_6ea,_6eb){
_6ea.dojoInsertionIndex=_6eb;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<_6eb){
idx=i;
}
}
this.children.splice(idx+1,0,_6ea);
_6ea.parent=this;
_6ea.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_6ea.widgetId];
},removeChild:function(_6ee){
dojo.dom.removeNode(_6ee.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_6ee);
},getFragNodeRef:function(frag){
if(!frag||!frag[this.namespace+":"+this.widgetType.toLowerCase()]){
dojo.raise("Error: no frag for widget type "+this.widgetType+" with namespace "+this.namespace+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag?frag[this.namespace+":"+this.widgetType.toLowerCase()]["nodeRef"]:null;
},postInitialize:function(args,frag,_6f2){
var _6f3=this.getFragNodeRef(frag);
if(_6f2&&(_6f2.snarfChildDomOutput||!_6f3)){
_6f2.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_6f3);
}else{
if(_6f3){
if(this.domNode&&(this.domNode!==_6f3)){
var _6f4=_6f3.parentNode.replaceChild(this.domNode,_6f3);
}
}
}
if(_6f2){
_6f2.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.isContainer){
var _6f5=dojo.widget.getParser();
_6f5.createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _6fb=false;
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
if(args["templatepath"]){
_6fb=true;
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],args["templateCssPath"],null,_6fb);
var ts=dojo.widget._templateCache[this.widgetType];
if((ts)&&(!_6fb)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _6fd=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_6fd=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_6fd){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_6fd.length;i++){
var key=_6fd[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _704;
if((kval)||(dojo.lang.isString(kval))){
_704=(dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval;
tstr=tstr.replace(_6fd[i],_704);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_6fb){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_6fd)){
dojo.debug("weren't able to create template!");
return false;
}else{
if(!_6fd){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes(this.domNode,this);
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_706,_707){
if(!_707){
_707=this;
}
return dojo.widget.attachTemplateNodes(_706,_707,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
delete this.domNode;
}
catch(e){
}
},cleanUp:function(){
},getContainerHeight:function(){
dojo.unimplemented("dojo.widget.DomWidget.getContainerHeight");
},getContainerWidth:function(){
dojo.unimplemented("dojo.widget.DomWidget.getContainerWidth");
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.lfx.Animation");
dojo.provide("dojo.lfx.Line");
dojo.require("dojo.lang.func");
dojo.lfx.Line=function(_708,end){
this.start=_708;
this.end=end;
if(dojo.lang.isArray(_708)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_708;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:25,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
},_active:false,_paused:false});
dojo.lfx.Animation=function(_717,_718,_719,_71a,_71b,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_717)||(!_717&&_718.getValue)){
rate=_71b;
_71b=_71a;
_71a=_719;
_719=_718;
_718=_717;
_717=null;
}else{
if(_717.getValue||dojo.lang.isArray(_717)){
rate=_71a;
_71b=_719;
_71a=_718;
_719=_717;
_718=null;
_717=null;
}
}
if(dojo.lang.isArray(_719)){
this.curve=new dojo.lfx.Line(_719[0],_719[1]);
}else{
this.curve=_719;
}
if(_718!=null&&_718>0){
this.duration=_718;
}
if(_71b){
this.repeatCount=_71b;
}
if(rate){
this.rate=rate;
}
if(_717){
this.handler=_717.handler;
this.beforeBegin=_717.beforeBegin;
this.onBegin=_717.onBegin;
this.onEnd=_717.onEnd;
this.onPlay=_717.onPlay;
this.onPause=_717.onPause;
this.onStop=_717.onStop;
this.onAnimate=_717.onAnimate;
}
if(_71a&&dojo.lang.isFunction(_71a)){
this.easing=_71a;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_71d,_71e){
if(_71e){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_71d>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_71e);
}),_71d);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _720=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_720]);
this.fire("onBegin",[_720]);
}
this.fire("handler",["play",_720]);
this.fire("onPlay",[_720]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _721=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_721]);
this.fire("onPause",[_721]);
return this;
},gotoPercent:function(pct,_723){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_723){
this.play();
}
},stop:function(_724){
clearTimeout(this._timer);
var step=this._percent/100;
if(_724){
step=1;
}
var _726=this.curve.getValue(step);
this.fire("handler",["stop",_726]);
this.fire("onStop",[_726]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _729=this.curve.getValue(step);
this.fire("handler",["animate",_729]);
this.fire("onAnimate",[_729]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _72a=arguments;
if(_72a.length==1&&(dojo.lang.isArray(_72a[0])||dojo.lang.isArrayLike(_72a[0]))){
_72a=_72a[0];
}
var _72b=this;
dojo.lang.forEach(_72a,function(anim){
_72b._anims.push(anim);
var _72d=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_72d();
_72b._onAnimsEnded();
};
});
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_72e,_72f){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_72e>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_72f);
}),_72e);
return this;
}
if(_72f||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_72f);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_730){
this.fire("onStop");
this._animsCall("stop",_730);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_731){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _734=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_731](args);
},_734);
return this;
}});
dojo.lfx.Chain=function(){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _736=arguments;
if(_736.length==1&&(dojo.lang.isArray(_736[0])||dojo.lang.isArrayLike(_736[0]))){
_736=_736[0];
}
var _737=this;
dojo.lang.forEach(_736,function(anim,i,_73a){
_737._anims.push(anim);
var _73b=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
if(i<_73a.length-1){
anim.onEnd=function(){
_73b();
_737._playNext();
};
}else{
anim.onEnd=function(){
_73b();
_737.fire("onEnd");
};
}
},_737);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_73c,_73d){
if(!this._anims.length){
return this;
}
if(_73d||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _73e=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_73c>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_73d);
}),_73c);
return this;
}
if(_73e){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_73e.play(null,_73d);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _73f=this._anims[this._currAnim];
if(_73f){
if(!_73f._active||_73f._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _740=this._anims[this._currAnim];
if(_740){
_740.stop();
this.fire("onStop",[this._currAnim]);
}
return _740;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(){
var _741=arguments;
if(dojo.lang.isArray(arguments[0])){
_741=arguments[0];
}
return new dojo.lfx.Combine(_741);
};
dojo.lfx.chain=function(){
var _742=arguments;
if(dojo.lang.isArray(arguments[0])){
_742=arguments[0];
}
return new dojo.lfx.Chain(_742);
};
dojo.provide("dojo.lfx.html");
dojo.require("dojo.lfx.Animation");
dojo.require("dojo.html");
dojo.lfx.html._byId=function(_743){
if(!_743){
return [];
}
if(dojo.lang.isArray(_743)){
if(!_743.alreadyChecked){
var n=[];
dojo.lang.forEach(_743,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _743;
}
}else{
var n=[];
n.push(dojo.byId(_743));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_746,_747,_748,_749){
_746=dojo.lfx.html._byId(_746);
if(_746.length==1){
dojo.lang.forEach(_747,function(prop){
if(typeof prop["start"]=="undefined"){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.style.getComputedStyle(_746[0],prop.property));
}else{
prop.start=dojo.style.getOpacity(_746[0]);
}
}
});
}
var _74b=function(_74c){
var _74d=new Array(_74c.length);
for(var i=0;i<_74c.length;i++){
_74d[i]=Math.round(_74c[i]);
}
return _74d;
};
var _74f=function(n,_751){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _751){
if(s=="opacity"){
dojo.style.setOpacity(n,_751[s]);
}else{
n.style[s]=_751[s];
}
}
};
var _753=function(_754){
this._properties=_754;
this.diffs=new Array(_754.length);
dojo.lang.forEach(_754,function(prop,i){
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.graphics.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _75b=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.graphics.color.Color){
_75b=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_75b+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_75b+=")";
}else{
_75b=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.style.toCamelCase(prop.property)]=_75b;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({onAnimate:function(_75e){
dojo.lang.forEach(_746,function(node){
_74f(node,_75e);
});
}},_748,new _753(_747),_749);
return anim;
};
dojo.lfx.html._makeFadeable=function(_760){
var _761=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.style.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.style.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_760)){
dojo.lang.forEach(_760,_761);
}else{
_761(_760);
}
};
dojo.lfx.html.fadeIn=function(_763,_764,_765,_766){
_763=dojo.lfx.html._byId(_763);
dojo.lfx.html._makeFadeable(_763);
var anim=dojo.lfx.propertyAnimation(_763,[{property:"opacity",start:dojo.style.getOpacity(_763[0]),end:1}],_764,_765);
if(_766){
var _768=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_768();
_766(_763,anim);
};
}
return anim;
};
dojo.lfx.html.fadeOut=function(_769,_76a,_76b,_76c){
_769=dojo.lfx.html._byId(_769);
dojo.lfx.html._makeFadeable(_769);
var anim=dojo.lfx.propertyAnimation(_769,[{property:"opacity",start:dojo.style.getOpacity(_769[0]),end:0}],_76a,_76b);
if(_76c){
var _76e=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_76e();
_76c(_769,anim);
};
}
return anim;
};
dojo.lfx.html.fadeShow=function(_76f,_770,_771,_772){
var anim=dojo.lfx.html.fadeIn(_76f,_770,_771,_772);
var _774=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_774();
if(dojo.lang.isArrayLike(_76f)){
dojo.lang.forEach(_76f,dojo.style.show);
}else{
dojo.style.show(_76f);
}
};
return anim;
};
dojo.lfx.html.fadeHide=function(_775,_776,_777,_778){
var anim=dojo.lfx.html.fadeOut(_775,_776,_777,function(){
if(dojo.lang.isArrayLike(_775)){
dojo.lang.forEach(_775,dojo.style.hide);
}else{
dojo.style.hide(_775);
}
if(_778){
_778(_775,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_77a,_77b,_77c,_77d){
_77a=dojo.lfx.html._byId(_77a);
var _77e=[];
dojo.lang.forEach(_77a,function(node){
var _780=dojo.style.getStyle(node,"overflow");
if(_780=="visible"){
node.style.overflow="hidden";
}
node.style.height="0px";
dojo.style.show(node);
var anim=dojo.lfx.propertyAnimation(node,[{property:"height",start:0,end:node.scrollHeight}],_77b,_77c);
var _782=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_782();
node.style.overflow=_780;
node.style.height="auto";
if(_77d){
_77d(node,anim);
}
};
_77e.push(anim);
});
if(_77a.length>1){
return dojo.lfx.combine(_77e);
}else{
return _77e[0];
}
};
dojo.lfx.html.wipeOut=function(_783,_784,_785,_786){
_783=dojo.lfx.html._byId(_783);
var _787=[];
dojo.lang.forEach(_783,function(node){
var _789=dojo.style.getStyle(node,"overflow");
if(_789=="visible"){
node.style.overflow="hidden";
}
dojo.style.show(node);
var anim=dojo.lfx.propertyAnimation(node,[{property:"height",start:dojo.style.getContentBoxHeight(node),end:0}],_784,_785);
var _78b=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_78b();
dojo.style.hide(node);
node.style.overflow=_789;
if(_786){
_786(node,anim);
}
};
_787.push(anim);
});
if(_783.length>1){
return dojo.lfx.combine(_787);
}else{
return _787[0];
}
};
dojo.lfx.html.slideTo=function(_78c,_78d,_78e,_78f,_790){
_78c=dojo.lfx.html._byId(_78c);
var _791=[];
dojo.lang.forEach(_78c,function(node){
var top=null;
var left=null;
var init=(function(){
var _796=node;
return function(){
var pos=dojo.style.getComputedStyle(_796,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(dojo.style.getComputedStyle(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(dojo.style.getComputedStyle(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.style.abs(_796,true);
dojo.style.setStyleAttributes(_796,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,[{property:"top",start:top,end:_78d[0]},{property:"left",start:left,end:_78d[1]}],_78e,_78f);
var _79a=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_79a();
init();
};
if(_790){
var _79b=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_79b();
_790(_78c,anim);
};
}
_791.push(anim);
});
if(_78c.length>1){
return dojo.lfx.combine(_791);
}else{
return _791[0];
}
};
dojo.lfx.html.slideBy=function(_79c,_79d,_79e,_79f,_7a0){
_79c=dojo.lfx.html._byId(_79c);
var _7a1=[];
dojo.lang.forEach(_79c,function(node){
var top=null;
var left=null;
var init=(function(){
var _7a6=node;
return function(){
var pos=dojo.style.getComputedStyle(_7a6,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(dojo.style.getComputedStyle(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(dojo.style.getComputedStyle(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.style.abs(_7a6,true);
dojo.style.setStyleAttributes(_7a6,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,[{property:"top",start:top,end:top+_79d[0]},{property:"left",start:left,end:left+_79d[1]}],_79e,_79f);
var _7aa=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_7aa();
init();
};
if(_7a0){
var _7ab=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_7ab();
_7a0(_79c,anim);
};
}
_7a1.push(anim);
});
if(_79c.length>1){
return dojo.lfx.combine(_7a1);
}else{
return _7a1[0];
}
};
dojo.lfx.html.explode=function(_7ac,_7ad,_7ae,_7af,_7b0){
_7ac=dojo.byId(_7ac);
_7ad=dojo.byId(_7ad);
var _7b1=dojo.style.toCoordinateArray(_7ac,true);
var _7b2=document.createElement("div");
dojo.html.copyStyle(_7b2,_7ad);
with(_7b2.style){
position="absolute";
display="none";
}
dojo.body().appendChild(_7b2);
with(_7ad.style){
visibility="hidden";
display="block";
}
var _7b3=dojo.style.toCoordinateArray(_7ad,true);
with(_7ad.style){
display="none";
visibility="visible";
}
var anim=new dojo.lfx.propertyAnimation(_7b2,[{property:"height",start:_7b1[3],end:_7b3[3]},{property:"width",start:_7b1[2],end:_7b3[2]},{property:"top",start:_7b1[1],end:_7b3[1]},{property:"left",start:_7b1[0],end:_7b3[0]},{property:"opacity",start:0.3,end:1}],_7ae,_7af);
anim.beforeBegin=function(){
dojo.style.setDisplay(_7b2,"block");
};
anim.onEnd=function(){
dojo.style.setDisplay(_7ad,"block");
_7b2.parentNode.removeChild(_7b2);
};
if(_7b0){
var _7b5=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_7b5();
_7b0(_7ad,anim);
};
}
return anim;
};
dojo.lfx.html.implode=function(_7b6,end,_7b8,_7b9,_7ba){
_7b6=dojo.byId(_7b6);
end=dojo.byId(end);
var _7bb=dojo.style.toCoordinateArray(_7b6,true);
var _7bc=dojo.style.toCoordinateArray(end,true);
var _7bd=document.createElement("div");
dojo.html.copyStyle(_7bd,_7b6);
dojo.style.setOpacity(_7bd,0.3);
with(_7bd.style){
position="absolute";
display="none";
}
dojo.body().appendChild(_7bd);
var anim=new dojo.lfx.propertyAnimation(_7bd,[{property:"height",start:_7bb[3],end:_7bc[3]},{property:"width",start:_7bb[2],end:_7bc[2]},{property:"top",start:_7bb[1],end:_7bc[1]},{property:"left",start:_7bb[0],end:_7bc[0]},{property:"opacity",start:1,end:0.3}],_7b8,_7b9);
anim.beforeBegin=function(){
dojo.style.hide(_7b6);
dojo.style.show(_7bd);
};
anim.onEnd=function(){
_7bd.parentNode.removeChild(_7bd);
};
if(_7ba){
var _7bf=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_7bf();
_7ba(_7b6,anim);
};
}
return anim;
};
dojo.lfx.html.highlight=function(_7c0,_7c1,_7c2,_7c3,_7c4){
_7c0=dojo.lfx.html._byId(_7c0);
var _7c5=[];
dojo.lang.forEach(_7c0,function(node){
var _7c7=dojo.style.getBackgroundColor(node);
var bg=dojo.style.getStyle(node,"background-color").toLowerCase();
var _7c9=dojo.style.getStyle(node,"background-image");
var _7ca=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_7c7.length>3){
_7c7.pop();
}
var rgb=new dojo.graphics.color.Color(_7c1);
var _7cc=new dojo.graphics.color.Color(_7c7);
var anim=dojo.lfx.propertyAnimation(node,[{property:"background-color",start:rgb,end:_7cc}],_7c2,_7c3);
var _7ce=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_7ce();
if(_7c9){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
};
var _7cf=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_7cf();
if(_7c9){
node.style.backgroundImage=_7c9;
}
if(_7ca){
node.style.backgroundColor="transparent";
}
if(_7c4){
_7c4(node,anim);
}
};
_7c5.push(anim);
});
if(_7c0.length>1){
return dojo.lfx.combine(_7c5);
}else{
return _7c5[0];
}
};
dojo.lfx.html.unhighlight=function(_7d0,_7d1,_7d2,_7d3,_7d4){
_7d0=dojo.lfx.html._byId(_7d0);
var _7d5=[];
dojo.lang.forEach(_7d0,function(node){
var _7d7=new dojo.graphics.color.Color(dojo.style.getBackgroundColor(node));
var rgb=new dojo.graphics.color.Color(_7d1);
var _7d9=dojo.style.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,[{property:"background-color",start:_7d7,end:rgb}],_7d2,_7d3);
var _7db=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_7db();
if(_7d9){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_7d7.toRgb().join(",")+")";
};
var _7dc=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_7dc();
if(_7d4){
_7d4(node,anim);
}
};
_7d5.push(anim);
});
if(_7d0.length>1){
return dojo.lfx.combine(_7d5);
}else{
return _7d5[0];
}
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.kwCompoundRequire({browser:["dojo.lfx.html"],dashboard:["dojo.lfx.html"]});
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.require("dojo.lfx.*");
dojo.lfx.toggle.plain={show:function(node,_7de,_7df,_7e0){
dojo.style.show(node);
if(dojo.lang.isFunction(_7e0)){
_7e0();
}
},hide:function(node,_7e2,_7e3,_7e4){
dojo.style.hide(node);
if(dojo.lang.isFunction(_7e4)){
_7e4();
}
}};
dojo.lfx.toggle.fade={show:function(node,_7e6,_7e7,_7e8){
dojo.lfx.fadeShow(node,_7e6,_7e7,_7e8).play();
},hide:function(node,_7ea,_7eb,_7ec){
dojo.lfx.fadeHide(node,_7ea,_7eb,_7ec).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_7ee,_7ef,_7f0){
dojo.lfx.wipeIn(node,_7ee,_7ef,_7f0).play();
},hide:function(node,_7f2,_7f3,_7f4){
dojo.lfx.wipeOut(node,_7f2,_7f3,_7f4).play();
}};
dojo.lfx.toggle.explode={show:function(node,_7f6,_7f7,_7f8,_7f9){
dojo.lfx.explode(_7f9||[0,0,0,0],node,_7f6,_7f7,_7f8).play();
},hide:function(node,_7fb,_7fc,_7fd,_7fe){
dojo.lfx.implode(node,_7fe||[0,0,0,0],_7fb,_7fc,_7fd).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.require("dojo.widget.DomWidget");
dojo.require("dojo.html");
dojo.require("dojo.html.extras");
dojo.require("dojo.lang.extras");
dojo.require("dojo.lang.func");
dojo.require("dojo.lfx.toggle");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{widgetType:"HtmlWidget",templateCssPath:null,templatePath:null,toggle:"plain",toggleDuration:150,animationInProgress:false,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},getContainerHeight:function(){
dojo.unimplemented("dojo.widget.HtmlWidget.getContainerHeight");
},getContainerWidth:function(){
return this.parent.domNode.offsetWidth;
},setNativeHeight:function(_803){
var ch=this.getContainerHeight();
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_807){
try{
if(!_807&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
this.domNode.parentNode.removeChild(this.domNode);
delete this.domNode;
}
catch(e){
}
},isShowing:function(){
return dojo.style.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isHidden){
this.show();
}else{
this.hide();
}
},show:function(){
this.animationInProgress=true;
this.isHidden=false;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
this.animationInProgress=true;
this.isHidden=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
w=w||dojo.style.getOuterWidth(this.domNode);
h=h||dojo.style.getOuterHeight(this.domNode);
if(this.width==w&&this.height==h){
return false;
}
this.width=w;
this.height=h;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
if(!this._isResized(w,h)){
return;
}
dojo.style.setOuterWidth(this.domNode,w);
dojo.style.setOuterHeight(this.domNode,h);
this.onResized();
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_80c){
_80c.checkSize();
});
}});
dojo.kwCompoundRequire({common:["dojo.xml.Parse","dojo.widget.Widget","dojo.widget.Parse","dojo.widget.Manager"],browser:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],dashboard:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],svg:["dojo.widget.SvgWidget"],rhino:["dojo.widget.SwtWidget"]});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.widget.ComboBox");
dojo.require("dojo.widget.*");
dojo.require("dojo.event.*");
dojo.widget.incrementalComboBoxDataProvider=function(url,_80e,_80f){
this.searchUrl=url;
this.inFlight=false;
this.activeRequest=null;
this.allowCache=false;
this.cache={};
this.init=function(cbox){
this.searchUrl=cbox.dataUrl;
};
this.addToCache=function(_811,data){
if(this.allowCache){
this.cache[_811]=data;
}
};
this.startSearch=function(_813,type,_815){
if(this.inFlight){
}
var tss=encodeURIComponent(_813);
var _817=dojo.string.paramString(this.searchUrl,{"searchString":tss});
var _818=this;
var _819=dojo.io.bind({url:_817,method:"get",mimetype:"text/json",load:function(type,data,evt){
_818.inFlight=false;
if(!dojo.lang.isArray(data)){
var _81d=[];
for(var key in data){
_81d.push([data[key],key]);
}
data=_81d;
}
_818.addToCache(_813,data);
_818.provideSearchResults(data);
}});
this.inFlight=true;
};
};
dojo.widget.ComboBoxDataProvider=function(_81f,_820,_821){
this.data=[];
this.searchTimeout=_821||500;
this.searchLimit=_820||30;
this.searchType="STARTSTRING";
this.caseSensitive=false;
this._lastSearch="";
this._lastSearchResults=null;
this.init=function(cbox,node){
if(!dojo.string.isBlank(cbox.dataUrl)){
this.getData(cbox.dataUrl);
}else{
if((node)&&(node.nodeName.toLowerCase()=="select")){
var opts=node.getElementsByTagName("option");
var ol=opts.length;
var data=[];
for(var x=0;x<ol;x++){
var _828=[new String(opts[x].innerHTML),new String(opts[x].value)];
data.push(_828);
if(opts[x].selected){
cbox.setAllValues(_828[0],_828[1]);
}
}
this.setData(data);
}
}
};
this.getData=function(url){
dojo.io.bind({url:url,load:dojo.lang.hitch(this,function(type,data,evt){
if(!dojo.lang.isArray(data)){
var _82d=[];
for(var key in data){
_82d.push([data[key],key]);
}
data=_82d;
}
this.setData(data);
}),mimetype:"text/json"});
};
this.startSearch=function(_82f,type,_831){
this._preformSearch(_82f,type,_831);
};
this._preformSearch=function(_832,type,_834){
var st=type||this.searchType;
var ret=[];
if(!this.caseSensitive){
_832=_832.toLowerCase();
}
for(var x=0;x<this.data.length;x++){
if((!_834)&&(ret.length>=this.searchLimit)){
break;
}
var _838=new String((!this.caseSensitive)?this.data[x][0].toLowerCase():this.data[x][0]);
if(_838.length<_832.length){
continue;
}
if(st=="STARTSTRING"){
if(_832==_838.substr(0,_832.length)){
ret.push(this.data[x]);
}
}else{
if(st=="SUBSTRING"){
if(_838.indexOf(_832)>=0){
ret.push(this.data[x]);
}
}else{
if(st=="STARTWORD"){
var idx=_838.indexOf(_832);
if(idx==0){
ret.push(this.data[x]);
}
if(idx<=0){
continue;
}
var _83a=false;
while(idx!=-1){
if(" ,/(".indexOf(_838.charAt(idx-1))!=-1){
_83a=true;
break;
}
idx=_838.indexOf(_832,idx+1);
}
if(!_83a){
continue;
}else{
ret.push(this.data[x]);
}
}
}
}
}
this.provideSearchResults(ret);
};
this.provideSearchResults=function(_83b){
};
this.addData=function(_83c){
this.data=this.data.concat(_83c);
};
this.setData=function(_83d){
this.data=_83d;
};
if(_81f){
this.setData(_81f);
}
};
dojo.declare("dojo.widget.ComboBox",null,{widgetType:"ComboBox",isContainer:false,forceValidOption:false,searchType:"stringstart",dataProvider:null,startSearch:function(_83e){
},openResultList:function(_83f){
},clearResultList:function(){
},hideResultList:function(){
},selectNextResult:function(){
},selectPrevResult:function(){
},setSelectedResult:function(){
}});
dojo.provide("dojo.widget.html.stabile");
dojo.widget.html.stabile={_sqQuotables:new RegExp("([\\\\'])","g"),_depth:0,_recur:false,depthLimit:2};
dojo.widget.html.stabile.getState=function(id){
dojo.widget.html.stabile.setup();
return dojo.widget.html.stabile.widgetState[id];
};
dojo.widget.html.stabile.setState=function(id,_842,_843){
dojo.widget.html.stabile.setup();
dojo.widget.html.stabile.widgetState[id]=_842;
if(_843){
dojo.widget.html.stabile.commit(dojo.widget.html.stabile.widgetState);
}
};
dojo.widget.html.stabile.setup=function(){
if(!dojo.widget.html.stabile.widgetState){
var text=dojo.widget.html.stabile.getStorage().value;
dojo.widget.html.stabile.widgetState=text?dj_eval("("+text+")"):{};
}
};
dojo.widget.html.stabile.commit=function(_845){
dojo.widget.html.stabile.getStorage().value=dojo.widget.html.stabile.description(_845);
};
dojo.widget.html.stabile.description=function(v,_847){
var _848=dojo.widget.html.stabile._depth;
var _849=function(){
return this.description(this,true);
};
try{
if(v===void (0)){
return "undefined";
}
if(v===null){
return "null";
}
if(typeof (v)=="boolean"||typeof (v)=="number"||v instanceof Boolean||v instanceof Number){
return v.toString();
}
if(typeof (v)=="string"||v instanceof String){
var v1=v.replace(dojo.widget.html.stabile._sqQuotables,"\\$1");
v1=v1.replace(/\n/g,"\\n");
v1=v1.replace(/\r/g,"\\r");
return "'"+v1+"'";
}
if(v instanceof Date){
return "new Date("+d.getFullYear+","+d.getMonth()+","+d.getDate()+")";
}
var d;
if(v instanceof Array||v.push){
if(_848>=dojo.widget.html.stabile.depthLimit){
return "[ ... ]";
}
d="[";
var _84c=true;
dojo.widget.html.stabile._depth++;
for(var i=0;i<v.length;i++){
if(_84c){
_84c=false;
}else{
d+=",";
}
d+=arguments.callee(v[i],_847);
}
return d+"]";
}
if(v.constructor==Object||v.toString==_849){
if(_848>=dojo.widget.html.stabile.depthLimit){
return "{ ... }";
}
if(typeof (v.hasOwnProperty)!="function"&&v.prototype){
throw new Error("description: "+v+" not supported by script engine");
}
var _84c=true;
d="{";
dojo.widget.html.stabile._depth++;
for(var key in v){
if(v[key]==void (0)||typeof (v[key])=="function"){
continue;
}
if(_84c){
_84c=false;
}else{
d+=", ";
}
var kd=key;
if(!kd.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)){
kd=arguments.callee(key,_847);
}
d+=kd+": "+arguments.callee(v[key],_847);
}
return d+"}";
}
if(_847){
if(dojo.widget.html.stabile._recur){
var _850=Object.prototype.toString;
return _850.apply(v,[]);
}else{
dojo.widget.html.stabile._recur=true;
return v.toString();
}
}else{
throw new Error("Unknown type: "+v);
return "'unknown'";
}
}
finally{
dojo.widget.html.stabile._depth=_848;
}
};
dojo.widget.html.stabile.getStorage=function(){
if(dojo.widget.html.stabile.dataField){
return dojo.widget.html.stabile.dataField;
}
var form=document.forms._dojo_form;
return dojo.widget.html.stabile.dataField=form?form.stabile:{value:""};
};
dojo.provide("dojo.widget.html.ComboBox");
dojo.require("dojo.widget.ComboBox");
dojo.require("dojo.widget.*");
dojo.require("dojo.io.*");
dojo.require("dojo.lfx.*");
dojo.require("dojo.dom");
dojo.require("dojo.html");
dojo.require("dojo.string");
dojo.require("dojo.widget.html.stabile");
dojo.widget.defineWidget("dojo.widget.html.ComboBox",[dojo.widget.HtmlWidget,dojo.widget.ComboBox],{autoComplete:true,formInputName:"",name:"",textInputNode:null,comboBoxValue:null,comboBoxSelectionValue:null,optionsListWrapper:null,optionsListNode:null,downArrowNode:null,cbTableNode:null,searchTimer:null,searchDelay:100,dataUrl:"",fadeTime:200,maxListLength:8,mode:"local",selectedResult:null,_highlighted_option:null,_prev_key_backspace:false,_prev_key_esc:false,_result_list_open:false,_gotFocus:false,_mouseover_list:false,dataProviderClass:"dojo.widget.ComboBoxDataProvider",templateString:"<div style=\"position: relative; z-index: 100;\">\n	<input style=\"display:none\"  tabindex=\"-1\" name=\"\" value=\"\" \n		dojoAttachPoint=\"comboBoxValue\">\n	<input style=\"display:none\"  tabindex=\"-1\" name=\"\" value=\"\" \n		dojoAttachPoint=\"comboBoxSelectionValue\">\n	<table class=\"dojoComboBox\"\n		cellpadding=\"0\"\n		cellmargin=\"0\"\n		border=\"0\"\n		dojoAttachPoint=\"cbTableNode\">\n		<tr valign=\"top\">\n			<td width=100%>\n				<input type=\"text\" autocomplete=\"off\" class=\"dojoComboBoxInput\"\n					dojoAttachEvent=\"keyDown: onKeyDown; keyUp: onKeyUp; keyPress: onKeyPress; compositionEnd\"\n					dojoAttachPoint=\"textInputNode\"\n					style=\"width: 100%;\">\n			</td>\n			<td>\n				<img border=\"0\" \n					hspace=\"0\"\n					vspace=\"0\"\n					dojoAttachPoint=\"downArrowNode\"\n					dojoAttachEvent=\"onMouseUp: handleArrowClick;\"\n					src=\"${dojoRoot}src/widget/templates/images/combo_box_arrow.png\">\n			</td>\n		</tr>\n	</table>\n	<div dojoAttachPoint=\"optionsListWrapper\" style=\"position:relative;\" tabindex=\"-1\">\n		<div class=\"dojoComboBoxOptions\" dojoAttachPoint=\"optionsListNode\"\n			dojoAttachEvent=\"onClick: selectOption;  onMouseOver: _onMouseOver; onMouseOut: _onMouseOut;\"\n			style=\"display:none;\" tabindex=\"-1\">\n		</div>\n	</div>\n</div>\n",templateCssString:"input.dojoComboBoxInput {\n	/* font-size: 0.8em; */\n	border: 0px;\n	\n}\n\n.dojoComboBoxOptions {\n	font-family: Verdana, Helvetica, Garamond, sans-serif;\n	/* font-size: 0.7em; */\n	background-color: white;\n	border: 1px solid #afafaf;\n	position: absolute;\n	z-index: 1000; \n	overflow: auto;\n	-moz-opacity: 0;\n	cursor: default;\n}\n\ntable.dojoComboBox {\n	border: 1px solid #afafaf;\n}\n\n.dojoComboBoxItem {\n	padding-left: 2px;\n	padding-top: 2px;\n	margin: 0px;\n}\n\n.dojoComboBoxItemEven {\n	background-color: #f4f4f4;\n}\n\n.dojoComboBoxItemOdd {\n	background-color: white;\n}\n\n.dojoComboBoxItemHighlight {\n	background-color: #63709A;\n	color: white;\n}\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/HtmlComboBox.css"),setValue:function(_852){
this.comboBoxValue.value=_852;
if(this.textInputNode.value!=_852){
this.textInputNode.value=_852;
}
dojo.widget.html.stabile.setState(this.widgetId,this.getState(),true);
this.onValueChanged(_852);
},onValueChanged:function(){
},getValue:function(){
return this.comboBoxValue.value;
},getState:function(){
return {value:this.getValue()};
},setState:function(_853){
this.setValue(_853.value);
},getCaretPos:function(_854){
if(dojo.lang.isNumber(_854.selectionStart)){
return _854.selectionStart;
}else{
if(dojo.render.html.ie){
var tr=document.selection.createRange().duplicate();
var ntr=_854.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
return String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
return 0;
}
}
}
},setCaretPos:function(_857,_858){
_858=parseInt(_858);
this.setSelectedRange(_857,_858,_858);
},setSelectedRange:function(_859,_85a,end){
if(!end){
end=_859.value.length;
}
if(_859.setSelectionRange){
_859.focus();
_859.setSelectionRange(_85a,end);
}else{
if(_859.createTextRange){
var _85c=_859.createTextRange();
with(_85c){
collapse(true);
moveEnd("character",end);
moveStart("character",_85a);
select();
}
}else{
_859.value=_859.value;
_859.blur();
_859.focus();
var dist=parseInt(_859.value.length)-end;
var _85e=String.fromCharCode(37);
var tcc=_85e.charCodeAt(0);
for(var x=0;x<dist;x++){
var te=document.createEvent("KeyEvents");
te.initKeyEvent("keypress",true,true,null,false,false,false,false,tcc,tcc);
_859.dispatchEvent(te);
}
}
}
},_handleKeyEvents:function(evt){
if(evt.ctrlKey||evt.altKey){
return;
}
this._prev_key_backspace=false;
this._prev_key_esc=false;
var k=dojo.event.browser.keys;
var _864=true;
var _865=evt.keyCode;
if(_865==0&&evt.charCode==k.KEY_SPACE){
_865=k.KEY_SPACE;
}
if(dojo.render.html.safari){
switch(_865){
case 63232:
_865=k.KEY_UP_ARROW;
break;
case 63233:
_865=k.KEY_DOWN_ARROW;
break;
}
}
switch(_865){
case k.KEY_DOWN_ARROW:
if(!this._result_list_open){
this.startSearchFromInput();
}
this.highlightNextOption();
dojo.event.browser.stopEvent(evt);
return;
case k.KEY_UP_ARROW:
this.highlightPrevOption();
dojo.event.browser.stopEvent(evt);
return;
case k.KEY_ENTER:
if(this._result_list_open){
dojo.event.browser.stopEvent(evt);
}
case k.KEY_TAB:
if(!this.autoComplete&&this._result_list_open&&this._highlighted_option){
dojo.event.browser.stopEvent(evt);
this.selectOption({"target":this._highlighted_option,"noHide":false});
this.setSelectedRange(this.textInputNode,this.textInputNode.value.length,null);
}else{
this.selectOption();
return;
}
break;
case k.KEY_SPACE:
if(this._result_list_open&&this._highlighted_option){
dojo.event.browser.stopEvent(evt);
this.selectOption();
this.hideResultList();
return;
}
break;
case k.KEY_ESCAPE:
this.hideResultList();
this._prev_key_esc=true;
return;
case k.KEY_BACKSPACE:
this._prev_key_backspace=true;
if(!this.textInputNode.value.length){
this.setAllValues("","");
this.hideResultList();
_864=false;
}
break;
case k.KEY_RIGHT_ARROW:
case k.KEY_LEFT_ARROW:
case k.KEY_SHIFT:
_864=false;
break;
default:
if(evt.charCode==0){
_864=false;
}
}
if(this.searchTimer){
clearTimeout(this.searchTimer);
}
if(_864){
this.blurOptionNode();
this.searchTimer=setTimeout(dojo.lang.hitch(this,this.startSearchFromInput),this.searchDelay);
}
},onKeyDown:function(evt){
if(!document.createEvent){
this._handleKeyEvents(evt);
}
},onKeyPress:function(evt){
if(document.createEvent){
this._handleKeyEvents(evt);
}
},compositionEnd:function(evt){
this._handleKeyEvents(evt);
},onKeyUp:function(evt){
this.setValue(this.textInputNode.value);
},setSelectedValue:function(_86a){
this.comboBoxSelectionValue.value=_86a;
},setAllValues:function(_86b,_86c){
this.setValue(_86b);
this.setSelectedValue(_86c);
},scrollIntoView:function(){
var node=this._highlighted_option;
var _86e=this.optionsListNode;
if(dojo.render.html.ie||dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _86f=_86e.scrollTop+dojo.style.getInnerHeight(_86e);
var _870=node.offsetTop+dojo.style.getOuterHeight(node);
if(_86f<_870){
_86e.scrollTop+=(_870-_86f);
}else{
if(_86e.scrollTop>node.offsetTop){
_86e.scrollTop-=(_86e.scrollTop-node.offsetTop);
}
}
}
},focusOptionNode:function(node){
if(this._highlighted_option!=node){
this.blurOptionNode();
this._highlighted_option=node;
dojo.html.addClass(this._highlighted_option,"dojoComboBoxItemHighlight");
}
},blurOptionNode:function(){
if(this._highlighted_option){
dojo.html.removeClass(this._highlighted_option,"dojoComboBoxItemHighlight");
this._highlighted_option=null;
}
},highlightNextOption:function(){
if((!this._highlighted_option)||!this._highlighted_option.parentNode){
this.focusOptionNode(this.optionsListNode.firstChild);
}else{
if(this._highlighted_option.nextSibling){
this.focusOptionNode(this._highlighted_option.nextSibling);
}
}
this.scrollIntoView();
},highlightPrevOption:function(){
if(this._highlighted_option&&this._highlighted_option.previousSibling){
this.focusOptionNode(this._highlighted_option.previousSibling);
}else{
this._highlighted_option=null;
this.hideResultList();
return;
}
this.scrollIntoView();
},itemMouseOver:function(evt){
this.focusOptionNode(evt.target);
dojo.html.addClass(this._highlighted_option,"dojoComboBoxItemHighlight");
},itemMouseOut:function(evt){
this.blurOptionNode();
},fillInTemplate:function(args,frag){
this.comboBoxValue.name=this.name;
this.comboBoxSelectionValue.name=this.name+"_selected";
var _876=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_876);
var _877;
if(this.mode=="remote"){
_877=dojo.widget.incrementalComboBoxDataProvider;
}else{
if(typeof this.dataProviderClass=="string"){
_877=dojo.evalObjPath(this.dataProviderClass);
}else{
_877=this.dataProviderClass;
}
}
this.dataProvider=new _877();
this.dataProvider.init(this,this.getFragNodeRef(frag));
this.optionsIframe=new dojo.html.BackgroundIframe(this.optionsListWrapper);
this.optionsIframe.size([0,0,0,0]);
},focus:function(){
this.tryFocus();
},openResultList:function(_878){
this.clearResultList();
if(!_878.length){
this.hideResultList();
}
if((this.autoComplete)&&(_878.length)&&(!this._prev_key_backspace)&&(this.textInputNode.value.length>0)){
var cpos=this.getCaretPos(this.textInputNode);
if((cpos+1)>this.textInputNode.value.length){
this.textInputNode.value+=_878[0][0].substr(cpos);
this.setSelectedRange(this.textInputNode,cpos,this.textInputNode.value.length);
}
}
var even=true;
while(_878.length){
var tr=_878.shift();
if(tr){
var td=document.createElement("div");
td.appendChild(document.createTextNode(tr[0]));
td.setAttribute("resultName",tr[0]);
td.setAttribute("resultValue",tr[1]);
td.className="dojoComboBoxItem "+((even)?"dojoComboBoxItemEven":"dojoComboBoxItemOdd");
even=(!even);
this.optionsListNode.appendChild(td);
dojo.event.connect(td,"onmouseover",this,"itemMouseOver");
dojo.event.connect(td,"onmouseout",this,"itemMouseOut");
}
}
this.showResultList();
},onFocusInput:function(){
this._hasFocus=true;
},onBlurInput:function(){
this._hasFocus=false;
this._handleBlurTimer(true,500);
},_handleBlurTimer:function(_87d,_87e){
if(this.blurTimer&&(_87d||_87e)){
clearTimeout(this.blurTimer);
}
if(_87e){
this.blurTimer=dojo.lang.setTimeout(this,"checkBlurred",_87e);
}
},_onMouseOver:function(evt){
if(!this._mouseover_list){
this._handleBlurTimer(true,0);
this._mouseover_list=true;
}
},_onMouseOut:function(evt){
var _881=evt.relatedTarget;
if(!_881||_881.parentNode!=this.optionsListNode){
this._mouseover_list=false;
this._handleBlurTimer(true,100);
this.tryFocus();
}
},_isInputEqualToResult:function(_882){
input=this.textInputNode.value;
if(!this.dataProvider.caseSensitive){
input=input.toLowerCase();
_882=_882.toLowerCase();
}
return (input==_882);
},_isValidOption:function(){
tgt=dojo.dom.firstElement(this.optionsListNode);
isValidOption=false;
while(!isValidOption&&tgt){
if(this._isInputEqualToResult(tgt.getAttribute("resultName"))){
isValidOption=true;
}else{
tgt=dojo.dom.nextElement(tgt);
}
}
return isValidOption;
},checkBlurred:function(){
if(!this._hasFocus&&!this._mouseover_list){
this.hideResultList();
if(!this.textInputNode.value.length){
this.setAllValues("","");
return;
}
isValidOption=this._isValidOption();
if(this.forceValidOption&&!isValidOption){
this.setAllValues("","");
return;
}
if(!isValidOption){
this.setSelectedValue("");
}
}
},sizeBackgroundIframe:function(){
var w=dojo.style.getOuterWidth(this.optionsListNode);
var h=dojo.style.getOuterHeight(this.optionsListNode);
if(w==0||h==0){
dojo.lang.setTimeout(this,"sizeBackgroundIframe",100);
return;
}
if(this._result_list_open){
this.optionsIframe.size([0,0,w,h]);
}
},selectOption:function(evt){
var tgt=null;
if(!evt){
evt={target:this._highlighted_option};
}
if(!dojo.dom.isDescendantOf(evt.target,this.optionsListNode)){
if(!this.textInputNode.value.length){
return;
}
tgt=dojo.dom.firstElement(this.optionsListNode);
if(!tgt||!this._isInputEqualToResult(tgt.getAttribute("resultName"))){
return;
}
}else{
tgt=evt.target;
}
while((tgt.nodeType!=1)||(!tgt.getAttribute("resultName"))){
tgt=tgt.parentNode;
if(tgt===dojo.body()){
return false;
}
}
this.textInputNode.value=tgt.getAttribute("resultName");
this.selectedResult=[tgt.getAttribute("resultName"),tgt.getAttribute("resultValue")];
this.setAllValues(tgt.getAttribute("resultName"),tgt.getAttribute("resultValue"));
if(!evt.noHide){
this.hideResultList();
this.setSelectedRange(this.textInputNode,0,null);
}
this.tryFocus();
},clearResultList:function(){
var oln=this.optionsListNode;
while(oln.firstChild){
dojo.event.disconnect(oln.firstChild,"onmouseover",this,"itemMouseOver");
dojo.event.disconnect(oln.firstChild,"onmouseout",this,"itemMouseOut");
oln.removeChild(oln.firstChild);
}
},hideResultList:function(){
if(this._result_list_open){
this._result_list_open=false;
this.optionsIframe.size([0,0,0,0]);
dojo.lfx.fadeHide(this.optionsListNode,this.fadeTime).play();
}
},showResultList:function(){
var _888=this.optionsListNode.childNodes;
if(_888.length){
var _889=this.maxListLength;
if(_888.length<_889){
_889=_888.length;
}
with(this.optionsListNode.style){
display="";
height=((_889)?(dojo.style.getOuterHeight(_888[0])*_889):0)+"px";
width=dojo.html.getOuterWidth(this.cbTableNode)-2+"px";
}
if(!this._result_list_open){
dojo.html.setOpacity(this.optionsListNode,0);
dojo.lfx.fadeIn(this.optionsListNode,this.fadeTime).play();
}
this._iframeTimer=dojo.lang.setTimeout(this,"sizeBackgroundIframe",200);
this._result_list_open=true;
}else{
this.hideResultList();
}
},handleArrowClick:function(){
this._handleBlurTimer(true,0);
this.tryFocus();
if(this._result_list_open){
this.hideResultList();
}else{
this.startSearch("");
}
},tryFocus:function(){
try{
this.textInputNode.focus();
}
catch(e){
}
},startSearchFromInput:function(){
this.startSearch(this.textInputNode.value);
},postCreate:function(){
dojo.event.connect(this,"startSearch",this.dataProvider,"startSearch");
dojo.event.connect(this.dataProvider,"provideSearchResults",this,"openResultList");
dojo.event.connect(this.textInputNode,"onblur",this,"onBlurInput");
dojo.event.connect(this.textInputNode,"onfocus",this,"onFocusInput");
var s=dojo.widget.html.stabile.getState(this.widgetId);
if(s){
this.setState(s);
}
}});
dojo.require("dojo.io.*");
dojo.require("dojo.lang.*");
dojo.require("dojo.dom");
dojo.require("dojo.widget.*");
dojo.require("dojo.animation.*");
dojo.provide("cwp.PagePicker");
dojo.widget.defineWidget("cwp.PagePicker",dojo.widget.HtmlWidget,{isContainer:true,toggle:"fade",templateString:"<div class=\"pagePicker\">\n  <span class=\"pagePickerTitle\">Create a link</span>\n  <form>\n  PagePicker will\n  help you create a link to another page on this site.\n  <ol>\n    <li>First, choose a page to link to. Type keywords or a portion of the\n      page name below and PagePicker will help you find the page.<br>\n      <input dojoAttachPoint=\"search\">\n      <span class=\"pagePickerSpinner\"\n            dojoAttachPoint=\"spinner\">Searching...</span><br>\n      <span class=\"pagePickerQueryHelp\" dojoAttachPoint=\"help\" style=\"display: none;\">Below are some suggested pages to\n        choose from. To pick a page, click on it with the mouse.<br></span>&nbsp;\n      <div class=\"pagePickerResults\" dojoAttachPoint=\"results\" \n           style=\"display: none;\"><ul dojoAttachPoint=\"resultsList\"></ul></div></li>\n    <li>Next, type the text you'd like to appear as the link text<br>\n      <input dojoAttachPoint=\"title\"></li>\n    <li>Your link will appear in the document as follows:<br>\n      <span dojoAttachPoint=\"preview\"></span>&nbsp;</li>\n    <li>Finally, when\n    you are satisfied with the destination page and the look of the\n    link, you can insert the link into your document; or you can cancel\n    and your document will not be affected.</li>\n  </ol>\n  </form>\n</div>\n",templateCssString:".pagePicker { border: 1px solid black;\n              -moz-border-radius: 5px;\n              padding: 5pt;\n              background-color: #cfd7e9; }\n.pagePicker input { border: 1px solid #3671e9; \n                    width: 250px; }\n.pagePicker form { margin: 0px; }\n.pagePickerTitle { font-size: larger;\n                   font-family: sans-serif;\n                   font-weight: bold;\n                   display: block; \n                   border-bottom: 1px solid black; }\n.pagePickerQueryResults { font-weight: bold; }\n.pagePickerResults { border: 1px solid black;\n                     max-height: 150px;\n                     width: 250px;\n                     background-color: white;\n                     position: absolute;\n                     overflow-y: auto; \n                     -moz-border-radius: 5px; }\n.pagePickerResults ul { margin: 0px;\n                        padding: 0px; }\n.pagePickerResults li { display: block;\n                        border-bottom: 1px dashed blue;\n                        padding: 5px; \n                        cursor: pointer; }\n.pagePickerResults li:hover { background-color: #b2c4e9; }\n.pagePickerResults .title { font-size: larger;\n                            font-family: sans-serif;\n                            font-weight: bold;\n                            float: left; }\n.pagePickerResults .excerpt, .pagePickerResults .newpage { display: block; \n                              clear: both; }\n.pagePickerResults .hit { background-color: yellow; }\n.pagePickerResults .revision { float: right; \n                               font-size: small; }\n.user, .revision, .time, .newpage { color: gray; \n                                    font-size: xx-small; }\n.time { float: right; }\n.pagePickerSpinner { color: red; \n                     display: none; }",templateCssPath:dojo.uri.dojoUri("../src/js/cwp/template/PagePicker.css"),results:null,search:null,timer:null,timeout:200,lastQuery:"",linkTextModified:false,runQuery:function(){
if(this.lastQuery!=this.search.value){
this.lastQuery=this.search.value;
if(!this.search.value){
this.fadeout.play();
}else{
if(this.linkTextModified===false){
this.title.value=this.search.value;
}
var url=dojo.uri.dojoUri("../src/rest.php/page/search/"+escape(this.search.value)+"?format=xml");
var _88c=dojo.io.bind({url:url,load:dojo.lang.hitch(this,"doQuery"),error:function(type,_88e){
dojo.debug("AJAX error.");
dojo.debug("Type ="+type);
dojo.debug("error="+_88e);
dojo.debugShallow(_88e);
},mimetype:"text/xml"});
}
}
},doQuery:function(type,data,evt){
this.fadein.play();
this.resultsList.innerHTML=data;
if(this.results.childNodes.length>0){
var ul=this.results.getElementsByTagName("ul")[0];
if(ul===null){
return;
}
var c=dojo.dom.firstElement(ul);
if(c===null){
return;
}
do{
ret=(dojo.lang.hitch(this,function(){
var _c=c;
var _895=c.getElementsByTagName("span")[0];
var name="NoName";
try{
name=_895.innerText;
}
catch(e){
dojo.debug("Caught exception...");
dojo.debugShallow(e);
return false;
}
if(!name&&_895.textContent){
name=_895.textContent;
}
dojo.event.connect(_c,"onclick",dojo.lang.hitch(this,function(evt){
this.search.value=name;
this.lastQuery=name;
if(this.linkTextModified===false){
this.title.value=name;
this.preview.innerHTML="<a href=\"#\">"+name+"</a>";
}
this.fadeout.play();
this.search.focus();
}));
return true;
}))();
if(c==dojo.dom.lastElement(ul)||!ret){
break;
}
c=dojo.dom.nextElement(c);
if(!c.getElementsByTagName("span")){
break;
}
}while(true);
}
if(this.results.style.display=="none"){
this.fadein.play();
}
},initialize:function(args,frag){
dojo.widget.HtmlWidget.prototype.initialize(args,frag);
this.fadein={play:dojo.lang.hitch(this,function(){
this.searchSpinner.fadeout.play();
this.results.style.display="block";
this.help.style.display="inline";
})};
this.fadeout={play:dojo.lang.hitch(this,function(){
this.results.style.display="none";
this.help.style.display="none";
})};
this.searchSpinner={playing:false,fadein:{play:dojo.lang.hitch(this,function(){
if(this.searchSpinner.playing){
return;
}
this.searchSpinner.playing=true;
this.spinner.style.display="inline";
})},fadeout:{play:dojo.lang.hitch(this,function(){
if(!this.searchSpinner.playing){
return;
}
this.spinner.style.display="none";
this.searchSpinner.playing=false;
})}};
dojo.event.connect(this.title,"onkeyup",dojo.lang.hitch(this,function(evt){
this.linkTextModified=true;
var chr=String.fromCharCode(evt.charCode);
this.preview.innerHTML="<a href=#>"+this.title.value+"</a>";
}));
dojo.event.connect(this.insertButton,"onclick",dojo.lang.hitch(this,function(evt){
evt.preventDefault();
this.acceptLink(this.search.value,this.title.value);
}));
dojo.event.connect(this.cancelButton,"onclick",dojo.lang.hitch(this,function(evt){
evt.preventDefault();
this.cancelLink();
}));
dojo.event.connect(this.search,"onkeypress",dojo.lang.hitch(this,function(evt){
this.searchSpinner.fadein.play();
if(this.timer){
window.clearTimeout(this.timer);
}
this.timer=window.setTimeout(dojo.lang.hitch(this,"runQuery"),this.timeout);
}));
}});

