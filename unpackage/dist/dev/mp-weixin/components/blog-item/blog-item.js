"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_u_action_sheet2 = common_vendor.resolveComponent("u-action-sheet");
  (_easycom_uni_dateformat2 + _easycom_uni_icons2 + _easycom_u_action_sheet2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_u_action_sheet = () => "../../uni_modules/vk-uview-ui/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_icons + _easycom_u_action_sheet)();
}
const _sfc_main = {
  __name: "blog-item",
  props: {
    item: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const db = common_vendor.Es.database();
    const acSheetShow = common_vendor.ref(false);
    const isDel = common_vendor.ref(true);
    const likeTime = common_vendor.ref(0);
    const list = common_vendor.reactive([
      {
        text: "\u4FEE\u6539",
        type: "edit",
        disabled: true
      },
      {
        text: "\u5220\u9664",
        type: "del",
        color: "#f56c6c",
        disabled: true
      }
    ]);
    const clickMore = () => {
      var _a, _b, _c;
      let uid = common_vendor.Es.getCurrentUserInfo().uid;
      if (((_a = props.item) == null ? void 0 : _a.user_id[0]._id) == uid || ((_b = common_vendor.Es.getCurrentUserInfo()) == null ? void 0 : _b.role[0]) == "webmaster" || ((_c = common_vendor.Es.getCurrentUserInfo()) == null ? void 0 : _c.role[0]) == "admin") {
        list.forEach((item) => {
          item.disabled = false;
        });
      }
      acSheetShow.value = true;
    };
    const clickSheet = (index) => {
      if (list[index].type == "del") {
        delFun();
      } else if (list[index].type == "edit") {
        editFun();
      }
    };
    const clickLike = () => {
      if (!uni_modules_uniIdPages_common_store.store.hasLogin) {
        common_vendor.index.showModal({
          title: "\u662F\u5426\u524D\u5F80\u767B\u5F55",
          success: (res) => {
            var _a;
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/" + ((_a = common_vendor.pageJson.uniIdRouter) == null ? void 0 : _a.loginPage)
              });
            }
          }
        });
      }
      let time = Date.now();
      if (time - likeTime.value < 1e3) {
        common_vendor.index.showToast({
          title: "\u64CD\u4F5C\u592A\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E...",
          icon: "none"
        });
        return;
      }
      props.item.isLike ? props.item.like_count-- : props.item.like_count++;
      props.item.isLike = !props.item.isLike;
      likeTime.value = time;
      utils_tools.likeFun(props.item._id);
    };
    const editFun = () => {
      console.log(props.item._id);
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit?id=" + props.item._id
      });
    };
    const delFun = () => {
      common_vendor.index.showLoading({
        title: "\u5220\u9664\u4E2D..."
      });
      db.collection("board_article").doc(props.item._id).update({
        delState: true
      }).then((res) => {
        isDel.value = false;
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "\u5220\u9664\u6210\u529F",
          icon: "none"
        });
      }).catch((err) => {
        common_vendor.index.hideLoading();
      });
    };
    const previewPic = (index) => {
      common_vendor.index.previewImage({
        urls: props.item.picurls,
        current: indexs
      });
    };
    const toDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?id=" + props.item._id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isDel.value
      }, isDel.value ? common_vendor.e({
        b: common_vendor.unref(utils_tools.getAvatar)(__props.item),
        c: common_vendor.t(common_vendor.unref(utils_tools.getName)(__props.item)),
        d: common_vendor.p({
          date: __props.item.publish_date,
          format: "MM\u6708dd hh:mm",
          threshold: [6e4, 36e5 * 24 * 30]
        }),
        e: common_vendor.p({
          type: "more-filled",
          size: "20"
        }),
        f: common_vendor.o(clickMore),
        g: common_vendor.t(__props.item.title),
        h: common_vendor.o(toDetail),
        i: __props.item.description
      }, __props.item.description ? {
        j: common_vendor.t(__props.item.description)
      } : {}, {
        k: common_vendor.o(toDetail),
        l: __props.item.picurls.length
      }, __props.item.picurls.length ? {
        m: common_vendor.f(__props.item.picurls, (pic, index, i0) => {
          return {
            a: common_vendor.o(($event) => previewPic(), index),
            b: pic,
            c: index
          };
        })
      } : {}, {
        n: common_vendor.t(__props.item.view_count),
        o: common_vendor.o(toDetail),
        p: common_vendor.t(__props.item.comment_count ? __props.item.comment_count : "\u8BC4\u8BBA"),
        q: common_vendor.t(__props.item.like_count ? __props.item.like_count : "\u70B9\u8D5E"),
        r: common_vendor.o(clickLike),
        s: common_vendor.n(__props.item.isLike ? "active" : ""),
        t: common_vendor.o(clickSheet),
        v: common_vendor.o(($event) => acSheetShow.value = $event),
        w: common_vendor.p({
          list,
          ["cancel-btn"]: true,
          ["mask-close-able"]: true,
          ["border-radius"]: 25,
          modelValue: acSheetShow.value
        })
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ed6c1afa"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/components/blog-item/blog-item.vue"]]);
wx.createComponent(Component);
