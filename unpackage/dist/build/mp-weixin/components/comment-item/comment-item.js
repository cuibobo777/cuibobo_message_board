"use strict";const e=require("../../common/vendor.js"),t=require("../../utils/tools.js");if(!Array){(e.resolveComponent("u-avatar")+e.resolveComponent("uni-dateformat"))()}Math||((()=>"../../uni_modules/vk-uview-ui/components/u-avatar/u-avatar.js")+(()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js"))();const o={__name:"comment-item",props:{item:{type:Object},childState:{type:Boolean,default:!1},closeBtn:{type:Boolean,default:!1}},emits:["commentRemove"],setup(o,{emit:n}){const i=o,r=e.Es.database(),a=e.Es.importObject("utilsObject",{customUI:!0});e.ref(!1);const m=()=>{var t,o,n;let r=e.Es.getCurrentUserInfo().uid;(null==(t=i.item)?void 0:t.user_id[0]._id)==r||"webmaster"==(null==(o=e.Es.getCurrentUserInfo())?void 0:o.role[0])||"admin"==(null==(n=e.Es.getCurrentUserInfo())?void 0:n.role[0])?e.index.showModal({title:"确认是否删除",success:e=>{e.confirm&&s()}}):e.index.showToast({title:"无权限",icon:"error"})},s=()=>{let t=e.ref(0);r.collection("board_comment").where(`_id == '${i.item._id}' || reply_comment_id == '${i.item._id}'`).remove().then((o=>{var r;t.value=-1*o.result.deleted,console.log(t),e.index.showToast({title:"删除成功"}),r=i.item._id,n("commentRemove",r),a.operation("board_article","comment_count",i.item.article_id,parseInt(t.value))}))},l=()=>{i.childState||(e.index.setStorageSync("replyItem",i.item),e.index.navigateTo({url:"/pages/reply/reply"}))};return(n,r)=>e.e({a:e.p({src:e.unref(t.getAvatar)(o.item),size:"50"}),b:e.t(e.unref(t.getName)(o.item)),c:!i.closeBtn},i.closeBtn?{}:{d:e.o(m)},{e:e.t(o.item.comment_content),f:!i.childState},i.childState?{}:{g:e.t(o.item.totalReply||"")},{h:e.p({date:o.item.comment_date,threshold:[6e4,2592e6]}),i:e.t(o.item.province),j:e.o(l)})}},n=e._export_sfc(o,[["__scopeId","data-v-6274103e"]]);wx.createComponent(n);