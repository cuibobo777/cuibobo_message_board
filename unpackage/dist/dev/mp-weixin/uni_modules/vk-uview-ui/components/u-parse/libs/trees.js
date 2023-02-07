"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_vkUviewUi_components_uParse_libs_config = require("./config.js");
var inline = {
  abbr: 1,
  b: 1,
  big: 1,
  code: 1,
  del: 1,
  em: 1,
  i: 1,
  ins: 1,
  label: 1,
  q: 1,
  small: 1,
  span: 1,
  strong: 1,
  sub: 1,
  sup: 1
};
let global = {};
global.Parser = {};
const trees = () => Promise.resolve().then(() => RTovQ3VpYm9ib19Qcm9qZWN0cy9IQnVpbGRlclByb2plY3RzL09yZWJvLWFkbWluL3VuaV9tb2R1bGVzL3ZrLXV2aWV3LXVpL2NvbXBvbmVudHMvdS1wYXJzZS9saWJzL3RyZWVzLnZ1ZQ);
const errorImg = uni_modules_vkUviewUi_components_uParse_libs_config.cfg.errorImg;
const _sfc_main = {
  components: {
    trees
  },
  name: "trees",
  data() {
    return {
      ctrl: [],
      placeholder: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="225"/>',
      errorImg,
      loadVideo: typeof plus == "undefined",
      c: "",
      s: ""
    };
  },
  props: {
    nodes: Array,
    lazyLoad: Boolean,
    loading: String
  },
  mounted() {
    for (this.top = this.$parent; this.top.$options.name != "parser"; this.top = this.top.$parent)
      ;
    this.init();
  },
  methods: {
    init() {
      for (var i = this.nodes.length, n; n = this.nodes[--i]; ) {
        if (n.name == "img") {
          this.top.imgList.setItem(n.attrs.i, n.attrs["original-src"] || n.attrs.src);
        } else if (n.name == "video" || n.name == "audio") {
          var ctx;
          if (n.name == "video") {
            ctx = common_vendor.index.createVideoContext(
              n.attrs.id,
              this
            );
          } else if (this.$refs[n.attrs.id])
            ctx = this.$refs[n.attrs.id][0];
          if (ctx) {
            ctx.id = n.attrs.id;
            this.top.videoContexts.push(ctx);
          }
        }
      }
    },
    play(e) {
      var contexts = this.top.videoContexts;
      if (contexts.length > 1 && this.top.autopause) {
        for (var i = contexts.length; i--; )
          if (contexts[i].id != e.currentTarget.dataset.id)
            contexts[i].pause();
      }
    },
    imgtap(e) {
      var attrs = e.currentTarget.dataset.attrs;
      if (!attrs.ignore) {
        var preview = true, data = {
          id: e.target.id,
          src: attrs.src,
          ignore: () => preview = false
        };
        global.Parser.onImgtap && global.Parser.onImgtap(data);
        this.top.$emit("imgtap", data);
        if (preview) {
          var urls = this.top.imgList, current = urls[attrs.i] ? parseInt(attrs.i) : (urls = [attrs.src], 0);
          common_vendor.index.previewImage({
            current,
            urls
          });
        }
      }
    },
    loadImg(e) {
      var i = e.currentTarget.dataset.i;
      if (this.lazyLoad && !this.ctrl[i]) {
        this.$set(this.ctrl, i, 1);
      } else if (this.loading && this.ctrl[i] != 2) {
        this.$set(this.ctrl, i, 2);
      }
    },
    linkpress(e) {
      var jump = true, attrs = e.currentTarget.dataset.attrs;
      attrs.ignore = () => jump = false;
      global.Parser.onLinkpress && global.Parser.onLinkpress(attrs);
      this.top.$emit("linkpress", attrs);
      if (jump) {
        if (attrs["app-id"]) {
          return common_vendor.index.navigateToMiniProgram({
            appId: attrs["app-id"],
            path: attrs.path
          });
        }
        if (attrs.href) {
          if (attrs.href[0] == "#") {
            if (this.top.useAnchor)
              this.top.navigateTo({
                id: attrs.href.substring(1)
              });
          } else if (attrs.href.indexOf("http") == 0 || attrs.href.indexOf("//") == 0) {
            common_vendor.index.setClipboardData({
              data: attrs.href,
              success: () => common_vendor.index.showToast({
                title: "\u94FE\u63A5\u5DF2\u590D\u5236"
              })
            });
          } else
            common_vendor.index.navigateTo({
              url: attrs.href,
              fail() {
                common_vendor.index.switchTab({
                  url: attrs.href
                });
              }
            });
        }
      }
    },
    error(e) {
      var target = e.currentTarget, source = target.dataset.source, i = target.dataset.i;
      if (source == "video" || source == "audio") {
        var index = this.ctrl[i] ? this.ctrl[i].i + 1 : 1;
        if (index < this.nodes[i].attrs.source.length)
          this.$set(this.ctrl, i, index);
        if (e.detail.__args__)
          e.detail = e.detail.__args__[0];
      }
      this.top && this.top.$emit("error", {
        source,
        target,
        errMsg: e.detail.errMsg
      });
    },
    _loadVideo(e) {
      this.$set(this.ctrl, e.target.dataset.i, 0);
    },
    use(item) {
      return !item.c && !inline[item.name] && (item.attrs.style || "").indexOf("display:inline") == -1;
    }
  }
};
if (!Array) {
  const _component_trees = common_vendor.resolveComponent("trees");
  _component_trees();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.nodes, (n, i, i0) => {
      return common_vendor.e({
        a: n.name == "img"
      }, n.name == "img" ? common_vendor.e({
        b: $data.ctrl[i] != 0
      }, $data.ctrl[i] != 0 ? {
        c: [{
          attrs: {
            src: $props.loading && ($data.ctrl[i] || 0) < 2 ? $props.loading : $props.lazyLoad && !$data.ctrl[i] ? $data.placeholder : $data.ctrl[i] == 3 ? $data.errorImg : n.attrs.src || "",
            alt: n.attrs.alt || "",
            width: n.attrs.width || "",
            style: "-webkit-touch-callout:none;max-width:100%;display:block" + (n.attrs.height ? ";height:" + n.attrs.height : "")
          },
          name: "img"
        }]
      } : {}, {
        d: $props.lazyLoad && !$data.ctrl[i] ? $data.placeholder : n.attrs.src,
        e: $props.lazyLoad,
        f: !n.attrs.ignore,
        g: i,
        h: n.attrs.i,
        i: common_vendor.o((...args) => $options.loadImg && $options.loadImg(...args), i),
        j: common_vendor.o((...args) => $options.error && $options.error(...args), i),
        k: common_vendor.n("_img " + n.attrs.class),
        l: common_vendor.s(n.attrs.style),
        m: n.attrs,
        n: common_vendor.o((...args) => $options.imgtap && $options.imgtap(...args), i)
      }) : n.type == "text" ? {
        p: common_vendor.t(n.text)
      } : n.name == "br" ? {} : (n.lazyLoad && !n.attrs.autoplay || n.name == "video" && !$data.loadVideo) && $data.ctrl[i] == void 0 ? {
        s: n.attrs.id,
        t: common_vendor.n("_video " + (n.attrs.class || "")),
        v: common_vendor.s(n.attrs.style),
        w: i,
        x: common_vendor.o((...args) => $options._loadVideo && $options._loadVideo(...args), i)
      } : n.name == "video" ? {
        z: n.attrs.id,
        A: common_vendor.n(n.attrs.class),
        B: common_vendor.s(n.attrs.style),
        C: n.attrs.autoplay || $data.ctrl[i] == 0,
        D: n.attrs.controls,
        E: n.attrs.loop,
        F: n.attrs.muted,
        G: n.attrs.poster,
        H: n.attrs.source[$data.ctrl[i] || 0],
        I: n.attrs["unit-id"],
        J: n.attrs.id,
        K: i,
        L: common_vendor.o((...args) => $options.error && $options.error(...args), i),
        M: common_vendor.o((...args) => $options.play && $options.play(...args), i)
      } : n.name == "audio" ? {
        O: n.attrs.id,
        P: common_vendor.n(n.attrs.class),
        Q: common_vendor.s(n.attrs.style),
        R: n.attrs.author,
        S: n.attrs.autoplay,
        T: n.attrs.controls,
        U: n.attrs.loop,
        V: n.attrs.name,
        W: n.attrs.poster,
        X: n.attrs.source[$data.ctrl[i] || 0],
        Y: i,
        Z: n.attrs.id,
        aa: common_vendor.o((...args) => $options.error && $options.error(...args), i),
        ab: common_vendor.o((...args) => $options.play && $options.play(...args), i)
      } : n.name == "a" ? {
        ad: "bd1d4456-0-" + i0,
        ae: common_vendor.p({
          c: "_span",
          nodes: n.children
        }),
        af: n.attrs.id,
        ag: common_vendor.n("_a " + (n.attrs.class || "")),
        ah: common_vendor.s(n.attrs.style),
        ai: n.attrs,
        aj: common_vendor.o((...args) => $options.linkpress && $options.linkpress(...args), i)
      } : n.name == "li" ? common_vendor.e({
        al: n.type == "ol"
      }, n.type == "ol" ? {
        am: common_vendor.t(n.num)
      } : common_vendor.e({
        an: n.floor % 3 == 0
      }, n.floor % 3 == 0 ? {} : n.floor % 3 == 2 ? {} : {}, {
        ao: n.floor % 3 == 2
      }), {
        ap: "bd1d4456-1-" + i0,
        aq: common_vendor.p({
          c: "_li",
          nodes: n.children,
          lazyLoad: $props.lazyLoad,
          loading: $props.loading
        }),
        ar: n.attrs.id,
        as: common_vendor.n(n.attrs.class),
        at: common_vendor.s((n.attrs.style || "") + ";display:flex;flex-direction:row")
      }) : n.name == "table" && n.c && n.flag ? {
        aw: common_vendor.f(n.children, (cell, n2, i1) => {
          return {
            a: n2,
            b: common_vendor.n(cell.attrs.class),
            c: common_vendor.s(cell.attrs.style),
            d: "bd1d4456-2-" + i0 + "-" + i1,
            e: common_vendor.p({
              c: cell.attrs.class,
              s: cell.attrs.style,
              nodes: cell.children
            })
          };
        }),
        ax: n.attrs.id,
        ay: common_vendor.n(n.attrs.class),
        az: common_vendor.s((n.attrs.style || "") + ";display:grid")
      } : n.name == "table" && n.c ? {
        aB: common_vendor.f(n.children, (tbody, o, i1) => {
          return {
            a: common_vendor.f(tbody.children, (tr, p, i2) => {
              return common_vendor.e({
                a: tr.name == "td"
              }, tr.name == "td" ? {
                b: "bd1d4456-3-" + i0 + "-" + i1 + "-" + i2,
                c: common_vendor.p({
                  nodes: tr.children
                })
              } : {
                d: common_vendor.f(tr.children, (td, q, i3) => {
                  return {
                    a: q,
                    b: common_vendor.n(td.attrs.class),
                    c: common_vendor.s((td.attrs.style || "") + (td.name[0] == "t" ? ";display:table-" + (td.name == "tr" ? "row" : "cell") : "")),
                    d: "bd1d4456-4-" + i0 + "-" + i1 + "-" + i2 + "-" + i3,
                    e: common_vendor.p({
                      c: td.attrs.class,
                      s: (td.attrs.style || "") + (td.name[0] == "t" ? ";display:table-" + (td.name == "tr" ? "row" : "cell") : ""),
                      nodes: td.children
                    })
                  };
                })
              }, {
                e: p,
                f: common_vendor.n(tr.attrs.class),
                g: common_vendor.s((tr.attrs.style || "") + (tr.name[0] == "t" ? ";display:table-" + (tr.name == "tr" ? "row" : "cell") : ""))
              });
            }),
            b: o,
            c: common_vendor.n(tbody.attrs.class),
            d: common_vendor.s((tbody.attrs.style || "") + (tbody.name[0] == "t" ? ";display:table-" + (tbody.name == "tr" ? "row" : "row-group") : ""))
          };
        }),
        aC: n.attrs.id,
        aD: common_vendor.n(n.attrs.class),
        aE: common_vendor.s((n.attrs.style || "") + ";display:table")
      } : $options.use(n) ? {
        aG: n.attrs.id,
        aH: common_vendor.n("_p __" + n.name),
        aI: [n]
      } : {
        aJ: common_vendor.n((n.attrs.id || "") + " _" + n.name + " " + (n.attrs.class || "")),
        aK: common_vendor.s(n.attrs.style),
        aL: "bd1d4456-5-" + i0,
        aM: common_vendor.p({
          c: (n.attrs.id || "") + " _" + n.name + " " + (n.attrs.class || ""),
          s: n.attrs.style,
          nodes: n.children,
          lazyLoad: $props.lazyLoad,
          loading: $props.loading
        })
      }, {
        o: n.type == "text",
        q: n.name == "br",
        r: (n.lazyLoad && !n.attrs.autoplay || n.name == "video" && !$data.loadVideo) && $data.ctrl[i] == void 0,
        y: n.name == "video",
        N: n.name == "audio",
        ac: n.name == "a",
        ak: n.name == "li",
        av: n.name == "table" && n.c && n.flag,
        aA: n.name == "table" && n.c,
        aF: $options.use(n),
        aN: i
      });
    }),
    b: common_vendor.n("interlayer " + ($data.c || "")),
    c: common_vendor.s($data.s)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Cuibobo_Projects/HBuilderProjects/Orebo-admin/uni_modules/vk-uview-ui/components/u-parse/libs/trees.vue"]]);
wx.createComponent(Component);
const RTovQ3VpYm9ib19Qcm9qZWN0cy9IQnVpbGRlclByb2plY3RzL09yZWJvLWFkbWluL3VuaV9tb2R1bGVzL3ZrLXV2aWV3LXVpL2NvbXBvbmVudHMvdS1wYXJzZS9saWJzL3RyZWVzLnZ1ZQ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
