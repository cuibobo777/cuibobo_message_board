"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const db = common_vendor.Es.database();
    const richArt = common_vendor.reactive({
      title: "",
      content: "",
      description: "",
      picurls: "",
      province: ""
    });
    let editorCtx = "";
    const toolsShow = common_vendor.ref(false);
    const headerShow = common_vendor.ref(false);
    const boldShow = common_vendor.ref(false);
    const italicShow = common_vendor.ref(false);
    const editArtId = common_vendor.ref("");
    const instance = common_vendor.getCurrentInstance();
    common_vendor.onLoad((e) => {
      editArtId.value = e.id;
      utils_tools.getProvince().then((res) => {
        richArt.province = res;
      });
      getEditArt();
    });
    const onReady = () => {
      common_vendor.index.createSelectorQuery().in(instance).select(".richTextEditor").fields({
        size: true,
        context: true
      }, (res) => {
        editorCtx = res.context;
      }).exec();
    };
    const checkStatus = (name, detail, obj) => {
      if (detail.hasOwnProperty(name)) {
        obj.value = true;
      } else {
        obj.value = false;
      }
    };
    const onStatuschange = (e) => {
      let detail = e.detail;
      checkStatus("header", detail, headerShow);
    };
    const InsertImage = () => {
      common_vendor.index.chooseImage({
        success: async (res) => {
          for (let item of res.tempFiles) {
            let fileType = item.path.substring(item.path.lastIndexOf("."));
            let randomName = Date.now() + "" + String(Math.random()).substr(3, 6) + fileType;
            common_vendor.index.showLoading({
              title: "\u4E0A\u4F20\u4E2D",
              mask: true
            });
            let res2 = await common_vendor.Es.uploadFile({
              filePath: item.path,
              cloudPath: item.name || randomName
            });
            editorCtx.insertImage({
              src: res2.fileID
            });
            common_vendor.index.hideLoading();
          }
        }
      });
    };
    const onSubmit = () => {
      editorCtx.getContents({
        success: (res) => {
          richArt.content = res.html;
          richArt.description = res.text.slice(0, 50);
          richArt.picurls = utils_tools.getImgSrc(res.html);
          common_vendor.index.showLoading({
            title: "\u53D1\u5E03\u4E2D"
          });
          addArticle();
        }
      });
    };
    const getEditArt = () => {
      if (!editArtId.value)
        return;
      db.collection("board_article").doc(editArtId.value).get().then((res) => {
        richArt.title = res.result.data[0].title;
        richArt.content = res.result.data[0].content;
        setEditArt();
      });
    };
    const addArticle = () => {
      if (!editArtId.value) {
        db.collection("board_article").add(richArt).then((res) => {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "\u53D1\u5E03\u6210\u529F"
          });
          setTimeout(() => {
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          }, 900);
        });
      } else {
        db.collection("board_article").doc(editArtId.value).update(richArt).then((res) => {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "\u4FEE\u6539\u6210\u529F"
          });
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/index/index"
            });
          }, 900);
        });
      }
    };
    const onFocus = () => {
      toolsShow.value = true;
    };
    const toHeader = () => {
      headerShow.value = !headerShow.value;
      editorCtx.format("header", headerShow ? "H2" : false);
    };
    const toBold = () => {
      boldShow.value = !boldShow.value;
      editorCtx.format("bold");
    };
    const toItalic = () => {
      italicShow.value = !italicShow.value;
      editorCtx.format("italic");
    };
    const addInsertDivider = () => {
      editorCtx.insertDivider();
    };
    const setEditArt = () => {
      editorCtx.setContents({
        html: richArt.content
      });
    };
    const editOk = () => {
      toolsShow.value = !toolsShow.value;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: richArt.title,
        b: common_vendor.o(($event) => richArt.title = $event.detail.value),
        c: common_vendor.o(onReady),
        d: common_vendor.o(onFocus),
        e: common_vendor.o(onStatuschange),
        f: common_vendor.o(onSubmit),
        g: common_vendor.p({
          type: "primary",
          disabled: !richArt.title.length
        }),
        h: toolsShow.value
      }, toolsShow.value ? {
        i: common_vendor.n(headerShow.value ? "active" : ""),
        j: common_vendor.o(toHeader),
        k: common_vendor.n(boldShow.value ? "active" : ""),
        l: common_vendor.o(toBold),
        m: common_vendor.n(italicShow.value ? "active" : ""),
        n: common_vendor.o(toItalic),
        o: common_vendor.o(addInsertDivider),
        p: common_vendor.o(InsertImage),
        q: common_vendor.o(editOk)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2491cc6e"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
