"use strict";
const common_vendor = require("../common/vendor.js");
function getImgSrc(richtext, num = 3) {
  let imgList = [];
  richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>*]/g, (match, capture) => {
    imgList.push(capture);
  });
  imgList = imgList.slice(0, num);
  return imgList;
}
function getProvince() {
  return new Promise((resolve, reject) => {
    let hisProvince = common_vendor.index.getStorageSync("hisProvince");
    if (hisProvince && Date.now() - hisProvince.time < 1e3 * 60 * 60) {
      resolve(hisProvince.province);
    } else {
      getIp().then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    }
  });
}
function getIp() {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: "https://restapi.amap.com/v3/ip?key=cffea5404e0689048feeab6b5af21bef",
      success: (res) => {
        let p = "";
        typeof res.data.province == "string" ? p = res.data.province : p = "\u827E\u6B27\u6CFD\u4E9A";
        resolve(p);
        let hpo = {
          province: p,
          time: Date.now()
        };
        common_vendor.index.setStorageSync("hisProvince", hpo);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function getName(item) {
  return item.user_id[0].nickname || item.user_id[0].username || item.user_id[0].mobile || "\u8BF7\u8BBE\u7F6E\u6635\u79F0";
}
function getAvatar(item) {
  var _a, _b, _c;
  return (_c = (_b = (_a = item.user_id[0]) == null ? void 0 : _a.avatar_file) == null ? void 0 : _b.url) != null ? _c : "../../static/images/my_fill.png";
}
const db = common_vendor.Es.database();
const utilsObject = common_vendor.Es.importObject("utilsObject", {
  customUI: true
});
async function likeFun(artId) {
  let count = await db.collection("board_like").where(`article_id=="${artId}" && user_id==$cloudEnv_uid`).count();
  if (count.result.total) {
    db.collection("board_like").where(`article_id=="${artId}" && user_id==$cloudEnv_uid`).remove();
    utilsObject.operation("board_article", "like_count", artId, -1);
  } else {
    db.collection("board_like").add({
      article_id: artId
    });
    utilsObject.operation("board_article", "like_count", artId, 1);
  }
}
exports.getAvatar = getAvatar;
exports.getImgSrc = getImgSrc;
exports.getName = getName;
exports.getProvince = getProvince;
exports.likeFun = likeFun;
