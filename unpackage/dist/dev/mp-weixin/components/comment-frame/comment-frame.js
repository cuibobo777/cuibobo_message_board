"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = {
  __name: "comment-frame",
  props: {
    comment: {
      type: Object
    },
    placeholder: {
      type: String,
      default: "\u8BC4\u8BBA\u70B9\u4EC0\u4E48\u5427~~~"
    }
  },
  emits: ["commentEnv"],
  setup(__props, { emit }) {
    const props = __props;
    const db = common_vendor.Es.database();
    const utilsObject = common_vendor.Es.importObject("utilsObject", {
      customUI: true
    });
    const replyContent = common_vendor.ref("");
    const sendEimt = (data) => {
      emit("commentEnv", data);
    };
    const goComment = async () => {
      let province = await utils_tools.getProvince();
      if (!replyContent.value) {
        common_vendor.index.showToast({
          title: "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A",
          icon: "none"
        });
        return;
      }
      db.collection("board_comment").add({
        comment_content: replyContent.value,
        province,
        ...props.comment
      }).then((res) => {
        common_vendor.index.showToast({
          title: "\u8BC4\u8BBA\u6210\u529F"
        });
        utilsObject.operation("board_article", "comment_count", props.comment.article_id, 1);
        sendEimt({
          _id: res.result.id,
          comment_content: replyContent.value,
          province
        });
        replyContent.value = "";
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr("uipt", "03316e76-0"),
        b: common_vendor.o(goComment),
        c: common_vendor.o(goComment),
        d: common_vendor.o(($event) => replyContent.value = $event),
        e: common_vendor.p({
          suffixIcon: "paperplane",
          placeholder: __props.placeholder,
          modelValue: replyContent.value
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-03316e76"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/components/comment-frame/comment-frame.vue"]]);
wx.createComponent(Component);
