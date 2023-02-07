"use strict";
const common_vendor = require("../../../../../common/vendor.js");
var cfg = {
  errorImg: null,
  filter: null,
  highlight: null,
  onText: null,
  entities: {
    quot: '"',
    apos: "'",
    semi: ";",
    nbsp: "\xA0",
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: "\u2013",
    mdash: "\u2014",
    middot: "\xB7",
    lsquo: "\u2018",
    rsquo: "\u2019",
    ldquo: "\u201C",
    rdquo: "\u201D",
    bull: "\u2022",
    hellip: "\u2026"
  },
  blankChar: makeMap(" ,\xA0,	,\r,\n,\f"),
  boolAttrs: makeMap("allowfullscreen,autoplay,autostart,controls,ignore,loop,muted"),
  blockTags: makeMap("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),
  ignoreTags: makeMap("area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr"),
  richOnlyTags: makeMap("a,colgroup,fieldset,legend"),
  selfClosingTags: makeMap("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),
  trustTags: makeMap("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),
  userAgentStyles: {
    address: "font-style:italic",
    big: "display:inline;font-size:1.2em",
    blockquote: "background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px",
    caption: "display:table-caption;text-align:center",
    center: "text-align:center",
    cite: "font-style:italic",
    dd: "margin-left:40px",
    mark: "background-color:yellow",
    pre: "font-family:monospace;white-space:pre;overflow:scroll",
    s: "text-decoration:line-through",
    small: "display:inline;font-size:0.8em",
    u: "text-decoration:underline"
  }
};
function makeMap(str) {
  var map = /* @__PURE__ */ Object.create(null), list = str.split(",");
  for (var i = list.length; i--; )
    map[list[i]] = true;
  return map;
}
if (common_vendor.wx$1.canIUse("editor")) {
  cfg.blockTags.pre = void 0;
  cfg.ignoreTags.rp = true;
  Object.assign(cfg.richOnlyTags, makeMap("bdi,bdo,caption,rt,ruby"));
  Object.assign(cfg.trustTags, makeMap("bdi,bdo,caption,pre,rt,ruby"));
}
exports.cfg = cfg;
