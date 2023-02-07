"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-button",
  emits: ["click", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp"],
  props: {
    hairLine: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "default"
    },
    shape: {
      type: String,
      default: "square"
    },
    plain: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    openType: {
      type: String,
      default: ""
    },
    formType: {
      type: String,
      default: ""
    },
    appParameter: {
      type: String,
      default: ""
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: "en"
    },
    sessionFrom: {
      type: String,
      default: ""
    },
    sendMessageTitle: {
      type: String,
      default: ""
    },
    sendMessagePath: {
      type: String,
      default: ""
    },
    sendMessageImg: {
      type: String,
      default: ""
    },
    showMessageCard: {
      type: Boolean,
      default: false
    },
    hoverBgColor: {
      type: String,
      default: ""
    },
    rippleBgColor: {
      type: String,
      default: ""
    },
    ripple: {
      type: Boolean,
      default: false
    },
    hoverClass: {
      type: String,
      default: ""
    },
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    dataName: {
      type: String,
      default: ""
    },
    throttleTime: {
      type: [String, Number],
      default: 500
    },
    hoverStartTime: {
      type: [String, Number],
      default: 20
    },
    hoverStayTime: {
      type: [String, Number],
      default: 150
    },
    timerId: {
      type: [String, Number]
    }
  },
  computed: {
    getHoverClass() {
      if (this.loading || this.disabled || this.ripple || this.hoverClass)
        return "";
      let hoverClass = "";
      hoverClass = this.plain ? "u-" + this.type + "-plain-hover" : "u-" + this.type + "-hover";
      return hoverClass;
    },
    showHairLineBorder() {
      if (["primary", "success", "error", "warning"].indexOf(this.type) >= 0 && !this.plain) {
        return "";
      } else {
        return "u-hairline-border";
      }
    }
  },
  data() {
    let btnTimerId = this.timerId || "button_" + Math.floor(Math.random() * 1e8 + 0);
    return {
      btnTimerId,
      rippleTop: 0,
      rippleLeft: 0,
      fields: {},
      waveActive: false
    };
  },
  methods: {
    click(e) {
      this.$u.throttle(() => {
        if (this.loading === true || this.disabled === true)
          return;
        if (this.ripple) {
          this.waveActive = false;
          this.$nextTick(function() {
            this.getWaveQuery(e);
          });
        }
        this.$emit("click", e);
      }, this.throttleTime, true, this.btnTimerId);
    },
    getWaveQuery(e) {
      this.getElQuery().then((res) => {
        let data = res[0];
        if (!data.width || !data.width)
          return;
        data.targetWidth = data.height > data.width ? data.height : data.width;
        if (!data.targetWidth)
          return;
        this.fields = data;
        let touchesX = "", touchesY = "";
        touchesX = e.touches[0].clientX;
        touchesY = e.touches[0].clientY;
        this.rippleTop = touchesY - data.top - data.targetWidth / 2;
        this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
        this.$nextTick(() => {
          this.waveActive = true;
        });
      });
    },
    getElQuery() {
      return new Promise((resolve) => {
        let queryInfo = "";
        queryInfo = common_vendor.index.createSelectorQuery().in(this);
        queryInfo.select(".u-btn").boundingClientRect();
        queryInfo.exec((data) => {
          resolve(data);
        });
      });
    },
    getphonenumber(res) {
      this.$emit("getphonenumber", res);
    },
    getuserinfo(res) {
      this.$emit("getuserinfo", res);
    },
    error(res) {
      this.$emit("error", res);
    },
    opensetting(res) {
      this.$emit("opensetting", res);
    },
    launchapp(res) {
      this.$emit("launchapp", res);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.ripple
  }, $props.ripple ? {
    b: common_vendor.n($data.waveActive ? "u-wave-active" : ""),
    c: $data.rippleTop + "px",
    d: $data.rippleLeft + "px",
    e: $data.fields.targetWidth + "px",
    f: $data.fields.targetWidth + "px",
    g: $props.rippleBgColor || "rgba(0, 0, 0, 0.15)"
  } : {}, {
    h: common_vendor.n("u-size-" + $props.size),
    i: common_vendor.n($props.plain ? "u-btn--" + $props.type + "--plain" : ""),
    j: common_vendor.n($props.loading ? "u-loading" : ""),
    k: common_vendor.n($props.shape == "circle" ? "u-round-circle" : ""),
    l: common_vendor.n($props.hairLine ? $options.showHairLineBorder : "u-btn--bold-border"),
    m: common_vendor.n("u-btn--" + $props.type),
    n: common_vendor.n($props.disabled ? `u-btn--${$props.type}--disabled` : ""),
    o: Number($props.hoverStartTime),
    p: Number($props.hoverStayTime),
    q: $props.disabled,
    r: $props.formType,
    s: $props.openType,
    t: $props.appParameter,
    v: $props.hoverStopPropagation,
    w: $props.sendMessageTitle,
    x: $props.lang,
    y: $props.dataName,
    z: $props.sessionFrom,
    A: $props.sendMessageImg,
    B: $props.showMessageCard,
    C: common_vendor.o((...args) => $options.getphonenumber && $options.getphonenumber(...args)),
    D: common_vendor.o((...args) => $options.getuserinfo && $options.getuserinfo(...args)),
    E: common_vendor.o((...args) => $options.error && $options.error(...args)),
    F: common_vendor.o((...args) => $options.opensetting && $options.opensetting(...args)),
    G: common_vendor.o((...args) => $options.launchapp && $options.launchapp(...args)),
    H: common_vendor.s($props.customStyle),
    I: common_vendor.s({
      overflow: $props.ripple ? "hidden" : "visible"
    }),
    J: common_vendor.o(($event) => $options.click($event)),
    K: $options.getHoverClass,
    L: $props.loading
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-097def2b"], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/uni_modules/vk-uview-ui/components/u-button/u-button.vue"]]);
wx.createComponent(Component);
