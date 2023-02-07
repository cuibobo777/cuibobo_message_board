"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_u_avatar2 + _easycom_uni_dateformat2)();
}
const _easycom_u_avatar = () => "../../uni_modules/vk-uview-ui/components/u-avatar/u-avatar.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "comment-item",
  props: {
    item: {
      type: Object
    },
    childState: {
      type: Boolean,
      default: false
    },
    closeBtn: {
      type: Boolean,
      default: false
    }
  },
  emits: ["commentRemove"],
  setup(__props, { emit }) {
    const props = __props;
    const db = common_vendor.Es.database();
    const utilsObject = common_vendor.Es.importObject("utilsObject", {
      customUI: true
    });
    common_vendor.ref(false);
    const sendEmit = (data) => {
      emit("commentRemove", data);
    };
    const delComment = () => {
      var _a, _b, _c;
      let uid = common_vendor.Es.getCurrentUserInfo().uid;
      if (((_a = props.item) == null ? void 0 : _a.user_id[0]._id) == uid || ((_b = common_vendor.Es.getCurrentUserInfo()) == null ? void 0 : _b.role[0]) == "webmaster" || ((_c = common_vendor.Es.getCurrentUserInfo()) == null ? void 0 : _c.role[0]) == "admin") {
        common_vendor.index.showModal({
          title: "\u786E\u8BA4\u662F\u5426\u5220\u9664",
          success: (res) => {
            if (res.confirm) {
              removeComment();
            }
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "\u65E0\u6743\u9650",
          icon: "error"
        });
      }
    };
    const removeComment = () => {
      let deletedNum = common_vendor.ref(0);
      db.collection("board_comment").where(`_id == '${props.item._id}' || reply_comment_id == '${props.item._id}'`).remove().then((res) => {
        deletedNum.value = res.result.deleted * -1;
        console.log(deletedNum);
        common_vendor.index.showToast({
          title: "\u5220\u9664\u6210\u529F"
        });
        sendEmit(props.item._id);
        utilsObject.operation("board_article", "comment_count", props.item.article_id, parseInt(deletedNum.value));
      });
    };
    const goReply = () => {
      if (props.childState)
        return;
      common_vendor.index.setStorageSync("replyItem", props.item);
      common_vendor.index.navigateTo({
        url: "/pages/reply/reply"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: common_vendor.unref(utils_tools.getAvatar)(__props.item),
          size: "50"
        }),
        b: common_vendor.t(common_vendor.unref(utils_tools.getName)(__props.item)),
        c: !props.closeBtn
      }, !props.closeBtn ? {
        d: common_vendor.o(delComment)
      } : {}, {
        e: common_vendor.t(__props.item.comment_content),
        f: !props.childState
      }, !props.childState ? {
        g: common_vendor.t(__props.item.totalReply || "")
      } : {}, {
        h: common_vendor.p({
          date: __props.item.comment_date,
          threshold: [6e4, 36e5 * 24 * 30]
        }),
        i: common_vendor.t(__props.item.province),
        j: common_vendor.o(goReply)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c7df51b2"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/components/comment-item/comment-item.vue"]]);
wx.createComponent(Component);
