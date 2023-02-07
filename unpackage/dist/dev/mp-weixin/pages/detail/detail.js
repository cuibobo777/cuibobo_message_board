"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_u_parse2 = common_vendor.resolveComponent("u-parse");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_comment_item2 = common_vendor.resolveComponent("comment-item");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_comment_frame2 = common_vendor.resolveComponent("comment-frame");
  (_easycom_uni_dateformat2 + _easycom_u_parse2 + _easycom_u_empty2 + _easycom_comment_item2 + _easycom_uni_load_more2 + _easycom_comment_frame2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_u_parse = () => "../../uni_modules/vk-uview-ui/components/u-parse/u-parse.js";
const _easycom_u_empty = () => "../../uni_modules/vk-uview-ui/components/u-empty/u-empty.js";
const _easycom_comment_item = () => "../../components/comment-item/comment-item.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_comment_frame = () => "../../components/comment-frame/comment-frame.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_u_parse + _easycom_u_empty + _easycom_comment_item + _easycom_uni_load_more + _easycom_comment_frame)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const db = common_vendor.Es.database();
    const utilsObject = common_vendor.Es.importObject("utilsObject", {
      customUI: true
    });
    const artId = common_vendor.ref("");
    common_vendor.ref("");
    const likeTime = common_vendor.ref(0);
    const loadStatus = common_vendor.ref(true);
    const comment = common_vendor.reactive({
      article_id: "",
      comment_type: 0
    });
    let art = {};
    const avatarArr = common_vendor.reactive([]);
    const commentArr = common_vendor.reactive([]);
    const onComment = common_vendor.ref(false);
    const loadingState = common_vendor.ref("more");
    const noMore = common_vendor.ref(false);
    common_vendor.onLoad((e) => {
      if (!e.id) {
        errFun();
        return;
      }
      artId.value = e.id;
      comment.article_id = e.id;
      getArtDetail();
      readUpdate();
      avatarArr.length = 0;
      getLikeUser();
      loadingState.value = "loading";
      getComment();
      loadingState.value = "more";
    });
    const getComment = async () => {
      let commentTemp = db.collection("board_comment").where(`article_id == '${artId.value}' && 
	comment_type == 0`).orderBy("comment_date desc").skip(commentArr.length).limit(5).getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp();
      let res = await db.collection(commentTemp, userTemp).get();
      let idArr = res.result.data.map((item) => item._id);
      let replyArr = await db.collection("board_comment").where({
        reply_comment_id: db.command.in(idArr)
      }).groupBy("reply_comment_id").groupField("count(*) as totalReply").get();
      res.result.data.forEach((item) => {
        let index = replyArr.result.data.findIndex((find) => {
          return find.reply_comment_id == item._id;
        });
        if (index > -1)
          item.totalReply = replyArr.result.data[index].totalReply;
      });
      if (res.result.data.length == 0) {
        noMore.value = true;
        loadingState.value = "noMore";
        onComment.value = true;
      }
      commentArr.push(...res.result.data);
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
      commentArr.unshift({
        ...e,
        ...comment,
        user_id: [uni_modules_uniIdPages_common_store.store.userInfo],
        comment_date: Date.now()
      });
    };
    const P_commentRemove = (e) => {
      let index = commentArr.findIndex((item) => item._id == e);
      commentArr.splice(index, 1);
    };
    const errFun = () => {
      common_vendor.index.showToast({
        title: "\u53C2\u6570\u6709\u8BEF",
        icon: "none"
      });
      setTimeout(() => {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      }, 1e3);
    };
    const getArtDetail = () => {
      let artTemp = db.collection("board_article").where(`_id == '${artId.value}'`).getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,nickname,username,avatar_file").getTemp();
      let likeTemp = db.collection("board_like").where(`article_id=="${artId.value}" && user_id==$cloudEnv_uid`).getTemp();
      let tempArr = [artTemp, userTemp];
      if (uni_modules_uniIdPages_common_store.store.hasLogin)
        tempArr.push(likeTemp);
      db.collection(...tempArr).get({ getOne: true }).then((res) => {
        var _a, _b;
        if (!res.result.data) {
          errFun();
          return;
        }
        let isLike = false;
        if (uni_modules_uniIdPages_common_store.store.hasLogin)
          isLike = ((_b = (_a = res.result.data._id) == null ? void 0 : _a.board_like) == null ? void 0 : _b.length) ? true : false;
        res.result.data.isLike = isLike;
        art = common_vendor.reactive(res.result.data);
        loadStatus.value = false;
      }).catch((err) => {
        errFun();
      });
    };
    const readUpdate = () => {
      utilsObject.operation("board_article", "view_count", artId.value, 1).then((res) => {
      });
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
      if (time - likeTime.value < 2e3) {
        common_vendor.index.showToast({
          title: "\u64CD\u4F5C\u592A\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E...",
          icon: "none"
        });
        return;
      }
      art.isLike ? art.like_count-- : art.like_count++;
      art.isLike = !art.isLike;
      likeTime.value = time;
      utils_tools.likeFun(artId.value);
    };
    const getLikeUser = () => {
      let likeTemp = db.collection("board_like").where(`article_id == '${artId.value}'`).getTemp();
      let userTemp = db.collection("uni-id-users").field("_id, avatar_file").getTemp();
      db.collection(likeTemp, userTemp).orderBy("publish_date desc").limit(5).get().then((res) => {
        res.result.data = res.result.data.reverse();
        avatarArr.push(...res.result.data);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loadStatus.value
      }, loadStatus.value ? {} : common_vendor.e({
        b: common_vendor.t(common_vendor.unref(art).title),
        c: common_vendor.unref(utils_tools.getAvatar)(common_vendor.unref(art)),
        d: common_vendor.t(common_vendor.unref(utils_tools.getName)(common_vendor.unref(art))),
        e: common_vendor.p({
          date: common_vendor.unref(art).publish_date,
          format: "yyyy\u5E74MM\u6708dd hh:mm:ss"
        }),
        f: common_vendor.t(common_vendor.unref(art).province),
        g: common_vendor.p({
          html: common_vendor.unref(art).content
        }),
        h: common_vendor.unref(art).like_count
      }, common_vendor.unref(art).like_count ? {
        i: common_vendor.t(common_vendor.unref(art).like_count)
      } : {}, {
        j: common_vendor.n(common_vendor.unref(art).isLike ? "active" : ""),
        k: common_vendor.o(clickLike),
        l: common_vendor.f(avatarArr, (avatar, index, i0) => {
          return common_vendor.e({
            a: avatar.user_id[0].avatar_file
          }, avatar.user_id[0].avatar_file ? {
            b: common_vendor.unref(utils_tools.getAvatar)(avatar)
          } : {}, {
            c: index
          });
        }),
        m: common_vendor.t(common_vendor.unref(art).view_count)
      }), {
        n: !commentArr.length && onComment.value
      }, !commentArr.length && onComment.value ? {
        o: common_vendor.p({
          text: "\u6CA1\u6709\u4EBA\u5728\u8FD9\u91CC\u7559\u8A00",
          mode: "message"
        })
      } : {
        p: common_vendor.f(commentArr, (item, k0, i0) => {
          return {
            a: common_vendor.o(P_commentRemove, item._id),
            b: "eca06f3c-3-" + i0,
            c: common_vendor.p({
              item
            }),
            d: item._id
          };
        })
      }, {
        q: common_vendor.p({
          color: "#0f505e",
          status: loadingState.value
        }),
        r: common_vendor.o(P_commentEnv),
        s: common_vendor.p({
          comment
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
