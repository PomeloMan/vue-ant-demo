(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["group-main"],{"0242":function(e,t,n){},1313:function(e,t,n){},"4adb":function(e,t,n){"use strict";var i=n("4db0"),a=n.n(i);a.a},"4db0":function(e,t,n){},"71e6":function(e,t,n){},c50c:function(e,t,n){"use strict";var i=n("71e6"),a=n.n(i);a.a},f12b:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-layout",{staticClass:"layout-wrapper"},[n("a-layout-sider",{attrs:{trigger:null,collapsible:""},model:{value:e.collapsed,callback:function(t){e.collapsed=t},expression:"collapsed"}},[n("main-sider")],1),n("a-layout",[n("a-layout-header",{staticStyle:{background:"#fff",padding:"0"}},[n("main-header")],1),n("a-layout-content",{staticClass:"layout-content"},[[n("router-view",{staticClass:"container"})]],2)],1)],1)},a=[],s=(n("b2a3"),n("0242"),n("6042")),o=n.n(s),r=n("9b57"),l=n.n(r),d=n("41b2"),c=n.n(d),u=n("4d91"),p=n("4d26"),h=n.n(p),f=n("daa3"),m=n("4df5"),v={prefixCls:u["a"].string,hasSider:u["a"].boolean};function g(e,t){return function(n){return{name:t,props:n.props,inject:{configProvider:{default:function(){return m["a"]}}},render:function(){var t=arguments[0],i=e.suffixCls,a=this.$props.prefixCls,s=this.configProvider.getPrefixCls,o=s(i,a),r={props:c()({prefixCls:o},Object(f["i"])(this)),on:this.$listeners};return t(n,r,[this.$slots["default"]])}}}}var b={props:v,render:function(){var e=arguments[0],t=this.prefixCls,n=this.$slots,i=this.$listeners,a={class:t,on:i};return e("div",a,[n["default"]])}},w={props:v,data:function(){return{siders:[]}},provide:function(){var e=this;return{siderHook:{addSider:function(t){e.siders=[].concat(l()(e.siders),[t])},removeSider:function(t){e.siders=e.siders.filter((function(e){return e!==t}))}}}},render:function(){var e=arguments[0],t=this.prefixCls,n=this.$slots,i=this.hasSider,a=this.$listeners,s=h()(t,o()({},t+"-has-sider",i||this.siders.length>0)),r={class:s,on:a};return e("div",r,[n["default"]])}},y=g({suffixCls:"layout"},"ALayout")(w),C=g({suffixCls:"layout-header"},"ALayoutHeader")(b),x=g({suffixCls:"layout-footer"},"ALayoutFooter")(b),k=g({suffixCls:"layout-content"},"ALayoutContent")(b);y.Header=C,y.Footer=x,y.Content=k;var S=y,_=n("0c63"),$=n("b488"),A=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},O=A;if("undefined"!==typeof window){var H=function(e){return{media:e,matches:!1,addListener:function(){},removeListener:function(){}}};window.matchMedia=window.matchMedia||H}var L={xs:"480px",sm:"576px",md:"768px",lg:"992px",xl:"1200px",xxl:"1600px"},M={prefixCls:u["a"].string,collapsible:u["a"].bool,collapsed:u["a"].bool,defaultCollapsed:u["a"].bool,reverseArrow:u["a"].bool,trigger:u["a"].any,width:u["a"].oneOfType([u["a"].number,u["a"].string]),collapsedWidth:u["a"].oneOfType([u["a"].number,u["a"].string]),breakpoint:u["a"].oneOf(["xs","sm","md","lg","xl","xxl"]),theme:u["a"].oneOf(["light","dark"]).def("dark")},j=function(){var e=0;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e+=1,""+t+e}}(),I={name:"ALayoutSider",__ANT_LAYOUT_SIDER:!0,mixins:[$["a"]],model:{prop:"collapsed",event:"collapse"},props:Object(f["q"])(M,{collapsible:!1,defaultCollapsed:!1,reverseArrow:!1,width:200,collapsedWidth:80}),data:function(){this.uniqueId=j("ant-sider-");var e=void 0;"undefined"!==typeof window&&(e=window.matchMedia);var t=Object(f["i"])(this);e&&t.breakpoint&&t.breakpoint in L&&(this.mql=e("(max-width: "+L[t.breakpoint]+")"));var n=void 0;return n="collapsed"in t?t.collapsed:t.defaultCollapsed,{sCollapsed:n,below:!1,belowShow:!1}},provide:function(){return{layoutSiderContext:this}},inject:{siderHook:{default:function(){return{}}},configProvider:{default:function(){return m["a"]}}},watch:{collapsed:function(e){this.setState({sCollapsed:e})}},mounted:function(){var e=this;this.$nextTick((function(){e.mql&&(e.mql.addListener(e.responsiveHandler),e.responsiveHandler(e.mql)),e.siderHook.addSider&&e.siderHook.addSider(e.uniqueId)}))},beforeDestroy:function(){this.mql&&this.mql.removeListener(this.responsiveHandler),this.siderHook.removeSider&&this.siderHook.removeSider(this.uniqueId)},methods:{responsiveHandler:function(e){this.setState({below:e.matches}),this.$emit("breakpoint",e.matches),this.sCollapsed!==e.matches&&this.setCollapsed(e.matches,"responsive")},setCollapsed:function(e,t){Object(f["p"])(this,"collapsed")||this.setState({sCollapsed:e}),this.$emit("collapse",e,t)},toggle:function(){var e=!this.sCollapsed;this.setCollapsed(e,"clickTrigger")},belowShowChange:function(){this.setState({belowShow:!this.belowShow})}},render:function(){var e,t=arguments[0],n=Object(f["i"])(this),i=n.prefixCls,a=n.theme,s=n.collapsible,r=n.reverseArrow,l=n.width,d=n.collapsedWidth,c=this.configProvider.getPrefixCls,u=c("layout-sider",i),p=Object(f["f"])(this,"trigger"),m=this.sCollapsed?d:l,v=O(m)?m+"px":String(m),g=0===parseFloat(String(d||0))?t("span",{on:{click:this.toggle},class:u+"-zero-width-trigger "+u+"-zero-width-trigger-"+(r?"right":"left")},[t(_["a"],{attrs:{type:"bars"}})]):null,b={expanded:t(_["a"],r?{attrs:{type:"right"}}:{attrs:{type:"left"}}),collapsed:t(_["a"],r?{attrs:{type:"left"}}:{attrs:{type:"right"}})},w=this.sCollapsed?"collapsed":"expanded",y=b[w],C=null!==p?g||t("div",{class:u+"-trigger",on:{click:this.toggle},style:{width:v}},[p||y]):null,x={flex:"0 0 "+v,maxWidth:v,minWidth:v,width:v},k=h()(u,u+"-"+a,(e={},o()(e,u+"-collapsed",!!this.sCollapsed),o()(e,u+"-has-trigger",s&&null!==p&&!g),o()(e,u+"-below",!!this.below),o()(e,u+"-zero-width",0===parseFloat(v)),e)),S={on:this.$listeners,class:k,style:x};return t("div",S,[t("div",{class:u+"-children"},[this.$slots["default"]]),s||this.below&&g?C:null])}},q=n("db14");S.Sider=I,S.install=function(e){e.use(q["a"]),e.component(S.name,S),e.component(S.Header.name,S.Header),e.component(S.Footer.name,S.Footer),e.component(S.Sider.name,S.Sider),e.component(S.Content.name,S.Content)};var T=S,D=n("aca3"),F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"logo"}),n("a-menu",{attrs:{theme:"dark",mode:"inline",defaultSelectedKeys:["1"]}},[e._l(e.menus,(function(t){return[t.children&&0!==t.children.length?e._e():n("a-menu-item",{key:t.id},[n("router-link",{attrs:{to:t.url}},[n("a-icon",{attrs:{type:t.icon}}),n("span",[e._v(e._s(e.mapOfDict[t.name]||t.name))])],1)],1),t.children&&t.children.length>0?n("a-sub-menu",{key:t.id},[n("span",{attrs:{slot:"title"},slot:"title"},[n("a-icon",{attrs:{type:t.icon}}),n("span",[e._v(e._s(e.mapOfDict[t.name]||t.name))])],1),e._l(t.children,(function(t){return[n("a-menu-item",{key:t.id},[n("router-link",{attrs:{to:t.url}},[e._v(e._s(e.mapOfDict[t.name]||t.name))])],1)]}))],2):e._e()]}))],2)],1)},P=[],z=(n("d3b7"),n("3ca3"),n("ddb0"),n("fbd8"),n("55f1")),E={name:"main-sider",extends:D["a"],components:{AMenu:z["a"],AMenuItem:z["a"].Item,ASubMenu:z["a"].SubMenu},data:function(){return{menus:[]}},created:function(){Promise.all([this.getMenus()]).then()},methods:{getMenus:function(){var e=this;return this.$http.get(this.$api.MENU_LIST).then((function(t){var n=t.data;e.menus=n}))}}},W=E,N=(n("c50c"),n("2877")),J=Object(N["a"])(W,F,P,!1,null,"c87a7d4e",null),U=J.exports,K=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main-header"},[n("div",{staticClass:"left-wrapper"},[n("a-icon",{staticClass:"trigger",attrs:{type:e.collapsed?"menu-unfold":"menu-fold"},on:{click:e.collapse}})],1),n("div",{staticClass:"right-wrapper"},[n("a-dropdown",{attrs:{trigger:["click"]}},[n("li",{staticClass:"ant-menu-item ant-dropdown-link",attrs:{href:"#"}},[e._v(" 语言 "),n("a-icon",{attrs:{type:"down"}})],1),n("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[n("a-menu-item",{key:"0",on:{click:function(t){return e.i18n("zh")}}},[e._v("中文")]),n("a-menu-item",{key:"1",on:{click:function(t){return e.i18n("en")}}},[e._v("英文")])],1)],1)],1)])},R=[],Y=(n("9d5c"),n("a600")),B={locales:[{code:"zh",name:"中文"},{code:"en",name:"英文"}]},G={name:"main-header",extends:D["a"],components:{AMenu:z["a"],AMenuItem:z["a"].Item,ADropdown:Y["a"]},data:function(){return{locales:B.locales}},methods:{collapse:function(){this.collapsed=!this.collapsed},i18n:function(e){this.$i18n.locale=e,this.mapOfDict=this.$i18n.locale}},created:function(){}},Q=G,V=(n("f66e"),Object(N["a"])(Q,K,R,!1,null,"f422e0e4",null)),X=V.exports,Z={name:"home",extends:D["a"],data:function(){return{}},computed:{},components:{ALayout:T,ALayoutHeader:T.Header,ALayoutSider:T.Sider,ALayoutContent:T.Content,MainSider:U,MainHeader:X},created:function(){var e=this;this.$http.get(this.$api.DICT_LIST).then((function(t){var n=t.data;e.dicts=n}))}},ee=Z,te=(n("4adb"),Object(N["a"])(ee,i,a,!1,null,"2e732dc2",null));t["default"]=te.exports},f66e:function(e,t,n){"use strict";var i=n("1313"),a=n.n(i);a.a}}]);
//# sourceMappingURL=group-main.8d59b1ba.js.map