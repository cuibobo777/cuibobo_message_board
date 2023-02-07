"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_vkUviewUi_components_uParse_libs_MpHtmlParser = require("./libs/MpHtmlParser.js");
require("./libs/config.js");
require("./libs/CssHandler.js");
const trees = () => "./libs/trees.js";
var cache = {};
var fs = common_vendor.index.getFileSystemManager ? common_vendor.index.getFileSystemManager() : null;
function hash(str) {
  for (var i = str.length, val = 5381; i--; )
    val += (val << 5) + str.charCodeAt(i);
  return val;
}
const _sfc_main = {
  name: "parser",
  emits: ["parse", "load", "ready", "error", "imgtap", "linkpress"],
  data() {
    return {
      showAm: "",
      nodes: []
    };
  },
  components: {
    trees
  },
  props: {
    html: String,
    autopause: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Boolean,
      default: true
    },
    autoscroll: Boolean,
    autosetTitle: {
      type: Boolean,
      default: true
    },
    compress: Number,
    loadingImg: String,
    useCache: Boolean,
    domain: String,
    lazyLoad: Boolean,
    selectable: Boolean,
    tagStyle: Object,
    showWithAnimation: Boolean,
    useAnchor: Boolean
  },
  watch: {
    html(html) {
      this.setContent(html);
    }
  },
  created() {
    this.imgList = [];
    this.imgList.each = function(f) {
      for (var i = 0, len = this.length; i < len; i++)
        this.setItem(i, f(this[i], i, this));
    };
    this.imgList.setItem = function(i, src) {
      if (i == void 0 || !src)
        return;
      if (src.indexOf("http") == 0 && this.includes(src)) {
        var newSrc = src.split("://")[0];
        for (var j = newSrc.length, c; c = src[j]; j++) {
          if (c == "/" && src[j - 1] != "/" && src[j + 1] != "/")
            break;
          newSrc += Math.random() > 0.5 ? c.toUpperCase() : c;
        }
        newSrc += src.substr(j);
        return this[i] = newSrc;
      }
      this[i] = src;
      if (src.includes("data:image")) {
        var filePath, info = src.match(/data:image\/(\S+?);(\S+?),(.+)/);
        if (!info)
          return;
        filePath = `${common_vendor.wx$1.env.USER_DATA_PATH}/${Date.now()}.${info[1]}`;
        fs && fs.writeFile({
          filePath,
          data: info[3],
          encoding: info[2],
          success: () => this[i] = filePath
        });
      }
    };
  },
  mounted() {
    if (this.html)
      this.setContent(this.html);
  },
  beforeUnmount() {
    this.imgList.each((src) => {
      if (src && src.includes(common_vendor.index.env.USER_DATA_PATH))
        fs && fs.unlink({
          filePath: src
        });
    });
    clearInterval(this._timer);
  },
  methods: {
    setContent(html, append) {
      var nodes;
      if (!html)
        return this.nodes = [];
      var parser = new uni_modules_vkUviewUi_components_uParse_libs_MpHtmlParser.MpHtmlParser(html, this);
      if (this.useCache) {
        var hashVal = hash(html);
        if (cache[hashVal])
          nodes = cache[hashVal];
        else {
          nodes = parser.parse();
          cache[hashVal] = nodes;
        }
      } else
        nodes = parser.parse();
      this.$emit("parse", nodes);
      if (append)
        this.nodes = this.nodes.concat(nodes);
      else
        this.nodes = nodes;
      if (nodes.length && nodes.title && this.autosetTitle)
        common_vendor.index.setNavigationBarTitle({
          title: nodes.title
        });
      if (this.imgList)
        this.imgList.length = 0;
      this.videoContexts = [];
      this.$nextTick(() => {
        (function f(cs) {
          for (var i = cs.length; i--; ) {
            if (cs[i].top) {
              cs[i].controls = [];
              cs[i].init();
              f(cs[i].$children);
            }
          }
        })(this.$children);
        this.$emit("load");
      });
      var height;
      clearInterval(this._timer);
      this._timer = setInterval(() => {
        common_vendor.index.createSelectorQuery().in(this).select("#_top").boundingClientRect().exec((res) => {
          if (!res)
            return;
          this.rect = res[0];
          if (this.rect.height == height) {
            this.$emit("ready", this.rect);
            clearInterval(this._timer);
          }
          height = this.rect.height;
        });
      }, 350);
      if (this.showWithAnimation && !append)
        this.showAm = "animation:_show .5s";
    },
    getText(ns = this.nodes) {
      var txt = "";
      for (var i = 0, n; n = ns[i++]; ) {
        if (n.type == "text")
          txt += n.text.replace(/&nbsp;/g, "\xA0").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        else if (n.type == "br")
          txt += "\n";
        else {
          var block = n.name == "p" || n.name == "div" || n.name == "tr" || n.name == "li" || n.name[0] == "h" && n.name[1] > "0" && n.name[1] < "7";
          if (block && txt && txt[txt.length - 1] != "\n")
            txt += "\n";
          if (n.children)
            txt += this.getText(n.children);
          if (block && txt[txt.length - 1] != "\n")
            txt += "\n";
          else if (n.name == "td" || n.name == "th")
            txt += "	";
        }
      }
      return txt;
    },
    in(obj) {
      if (obj.page && obj.selector && obj.scrollTop)
        this._in = obj;
    },
    navigateTo(obj) {
      if (!this.useAnchor)
        return obj.fail && obj.fail("Anchor is disabled");
      var d = " ";
      d = ">>>";
      var selector = common_vendor.index.createSelectorQuery().in(this._in ? this._in.page : this).select((this._in ? this._in.selector : "#_top") + (obj.id ? `${d}#${obj.id},${this._in ? this._in.selector : "#_top"}${d}.${obj.id}` : "")).boundingClientRect();
      if (this._in)
        selector.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect();
      else
        selector.selectViewport().scrollOffset();
      selector.exec((res) => {
        if (!res[0])
          return obj.fail && obj.fail("Label not found");
        var scrollTop = res[1].scrollTop + res[0].top - (res[2] ? res[2].top : 0) + (obj.offset || 0);
        if (this._in)
          this._in.page[this._in.scrollTop] = scrollTop;
        else
          common_vendor.index.pageScrollTo({
            scrollTop,
            duration: 300
          });
        obj.success && obj.success();
      });
    },
    getVideoContext(id) {
      if (!id)
        return this.videoContexts;
      else
        for (var i = this.videoContexts.length; i--; )
          if (this.videoContexts[i].id == id)
            return this.videoContexts[i];
    }
  }
};
if (!Array) {
  const _component_trees = common_vendor.resolveComponent("trees");
  _component_trees();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.nodes.length
  }, !$data.nodes.length ? {} : {}, {
    b: common_vendor.p({
      nodes: $data.nodes,
      lazyLoad: $props.lazyLoad,
      loading: $props.loadingImg
    }),
    c: common_vendor.s($data.showAm + ($props.selectable ? ";user-select:text;-webkit-user-select:text" : ""))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/uni_modules/vk-uview-ui/components/u-parse/u-parse.vue"]]);
wx.createComponent(Component);
