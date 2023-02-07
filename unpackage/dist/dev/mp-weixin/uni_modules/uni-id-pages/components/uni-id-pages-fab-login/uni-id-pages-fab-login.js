"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniIdPages_config = require("../../config.js");
const uni_modules_uniIdPages_common_store = require("../../common/store.js");
const _sfc_main = {
  computed: {
    agreements() {
      if (!uni_modules_uniIdPages_config.config.agreements) {
        return [];
      }
      let {
        serviceUrl,
        privacyUrl
      } = uni_modules_uniIdPages_config.config.agreements;
      return [
        {
          url: serviceUrl,
          title: "\u7528\u6237\u670D\u52A1\u534F\u8BAE"
        },
        {
          url: privacyUrl,
          title: "\u9690\u79C1\u653F\u7B56\u6761\u6B3E"
        }
      ];
    },
    agree: {
      get() {
        return this.getParentComponent().agree;
      },
      set(agree) {
        return this.getParentComponent().agree = agree;
      }
    }
  },
  data() {
    return {
      servicesList: [
        {
          "id": "username",
          "text": "\u8D26\u53F7\u767B\u5F55",
          "logo": "/uni_modules/uni-id-pages/static/login/uni-fab-login/user.png",
          "path": "/uni_modules/uni-id-pages/pages/login/login-withpwd"
        },
        {
          "id": "smsCode",
          "text": "\u77ED\u4FE1\u9A8C\u8BC1\u7801",
          "logo": "/uni_modules/uni-id-pages/static/login/uni-fab-login/sms.png",
          "path": "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode"
        },
        {
          "id": "weixin",
          "text": "\u5FAE\u4FE1\u767B\u5F55",
          "logo": "/uni_modules/uni-id-pages/static/login/uni-fab-login/weixin.png"
        }
      ],
      univerifyStyle: {
        "fullScreen": true,
        "backgroundColor": "#ffffff",
        "buttons": {
          "iconWidth": "45px",
          "list": []
        },
        "privacyTerms": {
          "defaultCheckBoxState": false,
          "textColor": "#BBBBBB",
          "termsColor": "#5496E3",
          "prefix": "\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F",
          "suffix": "\u5E76\u4F7F\u7528\u672C\u673A\u53F7\u7801\u767B\u5F55",
          "privacyItems": []
        }
      }
    };
  },
  watch: {
    agree(agree) {
      this.univerifyStyle.privacyTerms.defaultCheckBoxState = agree;
    }
  },
  async created() {
    let servicesList = this.servicesList;
    let loginTypes = uni_modules_uniIdPages_config.config.loginTypes;
    servicesList = servicesList.filter((item) => {
      if (item.id == "apple") {
        return false;
      }
      return loginTypes.includes(item.id);
    });
    if (loginTypes.includes("univerify")) {
      this.univerifyStyle.privacyTerms.privacyItems = this.agreements;
      servicesList.forEach(({
        id,
        logo,
        path
      }) => {
        if (id != "univerify") {
          this.univerifyStyle.buttons.list.push({
            "iconPath": logo,
            "provider": id,
            path
          });
        }
      });
    }
    this.servicesList = servicesList.filter((item) => {
      let path = item.path ? item.path.split("?")[0] : "";
      return path != this.getRoute(1);
    });
  },
  methods: {
    getParentComponent() {
      return this.$parent;
    },
    setUserInfo(e) {
      console.log("setUserInfo", e);
    },
    getRoute(n = 0) {
      let pages = getCurrentPages();
      if (n > pages.length) {
        return "";
      }
      return "/" + pages[pages.length - n].route;
    },
    toPage(path, index = 0) {
      let type = ["navigateTo", "redirectTo"][index];
      if (this.getRoute(1) == path.split("?")[0] && this.getRoute(1) == "/uni_modules/uni-id-pages/pages/login/login-withoutpwd") {
        let loginType = path.split("?")[1].split("=")[1];
        common_vendor.index.$emit("uni-id-pages-setLoginType", loginType);
      } else if (this.getRoute(2) == path) {
        common_vendor.index.navigateBack();
      } else if (this.getRoute(1) != path) {
        common_vendor.index[type]({
          url: path,
          animationType: "slide-in-left",
          complete(e) {
          }
        });
      } else {
        console.log("\u51FA\u4E4E\u610F\u6599\u7684\u60C5\u51B5,path\uFF1A" + path);
      }
    },
    async login_before(type, navigateBack = true, options = {}) {
      var _a, _b;
      console.log(type);
      if ([
        "qq",
        "xiaomi",
        "sinaweibo",
        "taobao",
        "facebook",
        "google",
        "alipay",
        "douyin"
      ].includes(type)) {
        return common_vendor.index.showToast({
          title: "\u8BE5\u767B\u5F55\u65B9\u5F0F\u6682\u672A\u5B9E\u73B0\uFF0C\u6B22\u8FCE\u63D0\u4EA4pr",
          icon: "none",
          duration: 3e3
        });
      }
      if (["univerify", "apple"].includes(type)) {
        return common_vendor.index.showToast({
          title: "\u5F53\u524D\u8BBE\u5907\u4E0D\u652F\u6301\u6B64\u767B\u5F55\uFF0C\u8BF7\u9009\u62E9\u5176\u4ED6\u767B\u5F55\u65B9\u5F0F",
          icon: "none",
          duration: 3e3
        });
      }
      let needAgreements = (((_b = (_a = uni_modules_uniIdPages_config.config) == null ? void 0 : _a.agreements) == null ? void 0 : _b.scope) || []).includes("register");
      if (type != "univerify" && needAgreements && !this.agree) {
        let agreementsRef = this.getParentComponent().$refs.agreements;
        return agreementsRef.popup(() => {
          this.login_before(type, navigateBack, options);
        });
      }
      common_vendor.index.showLoading({
        mask: true
      });
      if (type == "univerify") {
        let closeUniverify = function() {
          common_vendor.index.hideLoading();
          univerifyManager.close();
          univerifyManager.offButtonsClick(onButtonsClickFn);
        };
        let univerifyManager = common_vendor.index.getUniverifyManager();
        let clickAnotherButtons = false;
        let onButtonsClickFn = async (res) => {
          console.log("\u70B9\u51FB\u4E86\u7B2C\u4E09\u65B9\u767B\u5F55\uFF0Cprovider\uFF1A", res, res.provider, this.univerifyStyle.buttons.list);
          clickAnotherButtons = true;
          let checkBoxState = await common_vendor.index.getCheckBoxState();
          this.agree = checkBoxState.state;
          let {
            path
          } = this.univerifyStyle.buttons.list[res.index];
          if (path) {
            if (this.getRoute(1).includes("login-withoutpwd") && path.includes("login-withoutpwd")) {
              this.getParentComponent().showCurrentWebview();
            }
            this.toPage(path, 1);
            closeUniverify();
          } else {
            if (this.agree) {
              closeUniverify();
              setTimeout(() => {
                this.login_before(res.provider);
              }, 500);
            } else {
              common_vendor.index.showToast({
                title: "\u4F60\u672A\u540C\u610F\u9690\u79C1\u653F\u7B56\u534F\u8BAE",
                icon: "none",
                duration: 3e3
              });
            }
          }
        };
        univerifyManager.onButtonsClick(onButtonsClickFn);
        return univerifyManager.login({
          "univerifyStyle": this.univerifyStyle,
          success: (res) => {
            this.login(res.authResult, "univerify");
          },
          fail(err) {
            console.log(err);
            if (!clickAnotherButtons) {
              common_vendor.index.navigateBack();
            }
          },
          complete: async (e) => {
            common_vendor.index.hideLoading();
            univerifyManager.offButtonsClick(onButtonsClickFn);
          }
        });
      }
      if (type === "weixinMobile") {
        return this.login({
          phoneCode: options.phoneNumberCode
        }, type);
      }
      common_vendor.index.login({
        "provider": type,
        "onlyAuthorize": true,
        success: async (e) => {
          if (type == "apple") {
            let res = await this.getUserInfo({
              provider: "apple"
            });
            Object.assign(e.authResult, res.userInfo);
            common_vendor.index.hideLoading();
          }
          this.login(type == "weixin" ? {
            code: e.code
          } : e.authResult, type);
        },
        fail: async (err) => {
          console.log(err);
          common_vendor.index.hideLoading();
        }
      });
    },
    login(params, type) {
      console.log({ params, type });
      let action = "loginBy" + type.trim().replace(type[0], type[0].toUpperCase());
      const uniIdCo = common_vendor.Es.importObject("uni-id-co", {
        customUI: true
      });
      uniIdCo[action](params).then((result) => {
        common_vendor.index.showToast({
          title: "\u767B\u5F55\u6210\u529F",
          icon: "none",
          duration: 2e3
        });
        uni_modules_uniIdPages_common_store.mutations.loginSuccess(result);
      }).catch((e) => {
        common_vendor.index.showModal({
          content: e.message,
          confirmText: "\u77E5\u9053\u4E86",
          showCancel: false
        });
      }).finally((e) => {
        if (type == "univerify") {
          common_vendor.index.closeAuthView();
        }
        common_vendor.index.hideLoading();
      });
    },
    async getUserInfo(e) {
      return new Promise((resolve, reject) => {
        common_vendor.index.getUserInfo({
          ...e,
          success: (res) => {
            resolve(res);
          },
          fail: (err) => {
            common_vendor.index.showModal({
              content: JSON.stringify(err),
              showCancel: false
            });
            reject(err);
          }
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.servicesList, (item, index, i0) => {
      return {
        a: item.logo,
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => item.path ? $options.toPage(item.path) : $options.login_before(item.id, false), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/uni_modules/uni-id-pages/components/uni-id-pages-fab-login/uni-id-pages-fab-login.vue"]]);
wx.createComponent(Component);
