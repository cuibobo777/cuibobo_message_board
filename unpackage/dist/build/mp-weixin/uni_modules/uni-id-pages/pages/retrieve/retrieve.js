"use strict";const e=require("../../../../common/vendor.js"),o=require("../../common/login-page.mixin.js");require("../../common/store.js"),require("../../config.js");const s=e.Es.importObject("uni-id-co",{errorOptions:{type:"toast"}}),r={mixins:[o.mixin],data:()=>({lock:!1,focusPhone:!0,focusPassword:!1,focusPassword2:!1,formData:{phone:"",code:"",password:"",password2:"",captcha:""},rules:{phone:{rules:[{required:!0,errorMessage:"请输入手机号"},{pattern:/^1\d{10}$/,errorMessage:"手机号码格式不正确"}]},code:{rules:[{required:!0,errorMessage:"请输入短信验证码"},{pattern:/^.{6}$/,errorMessage:"请输入6位验证码"}]},password:{rules:[{required:!0,errorMessage:"请输入新密码"},{pattern:/^.{6,20}$/,errorMessage:"密码为6 - 20位"}]},password2:{rules:[{required:!0,errorMessage:"请确认密码"},{pattern:/^.{6,20}$/,errorMessage:"密码为6 - 20位"},{validateFunction:function(e,o,s,r){return o!=s.password&&r("两次输入密码不一致"),!0}}]}},logo:"/static/logo.png"}),computed:{isPhone(){return/^1\d{10}$/.test(this.formData.phone)},isPwd(){return/^.{6,20}$/.test(this.formData.password)},isCode(){return/^\d{6}$/.test(this.formData.code)}},onLoad(e){e&&e.phoneNumber&&(this.formData.phone=e.phoneNumber,e.lock&&(this.lock=e.lock,this.focusPhone=!0))},onReady(){this.formData.phone&&this.$refs.shortCode.start(),this.$refs.form.setRules(this.rules)},onShow(){},methods:{submit(){this.$refs.form.validate().then((o=>{let{phone:r,password:a,captcha:t,code:n}=this.formData;s.resetPwdBySms({mobile:r,code:n,password:a,captcha:t}).then((o=>{e.index.navigateBack()})).catch((e=>{"uni-id-captcha-required"==e.errCode&&this.$refs.popup.open()})).finally((e=>{this.formData.captcha=""}))})).catch((e=>{let o=e[0].key;if("code"==o)return this.$refs.shortCode.focusSmsCodeInput=!0;o=o.replace(o[0],o[0].toUpperCase()),this["focus"+o]=!0}))},retrieveByEmail(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email"})},backLogin(){e.index.redirectTo({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})}}};if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-id-pages-sms-form")+e.resolveComponent("uni-forms")+e.resolveComponent("uni-popup-captcha"))()}Math||((()=>"../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../../uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../components/uni-id-pages-sms-form/uni-id-pages-sms-form.js")+(()=>"../../../uni-forms/components/uni-forms/uni-forms.js")+(()=>"../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js"))();const a=e._export_sfc(r,[["render",function(o,s,r,a,t,n){return{a:t.logo,b:e.o((e=>t.focusPhone=!1)),c:e.o((e=>t.formData.phone=e)),d:e.p({focus:t.focusPhone,disabled:t.lock,type:"number",inputBorder:!1,maxlength:"11",placeholder:"请输入手机号",modelValue:t.formData.phone}),e:e.p({name:"phone"}),f:e.sr("shortCode","0bbb8ae0-4,0bbb8ae0-3"),g:e.o((e=>t.formData.code=e)),h:e.p({phone:t.formData.phone,type:"reset-pwd-by-sms",modelValue:t.formData.code}),i:e.p({name:"code"}),j:e.o((e=>t.focusPassword=!1)),k:e.o((e=>t.formData.password=e)),l:e.p({focus:t.focusPassword,type:"password",inputBorder:!1,placeholder:"请输入新密码",modelValue:t.formData.password}),m:e.p({name:"password"}),n:e.o((e=>t.focusPassword2=!1)),o:e.o((e=>t.formData.password2=e)),p:e.p({focus:t.focusPassword2,type:"password",inputBorder:!1,placeholder:"请再次输入新密码",modelValue:t.formData.password2}),q:e.p({name:"password2"}),r:e.o(((...e)=>n.submit&&n.submit(...e))),s:e.o(((...e)=>n.retrieveByEmail&&n.retrieveByEmail(...e))),t:e.o(((...e)=>n.backLogin&&n.backLogin(...e))),v:e.sr("form","0bbb8ae0-0"),w:e.p({value:t.formData,"err-show-type":"toast"}),x:e.sr("popup","0bbb8ae0-9"),y:e.o(n.submit),z:e.o((e=>t.formData.captcha=e)),A:e.p({scene:"reset-pwd-by-sms",modelValue:t.formData.captcha})}}]]);wx.createPage(a);