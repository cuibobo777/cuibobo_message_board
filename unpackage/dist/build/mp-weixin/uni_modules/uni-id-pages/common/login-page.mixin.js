"use strict";const e=require("../../../common/vendor.js"),i=require("./store.js"),s=require("../config.js");let t={data:()=>({config:s.config,uniIdRedirectUrl:"",isMounted:!1}),onUnload(){},mounted(){this.isMounted=!0},onLoad(i){if(i.is_weixin_redirect){if(e.index.showLoading({mask:!0}),window.location.href.includes("#")){window.location.href.split("?")[1].split("&").forEach((e=>{let s=e.split("=");"code"==s[0]&&(i.code=s[1])}))}this.$nextTick((e=>{this.$refs.uniFabLogin.login({code:i.code},"weixin")}))}i.uniIdRedirectUrl&&(this.uniIdRedirectUrl=decodeURIComponent(i.uniIdRedirectUrl))},computed:{needAgreements(){if(this.isMounted)return!!this.$refs.agreements&&this.$refs.agreements.needAgreements},agree:{get(){if(this.isMounted)return!this.$refs.agreements||this.$refs.agreements.isAgree},set(e){this.$refs.agreements?this.$refs.agreements.isAgree=e:console.log("不存在 隐私政策协议组件")}}},methods:{loginSuccess(e){i.mutations.loginSuccess({...e,uniIdRedirectUrl:this.uniIdRedirectUrl})}}};exports.mixin=t;
