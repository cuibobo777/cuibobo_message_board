"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-popup",
  emits: ["update:modelValue", "input", "open", "close"],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: "left"
    },
    mask: {
      type: Boolean,
      default: true
    },
    length: {
      type: [Number, String],
      default: "auto"
    },
    zoom: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    },
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    popup: {
      type: Boolean,
      default: true
    },
    borderRadius: {
      type: [Number, String],
      default: 0
    },
    zIndex: {
      type: [Number, String],
      default: ""
    },
    closeable: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: String,
      default: "close"
    },
    closeIconPos: {
      type: String,
      default: "top-right"
    },
    closeIconColor: {
      type: String,
      default: "#909399"
    },
    closeIconSize: {
      type: [String, Number],
      default: "30"
    },
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    negativeTop: {
      type: [String, Number],
      default: 0
    },
    maskCustomStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    duration: {
      type: [String, Number],
      default: 250
    },
    blur: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      visibleSync: false,
      showDrawer: false,
      timer: null,
      closeFromInner: false
    };
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    style() {
      let style = {};
      if (this.mode == "left" || this.mode == "right") {
        style = {
          width: this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length),
          height: "100%",
          transform: `translate3D(${this.mode == "left" ? "-100%" : "100%"},0px,0px)`
        };
      } else if (this.mode == "top" || this.mode == "bottom") {
        style = {
          width: "100%",
          height: this.height ? this.getUnitValue(this.height) : this.getUnitValue(this.length),
          transform: `translate3D(0px,${this.mode == "top" ? "-100%" : "100%"},0px)`
        };
      }
      style.zIndex = this.uZindex;
      if (this.borderRadius) {
        switch (this.mode) {
          case "left":
            style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`;
            break;
          case "top":
            style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`;
            break;
          case "right":
            style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`;
            break;
          case "bottom":
            style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`;
            break;
        }
        style.overflow = "hidden";
      }
      if (this.duration)
        style.transition = `all ${this.duration / 1e3}s linear`;
      return style;
    },
    centerStyle() {
      let style = {};
      style.width = this.width ? this.getUnitValue(this.width) : this.getUnitValue(this.length);
      style.height = this.height ? this.getUnitValue(this.height) : "auto";
      style.zIndex = this.uZindex;
      style.marginTop = `-${this.$u.addUnit(this.negativeTop)}`;
      if (this.borderRadius) {
        style.borderRadius = `${this.borderRadius}rpx`;
        style.overflow = "hidden";
      }
      return style;
    },
    uZindex() {
      return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
    }
  },
  watch: {
    valueCom: {
      immediate: true,
      handler(val) {
        if (val) {
          this.open();
        } else if (!this.closeFromInner) {
          this.close();
        }
        this.closeFromInner = false;
      }
    }
  },
  mounted() {
    this.valueCom && this.open();
  },
  methods: {
    getUnitValue(val) {
      if (/(%|px|rpx|auto)$/.test(val))
        return val;
      else
        return val + "rpx";
    },
    maskClick() {
      this.close();
    },
    close() {
      this.closeFromInner = true;
      this.change("showDrawer", "visibleSync", false);
    },
    modeCenterClose(mode) {
      if (mode != "center" || !this.maskCloseAble)
        return;
      this.close();
    },
    open() {
      this.change("visibleSync", "showDrawer", true);
    },
    change(param1, param2, status) {
      if (this.popup == true) {
        this.$emit("input", status);
        this.$emit("update:modelValue", status);
      }
      this[param1] = status;
      if (status) {
        this.timer = setTimeout(() => {
          this[param2] = status;
          this.$emit(status ? "open" : "close");
        }, 50);
      } else {
        this.timer = setTimeout(() => {
          this[param2] = status;
          this.$emit(status ? "open" : "close");
        }, this.duration);
      }
    }
  }
};
if (!Array) {
  const _easycom_u_mask2 = common_vendor.resolveComponent("u-mask");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_mask2 + _easycom_u_icon2)();
}
const _easycom_u_mask = () => "../u-mask/u-mask.js";
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_mask + _easycom_u_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.visibleSync
  }, $data.visibleSync ? common_vendor.e({
    b: common_vendor.o($options.maskClick),
    c: common_vendor.p({
      blur: $props.blur,
      duration: $props.duration,
      ["custom-style"]: $props.maskCustomStyle,
      maskClickAble: $props.maskCloseAble,
      ["z-index"]: $options.uZindex - 2,
      show: $data.showDrawer && $props.mask
    }),
    d: $props.mode == "center"
  }, $props.mode == "center" ? common_vendor.e({
    e: $props.closeable
  }, $props.closeable ? {
    f: common_vendor.o($options.close),
    g: common_vendor.n("u-close--" + $props.closeIconPos),
    h: common_vendor.p({
      name: $props.closeIcon,
      color: $props.closeIconColor,
      size: $props.closeIconSize
    })
  } : {}, {
    i: common_vendor.o(() => {
    }),
    j: common_vendor.o(() => {
    }),
    k: common_vendor.s($options.centerStyle)
  }) : {}, {
    l: $props.mode != "center" && $props.closeable
  }, $props.mode != "center" && $props.closeable ? {
    m: common_vendor.p({
      name: $props.closeIcon,
      color: $props.closeIconColor,
      size: $props.closeIconSize
    })
  } : {}, {
    n: common_vendor.o((...args) => $options.close && $options.close(...args)),
    o: common_vendor.n("u-close--" + $props.closeIconPos),
    p: common_vendor.o(($event) => $options.modeCenterClose($props.mode)),
    q: common_vendor.n($props.safeAreaInsetBottom ? "safe-area-inset-bottom" : ""),
    r: common_vendor.n("u-drawer-" + $props.mode),
    s: common_vendor.n($data.showDrawer ? "u-drawer-content-visible" : ""),
    t: common_vendor.n($props.zoom && $props.mode == "center" ? "u-animation-zoom" : ""),
    v: common_vendor.o(() => {
    }),
    w: common_vendor.s($options.style),
    x: common_vendor.s($props.customStyle),
    y: common_vendor.s({
      zIndex: $options.uZindex - 1
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c93a8fd2"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/uni_modules/vk-uview-ui/components/u-popup/u-popup.vue"]]);
wx.createComponent(Component);
