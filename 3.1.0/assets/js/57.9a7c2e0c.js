(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{484:function(n,t,a){"use strict";a.r(t);var e=a(4),o=Object(e.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("h1",{attrs:{id:"usage"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#usage"}},[this._v("#")]),this._v(" Usage")]),this._v(" "),n("p",[this._v("Using the annotation plugin is very simple. Once the plugin is "),n("a",{attrs:{href:"./integration"}},[this._v("registered")]),this._v(" annotation options provided to the chart will be used. In this simple example, we define a single box annotation for our chart.")]),this._v(" "),n("chart-editor",{attrs:{code:"/* <block:config:0> */\nconst config = {\n  type: 'line',\n  data: {\n    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],\n    datasets: [{\n      label: 'My First Dataset',\n      data: [65, 59, 80, 81, 56, 55, 40],\n      fill: false,\n      borderColor: 'rgb(75, 192, 192)',\n      tension: 0.1\n    }]\n  },\n  options: {\n    plugins: {\n      annotation: {\n        annotations: {\n          box1: {\n            // Indicates the type of annotation\n            type: 'box',\n            xMin: 1,\n            xMax: 2,\n            yMin: 50,\n            yMax: 70,\n            backgroundColor: 'rgba(255, 99, 132, 0.25)'\n          }\n        }\n      }\n    }\n  }\n};\n/* </block:config> */\n\nmodule.exports = {\n  config\n};\n"}})],1)}),[],!1,null,null,null);t.default=o.exports}}]);