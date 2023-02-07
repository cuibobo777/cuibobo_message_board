"use strict";const o=require("../../../../common/vendor.js"),e=require("../../common/login-page.mixin.js");require("../../common/store.js"),require("../../config.js");const s={mixins:[e.mixin],data:()=>({code:"",phone:"",captcha:"",logo:"/static/logo.png"}),computed:{tipText(){return"验证码已通过短信发送至"+this.phone}},onLoad({phoneNumber:o}){this.phone=o},onShow(){},methods:{submit(){const e=o.Es.importObject("uni-id-co",{errorOptions:{type:"toast"}});if(6!=this.code.length)return this.$refs.smsCode.focusSmsCodeInput=!0,o.index.showToast({title:"验证码不能为空",icon:"none",duration:3e3});e.loginBySms({mobile:this.phone,code:this.code,captcha:this.captcha}).then((o=>{this.loginSuccess(o)})).catch((o=>{"uni-id-captcha-required"==o.errCode?this.$refs.popup.open():console.log(o.errMsg)})).finally((o=>{this.captcha=""}))}}};if(!Array){(o.resolveComponent("uni-id-pages-sms-form")+o.resolveComponent("uni-forms")+o.resolveComponent("uni-popup-captcha"))()}Math||((()=>"../../components/uni-id-pages-sms-form/uni-id-pages-sms-form.js")+(()=>"../../../uni-forms/components/uni-forms/uni-forms.js")+(()=>"../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js"))();const n=o._export_sfc(s,[["render",function(e,s,n,t,i,c){return{a:i.logo,b:o.sr("smsCode","77160837-1,77160837-0"),c:o.o((o=>i.code=o)),d:o.p({focusCaptchaInput:!0,type:"login-by-sms",phone:i.phone,modelValue:i.code}),e:o.o(((...o)=>c.submit&&c.submit(...o))),f:o.sr("popup","77160837-2"),g:o.o(c.submit),h:o.o((o=>i.captcha=o)),i:o.p({scene:"login-by-sms",modelValue:i.captcha})}}],["__scopeId","data-v-77160837"]]);wx.createPage(n);
