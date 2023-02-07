"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  _easycom_uni_dateformat2();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  _easycom_uni_dateformat();
}
const _sfc_main = {
  __name: "self",
  setup(__props) {
    const db = common_vendor.Es.database();
    const userInfo = common_vendor.computed$1(() => {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    });
    const hasLogin = common_vendor.computed$1(() => {
      return uni_modules_uniIdPages_common_store.store.hasLogin;
    });
    const userArtInfo = common_vendor.reactive({
      artCount: 0,
      likeCount: 0
    });
    common_vendor.onLoad(() => {
      getInfo();
    });
    const getInfo = async () => {
      var _a;
      if (!hasLogin.value)
        return;
      let artCount = await db.collection("board_article").where(`user_id == $cloudEnv_uid && delState != true`).count();
      let likeCount = await db.collection("board_article").where(`user_id == $cloudEnv_uid && delState != true`).groupBy("user_id").groupField("sum(like_count) as likeScore").get();
      userArtInfo.artCount = artCount.result.total;
      userArtInfo.likeCount = (_a = likeCount.result.data[0]) == null ? void 0 : _a.likeScore;
    };
    const toMyArt = () => {
      if (toLoginPage())
        return;
      common_vendor.index.navigateTo({
        url: "/pages/board_article/list"
      });
    };
    const toMyLike = () => {
      if (toLoginPage())
        return;
      common_vendor.index.navigateTo({
        url: "/pages/board_like/list"
      });
    };
    const toFeedback = () => {
      if (toLoginPage())
        return;
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback"
      });
    };
    const toUserInfo = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
      });
    };
    const logout = () => {
      if (toLoginPage())
        return;
      common_vendor.index.showModal({
        title: "\u662F\u5426\u786E\u8BA4\u9000\u51FA?",
        success: (res) => {
          if (res.confirm) {
            uni_modules_uniIdPages_common_store.mutations.logout();
          }
        }
      });
    };
    const toLoginPage = () => {
      if (!hasLogin.value) {
        common_vendor.index.showToast({
          title: "\u672A\u767B\u5F55",
          icon: "none"
        });
        return true;
      }
      return false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).avatar_file && common_vendor.unref(userInfo).avatar_file.url
      }, common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).avatar_file && common_vendor.unref(userInfo).avatar_file.url ? {
        b: common_vendor.unref(userInfo).avatar_file.url
      } : {}, {
        c: common_vendor.unref(hasLogin)
      }, common_vendor.unref(hasLogin) ? {
        d: common_vendor.t(common_vendor.unref(userInfo).nickname || common_vendor.unref(userInfo).username || common_vendor.unref(userInfo).mobile),
        e: common_vendor.p({
          date: common_vendor.unref(userInfo).register_date,
          threshold: [3600, 99 * 365 * 24 * 60 * 60 * 1e3]
        })
      } : {}, {
        f: common_vendor.o(toUserInfo),
        g: common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).avatar_file && common_vendor.unref(userInfo).avatar_file.url
      }, common_vendor.unref(hasLogin) && common_vendor.unref(userInfo).avatar_file && common_vendor.unref(userInfo).avatar_file.url ? {
        h: common_vendor.unref(userInfo).avatar_file.url
      } : {}, {
        i: common_vendor.t(userArtInfo.likeCount || 0),
        j: common_vendor.t(userArtInfo.artCount),
        k: common_vendor.o(toMyArt),
        l: common_vendor.o(toMyLike),
        m: common_vendor.o(toFeedback),
        n: common_vendor.o(logout)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f94a969d"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/pages/self/self.vue"]]);
wx.createPage(MiniProgramPage);
