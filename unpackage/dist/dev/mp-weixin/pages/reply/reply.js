"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_comment_item2 = common_vendor.resolveComponent("comment-item");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_comment_frame2 = common_vendor.resolveComponent("comment-frame");
  (_easycom_comment_item2 + _easycom_uni_load_more2 + _easycom_comment_frame2)();
}
const _easycom_comment_item = () => "../../components/comment-item/comment-item.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_comment_frame = () => "../../components/comment-frame/comment-frame.js";
if (!Math) {
  (_easycom_comment_item + _easycom_uni_load_more + _easycom_comment_frame)();
}
const _sfc_main = {
  __name: "reply",
  setup(__props) {
    const db = common_vendor.Es.database();
    let replyItem = {};
    const childCommentArr = common_vendor.reactive([]);
    const comment = common_vendor.reactive({
      article_id: "",
      comment_type: 1,
      reply_user_id: "",
      reply_comment_id: ""
    });
    const loadingState = common_vendor.ref("more");
    const noMore = common_vendor.ref(false);
    const getComment = () => {
      let commentTemp = db.collection("board_comment").where(`article_id == '${replyItem.article_id}' && 
		comment_type == 1  && reply_comment_id == '${replyItem._id}'`).orderBy("comment_date desc").skip(childCommentArr.length).limit(5).getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp();
      db.collection(commentTemp, userTemp).get().then((res) => {
        if (res.result.data.length == 0) {
          noMore.value = true;
          loadingState.value = "noMore";
        }
        childCommentArr.push(...res.result.data);
      });
    };
    common_vendor.onReachBottom(() => {
      loadingState.value = "loading";
      if (noMore.value) {
        loadingState.value = "noMore";
        return;
      }
      getComment();
    });
    const P_commentEnv = (e) => {
      childCommentArr.unshift({
        ...e,
        ...comment,
        user_id: [uni_modules_uniIdPages_common_store.store.userInfo],
        comment_date: Date.now()
      });
    };
    const P_commentRemove = (e) => {
      let index = childCommentArr.findIndex((item) => item._id == e);
      childCommentArr.splice(index, 1);
    };
    common_vendor.onLoad(() => {
      let replyStorage = common_vendor.index.getStorageSync("replyItem");
      if (!replyStorage)
        return common_vendor.index.navigateBack();
      replyItem = common_vendor.reactive(replyStorage);
      comment.article_id = replyItem.article_id;
      comment.reply_comment_id = replyItem._id;
      comment.reply_user_id = replyItem.user_id[0]._id;
      loadingState.value = "loading";
      getComment();
      loadingState.value = "more";
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("replyItem");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          closeBtn: true,
          childState: true,
          item: common_vendor.unref(replyItem)
        }),
        b: common_vendor.f(childCommentArr, (item, k0, i0) => {
          return {
            a: "9d4092cc-1-" + i0,
            b: common_vendor.p({
              childState: true,
              item
            })
          };
        }),
        c: common_vendor.o(P_commentRemove),
        d: common_vendor.p({
          color: "#0f505e",
          status: loadingState.value
        }),
        e: common_vendor.o(P_commentEnv),
        f: common_vendor.p({
          placeholder: `\u56DE\u590D\uFF1A${common_vendor.unref(utils_tools.getName)(common_vendor.unref(replyItem))}`,
          comment
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9d4092cc"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/pages/reply/reply.vue"]]);
wx.createPage(MiniProgramPage);
