"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_blog_item2 = common_vendor.resolveComponent("blog-item");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_u_tabs2 + _easycom_blog_item2 + _easycom_uni_load_more2)();
}
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_blog_item = () => "../../components/blog-item/blog-item.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_blog_item + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let navList = common_vendor.reactive([
      {
        name: "\u6700\u65B0",
        type: "publish_date"
      },
      {
        name: "\u70ED\u95E8",
        type: "view_count"
      }
    ]);
    const db = common_vendor.Es.database();
    const dbCmd = db.command;
    let artList = common_vendor.reactive([]);
    const current = common_vendor.ref(0);
    const loadingState = common_vendor.ref("more");
    const noMore = common_vendor.ref(false);
    common_vendor.onLoad(() => {
      loadingState.value = "loading";
      getArt();
      loadingState.value = "more";
    });
    common_vendor.onPullDownRefresh(() => {
      artList.length = 0;
      getArt();
      common_vendor.index.stopPullDownRefresh();
    });
    common_vendor.onReachBottom(() => {
      loadingState.value = "loading";
      if (noMore.value) {
        loadingState.value = "noMore";
        return;
      }
      getArt();
    });
    const getArt = () => {
      let artTemp = db.collection("board_article").where(`delState != true`).field("title,description,province,user_id,publish_date,picurls,comment_count,view_count,like_count").getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
      db.collection(artTemp, userTemp).orderBy(navList[current.value].type, "desc").skip(artList.length).limit(5).get().then(async (res) => {
        if (res.result.data.length == 0) {
          noMore.value = true;
          loadingState.value = "noMore";
        }
        let idArr = res.result.data.map((item) => item._id);
        let likeRes = await db.collection("board_like").where({
          article_id: dbCmd.in(idArr),
          user_id: common_vendor.Es.getCurrentUserInfo().uid
        }).get();
        likeRes.result.data.forEach((item) => {
          let findIndex = res.result.data.findIndex((find) => {
            return item.article_id == find._id;
          });
          res.result.data[findIndex].isLike = true;
        });
        artList.push(...res.result.data);
      });
    };
    const changeNav = (index) => {
      current.value = index;
      artList.length = 0;
      loadingState.value = "more";
      noMore.value = false;
      getArt();
    };
    const toEdit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changeNav),
        b: common_vendor.p({
          list: common_vendor.unref(navList),
          current: current.value,
          ["active-color"]: "#0f505e",
          inactiveColor: "#888"
        }),
        c: common_vendor.f(common_vendor.unref(artList), (item, k0, i0) => {
          return {
            a: "1cf27b2a-1-" + i0,
            b: common_vendor.p({
              item
            }),
            c: item._id
          };
        }),
        d: common_vendor.o(toEdit),
        e: common_vendor.p({
          color: "#0f505e",
          status: loadingState.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
