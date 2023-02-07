"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-action-sheet",
  emits: ["update:modelValue", "input", "click", "close"],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    tips: {
      type: Object,
      default() {
        return {
          text: "",
          color: "",
          fontSize: "26"
        };
      }
    },
    cancelBtn: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    zIndex: {
      type: [String, Number],
      default: 0
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    labelName: {
      type: String,
      default: "text"
    },
    blur: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    tipsStyle() {
      let style = {};
      if (this.tips.color)
        style.color = this.tips.color;
      if (this.tips.fontSize)
        style.fontSize = this.tips.fontSize + "rpx";
      return style;
    },
    itemStyle() {
      return (index) => {
        let style = {};
        if (this.list[index].color)
          style.color = this.list[index].color;
        if (this.list[index].fontSize)
          style.fontSize = this.list[index].fontSize + "rpx";
        if (this.list[index].disabled)
          style.color = "#c0c4cc";
        return style;
      };
    },
    uZIndex() {
      return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
    }
  },
  data() {
    return {
      popupValue: false
    };
  },
  watch: {
    valueCom(v1, v2) {
      this.popupValue = v1;
    }
  },
  methods: {
    close() {
      this.popupClose();
      this.$emit("close");
    },
    popupClose() {
      this.$emit("input", false);
      this.$emit("update:modelValue", false);
    },
    itemClick(index) {
      if (this.list[index].disabled)
        return;
      this.$emit("click", index);
      this.$emit("input", false);
      this.$emit("update:modelValue", false);
    }
  }
};
if (!Array) {
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  _easycom_u_popup2();
}
const _easycom_u_popup = () => "../u-popup/u-popup.js";
if (!Math) {
  _easycom_u_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.tips.text
  }, $props.tips.text ? {
    b: common_vendor.t($props.tips.text),
    c: common_vendor.s($options.tipsStyle)
  } : {}, {
    d: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item[$props.labelName]),
        b: item.subText
      }, item.subText ? {
        c: common_vendor.t(item.subText)
      } : {}, {
        d: common_vendor.o(() => {
        }, index),
        e: common_vendor.o(($event) => $options.itemClick(index), index),
        f: common_vendor.s($options.itemStyle(index)),
        g: common_vendor.n(index < $props.list.length - 1 ? "u-border-bottom" : ""),
        h: index
      });
    }),
    e: $props.cancelBtn
  }, $props.cancelBtn ? {} : {}, {
    f: $props.cancelBtn
  }, $props.cancelBtn ? {
    g: common_vendor.t($props.cancelText),
    h: common_vendor.o(() => {
    }),
    i: common_vendor.o((...args) => $options.close && $options.close(...args))
  } : {}, {
    j: common_vendor.o($options.popupClose),
    k: common_vendor.o(($event) => $data.popupValue = $event),
    l: common_vendor.p({
      blur: $props.blur,
      mode: "bottom",
      ["border-radius"]: $props.borderRadius,
      popup: false,
      maskCloseAble: $props.maskCloseAble,
      length: "auto",
      safeAreaInsetBottom: $props.safeAreaInsetBottom,
      ["z-index"]: $options.uZIndex,
      modelValue: $data.popupValue
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cd40cb92"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/uni_modules/vk-uview-ui/components/u-action-sheet/u-action-sheet.vue"]]);
wx.createComponent(Component);
