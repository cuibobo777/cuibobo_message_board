"use strict";const e=require("../../../../../common/vendor.js"),t={components:{limeClipper:()=>"./limeClipper/limeClipper.js"},data:()=>({path:"",options:{width:600,height:600}}),onLoad({path:e,options:t}){this.path=e,t&&(this.options=JSON.parse(t))},methods:{successFn(t){this.getOpenerEventChannel().emit("success",t.url),e.index.navigateBack()},cancel(){e.index.navigateBack()}}};if(!Array){e.resolveComponent("limeClipper")()}const i=e._export_sfc(t,[["render",function(t,i,s,n,o,a){return{a:e.o(a.successFn),b:e.o(a.cancel),c:e.p({width:o.options.width,"scale-ratio":2,"is-lock-width":!1,"is-lock-height":!1,height:o.options.height,"image-url":o.path})}}]]);wx.createPage(i);
