"use strict";const e=require("../../../../common/vendor.js"),o=require("../../common/login-page.mixin.js"),s=require("../../common/password.js");require("../../common/store.js"),require("../../config.js");const a=e.Es.importObject("uni-id-co",{errorOptions:{type:"toast"}}),r={mixins:[o.mixin],data:()=>({lock:!1,focusEmail:!0,focusPassword:!1,focusPassword2:!1,formData:{email:"",code:"",password:"",password2:"",captcha:""},rules:{email:{rules:[{required:!0,errorMessage:"请输入邮箱"},{format:"email",errorMessage:"邮箱格式不正确"}]},code:{rules:[{required:!0,errorMessage:"请输入邮箱验证码"},{pattern:/^.{6}$/,errorMessage:"请输入6位验证码"}]},...s.passwordMod.getPwdRules()},logo:"/static/logo.png"}),computed:{isEmail(){return/@/.test(this.formData.email)},isPwd(){return/^.{6,20}$/.test(this.formData.password)},isCode(){return/^\d{6}$/.test(this.formData.code)}},onLoad(e){e&&e.emailNumber&&(this.formData.email=e.emailNumber,e.lock&&(this.lock=e.lock,this.focusEmail=!0))},onReady(){this.formData.email&&this.$refs.shortCode.start(),this.$refs.form.setRules(this.rules)},onShow(){},methods:{submit(){this.$refs.form.validate().then((o=>{let{email:s,password:r,captcha:t,code:i}=this.formData;a.resetPwdByEmail({email:s,code:i,password:r,captcha:t}).then((o=>{e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd",complete:e=>{}})})).catch((e=>{"uni-id-captcha-required"==e.errCode&&this.$refs.popup.open()})).finally((e=>{this.formData.captcha=""}))})).catch((e=>{let o=e[0].key;if("code"==o)return this.$refs.shortCode.focusSmsCodeInput=!0;o=o.replace(o[0],o[0].toUpperCase()),this["focus"+o]=!0}))},retrieveByPhone(){e.index.navigateTo({url:"/uni_modules/uni-id-pages/pages/retrieve/retrieve"})},backLogin(){e.index.redirectTo({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})}}};if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-id-pages-email-form")+e.resolveComponent("uni-forms")+e.resolveComponent("uni-popup-captcha"))()}Math||((()=>"../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../../uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../components/uni-id-pages-email-form/uni-id-pages-email-form.js")+(()=>"../../../uni-forms/components/uni-forms/uni-forms.js")+(()=>"../../../uni-captcha/components/uni-popup-captcha/uni-popup-captcha.js"))();const t=e._export_sfc(r,[["render",function(o,s,a,r,t,i){return{a:t.logo,b:e.o((e=>t.focusEmail=!1)),c:e.o((e=>t.formData.email=e)),d:e.p({focus:t.focusEmail,disabled:t.lock,inputBorder:!1,placeholder:"请输入邮箱",modelValue:t.formData.email}),e:e.p({name:"email"}),f:e.sr("shortCode","327e91f3-4,327e91f3-3"),g:e.o((e=>t.formData.code=e)),h:e.p({email:t.formData.email,type:"reset-pwd-by-email",modelValue:t.formData.code}),i:e.p({name:"code"}),j:e.o((e=>t.focusPassword=!1)),k:e.o((e=>t.formData.password=e)),l:e.p({focus:t.focusPassword,type:"password",inputBorder:!1,placeholder:"请输入新密码",modelValue:t.formData.password}),m:e.p({name:"password"}),n:e.o((e=>t.focusPassword2=!1)),o:e.o((e=>t.formData.password2=e)),p:e.p({focus:t.focusPassword2,type:"password",inputBorder:!1,placeholder:"请再次输入新密码",modelValue:t.formData.password2}),q:e.p({name:"password2"}),r:e.o(((...e)=>i.submit&&i.submit(...e))),s:e.o(((...e)=>i.retrieveByPhone&&i.retrieveByPhone(...e))),t:e.o(((...e)=>i.backLogin&&i.backLogin(...e))),v:e.sr("form","327e91f3-0"),w:e.p({value:t.formData,"err-show-type":"toast"}),x:e.sr("popup","327e91f3-9"),y:e.o(i.submit),z:e.o((e=>t.formData.captcha=e)),A:e.p({scene:"reset-pwd-by-sms",modelValue:t.formData.captcha})}}]]);wx.createPage(t);