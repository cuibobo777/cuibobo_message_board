"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-empty",
  props: {
    src: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#c0c4cc"
    },
    iconColor: {
      type: String,
      default: "#c0c4cc"
    },
    iconSize: {
      type: [String, Number],
      default: 120
    },
    fontSize: {
      type: [String, Number],
      default: 26
    },
    mode: {
      type: String,
      default: "data"
    },
    imgWidth: {
      type: [String, Number],
      default: 120
    },
    imgHeight: {
      type: [String, Number],
      default: "auto"
    },
    show: {
      type: Boolean,
      default: true
    },
    marginTop: {
      type: [String, Number],
      default: 0
    },
    iconStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      icons: {
        car: "\u8D2D\u7269\u8F66\u4E3A\u7A7A",
        page: "\u9875\u9762\u4E0D\u5B58\u5728",
        search: "\u6CA1\u6709\u641C\u7D22\u7ED3\u679C",
        address: "\u6CA1\u6709\u6536\u8D27\u5730\u5740",
        wifi: "\u6CA1\u6709WiFi",
        order: "\u8BA2\u5355\u4E3A\u7A7A",
        coupon: "\u6CA1\u6709\u4F18\u60E0\u5238",
        favor: "\u6682\u65E0\u6536\u85CF",
        permission: "\u65E0\u6743\u9650",
        history: "\u65E0\u5386\u53F2\u8BB0\u5F55",
        news: "\u65E0\u65B0\u95FB\u5217\u8868",
        message: "\u6D88\u606F\u5217\u8868\u4E3A\u7A7A",
        list: "\u5217\u8868\u4E3A\u7A7A",
        data: "\u6570\u636E\u4E3A\u7A7A"
      }
    };
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? {
    b: common_vendor.p({
      name: $props.src ? $props.src : "empty-" + $props.mode,
      ["custom-style"]: $props.iconStyle,
      label: $props.text ? $props.text : $data.icons[$props.mode],
      ["label-pos"]: "bottom",
      ["label-color"]: $props.color,
      ["label-size"]: $props.fontSize,
      size: $props.iconSize,
      color: $props.iconColor,
      ["margin-top"]: "14"
    }),
    c: $props.marginTop + "rpx"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-486b9546"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/uni_modules/vk-uview-ui/components/u-empty/u-empty.vue"]]);
wx.createComponent(Component);
