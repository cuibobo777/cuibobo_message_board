"use strict";const e=require("../../common/vendor.js"),o=e.Es.database(),d={data:()=>({collectionList:[o.collection("board_like").where("user_id == $cloudEnv_uid").getTemp(),o.collection("board_article").field("_id,title").getTemp()],loadMore:{contentdown:"",contentrefresh:"",contentnomore:""}}),onPullDownRefresh(){this.$refs.udb.loadData({clear:!0},(()=>{e.index.stopPullDownRefresh()}))},onReachBottom(){this.$refs.udb.loadMore()},methods:{handleItemClick(o){e.index.navigateTo({url:"/pages/detail/detail?id="+o})}}};if(!Array){(e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-load-more")+e.resolveComponent("unicloud-db"))()}Math||((()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js")+(()=>"../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js"))();const i=e._export_sfc(d,[["render",function(o,d,i,t,n,l){return{a:e.w((({data:o,pagination:d,loading:i,hasMore:t,error:n},s,a)=>e.e({a:n},n?{b:e.t(n.message)}:o?{d:e.f(o,((o,d,i)=>({a:e.t(o.article_id[0].title),b:d,c:e.o((e=>l.handleItemClick(o.article_id[0]._id)),d),d:"36dd4e4d-2-"+a+"-"+i+",36dd4e4d-1-"+a}))),e:e.p({showArrow:!0,clickable:!0}),f:"36dd4e4d-1-"+a+",36dd4e4d-0"}:{},{c:o,g:"36dd4e4d-3-"+a+",36dd4e4d-0",h:e.p({status:i?"loading":t?"more":"noMore"}),i:a,j:s})),{name:"d",path:"a",vueId:"36dd4e4d-0"}),b:e.sr("udb","36dd4e4d-0"),c:e.p({orderby:"publish_date desc",collection:n.collectionList,field:"article_id,publish_date,user_id"})}}]]);wx.createPage(i);