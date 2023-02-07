"use strict";const e=require("../../../../common/vendor.js"),t=require("./libs/MpHtmlParser.js");require("./libs/config.js"),require("./libs/CssHandler.js");var i={},s=e.index.getFileSystemManager?e.index.getFileSystemManager():null;const n={name:"parser",emits:["parse","load","ready","error","imgtap","linkpress"],data:()=>({showAm:"",nodes:[]}),components:{trees:()=>"./libs/trees.js"},props:{html:String,autopause:{type:Boolean,default:!0},preview:{type:Boolean,default:!0},autoscroll:Boolean,autosetTitle:{type:Boolean,default:!0},compress:Number,loadingImg:String,useCache:Boolean,domain:String,lazyLoad:Boolean,selectable:Boolean,tagStyle:Object,showWithAnimation:Boolean,useAnchor:Boolean},watch:{html(e){this.setContent(e)}},created(){this.imgList=[],this.imgList.each=function(e){for(var t=0,i=this.length;t<i;t++)this.setItem(t,e(this[t],t,this))},this.imgList.setItem=function(t,i){if(null!=t&&i){if(0==i.indexOf("http")&&this.includes(i)){for(var n,r=i.split("://")[0],o=r.length;(n=i[o])&&("/"!=n||"/"==i[o-1]||"/"==i[o+1]);o++)r+=Math.random()>.5?n.toUpperCase():n;return r+=i.substr(o),this[t]=r}if(this[t]=i,i.includes("data:image")){var a,l=i.match(/data:image\/(\S+?);(\S+?),(.+)/);if(!l)return;a=`${e.wx$1.env.USER_DATA_PATH}/${Date.now()}.${l[1]}`,s&&s.writeFile({filePath:a,data:l[3],encoding:l[2],success:()=>this[t]=a})}}}},mounted(){this.html&&this.setContent(this.html)},beforeUnmount(){this.imgList.each((t=>{t&&t.includes(e.index.env.USER_DATA_PATH)&&s&&s.unlink({filePath:t})})),clearInterval(this._timer)},methods:{setContent(s,n){var r;if(!s)return this.nodes=[];var o,a=new t.MpHtmlParser(s,this);if(this.useCache){var l=function(e){for(var t=e.length,i=5381;t--;)i+=(i<<5)+e.charCodeAt(t);return i}(s);i[l]?r=i[l]:(r=a.parse(),i[l]=r)}else r=a.parse();this.$emit("parse",r),this.nodes=n?this.nodes.concat(r):r,r.length&&r.title&&this.autosetTitle&&e.index.setNavigationBarTitle({title:r.title}),this.imgList&&(this.imgList.length=0),this.videoContexts=[],this.$nextTick((()=>{!function e(t){for(var i=t.length;i--;)t[i].top&&(t[i].controls=[],t[i].init(),e(t[i].$children))}(this.$children),this.$emit("load")})),clearInterval(this._timer),this._timer=setInterval((()=>{e.index.createSelectorQuery().in(this).select("#_top").boundingClientRect().exec((e=>{e&&(this.rect=e[0],this.rect.height==o&&(this.$emit("ready",this.rect),clearInterval(this._timer)),o=this.rect.height)}))}),350),this.showWithAnimation&&!n&&(this.showAm="animation:_show .5s")},getText(e=this.nodes){for(var t,i="",s=0;t=e[s++];)if("text"==t.type)i+=t.text.replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");else if("br"==t.type)i+="\n";else{var n="p"==t.name||"div"==t.name||"tr"==t.name||"li"==t.name||"h"==t.name[0]&&t.name[1]>"0"&&t.name[1]<"7";n&&i&&"\n"!=i[i.length-1]&&(i+="\n"),t.children&&(i+=this.getText(t.children)),n&&"\n"!=i[i.length-1]?i+="\n":"td"!=t.name&&"th"!=t.name||(i+="\t")}return i},in(e){e.page&&e.selector&&e.scrollTop&&(this._in=e)},navigateTo(t){if(!this.useAnchor)return t.fail&&t.fail("Anchor is disabled");var i=e.index.createSelectorQuery().in(this._in?this._in.page:this).select((this._in?this._in.selector:"#_top")+(t.id?`>>>#${t.id},${this._in?this._in.selector:"#_top"}>>>.${t.id}`:"")).boundingClientRect();this._in?i.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect():i.selectViewport().scrollOffset(),i.exec((i=>{if(!i[0])return t.fail&&t.fail("Label not found");var s=i[1].scrollTop+i[0].top-(i[2]?i[2].top:0)+(t.offset||0);this._in?this._in.page[this._in.scrollTop]=s:e.index.pageScrollTo({scrollTop:s,duration:300}),t.success&&t.success()}))},getVideoContext(e){if(!e)return this.videoContexts;for(var t=this.videoContexts.length;t--;)if(this.videoContexts[t].id==e)return this.videoContexts[t]}}};if(!Array){e.resolveComponent("trees")()}const r=e._export_sfc(n,[["render",function(t,i,s,n,r,o){return e.e({a:!r.nodes.length},(r.nodes.length,{}),{b:e.p({nodes:r.nodes,lazyLoad:s.lazyLoad,loading:s.loadingImg}),c:e.s(r.showAm+(s.selectable?";user-select:text;-webkit-user-select:text":""))})}]]);wx.createComponent(r);
