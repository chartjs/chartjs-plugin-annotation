(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{517:function(n,t,a){"use strict";a.r(t);var o=a(22),e=Object(o.a)({},(function(){var n=this.$createElement,t=this._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[t("h1",{attrs:{id:"points-outside-of-chart-area"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#points-outside-of-chart-area"}},[this._v("#")]),this._v(" Points outside of chart area")]),this._v(" "),t("chart-editor",{attrs:{code:"// <block:setup:6>\nconst DATA_COUNT = 12;\nconst MIN = 10;\nconst MAX = 100;\n\nUtils.srand(8);\n\nconst numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};\n\nconst data = {\n  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],\n  datasets: [{\n    data: Utils.numbers(numberCfg)\n  }, {\n    data: Utils.numbers(numberCfg)\n  }]\n};\n// </block:setup>\n\n// <block:annotation1:1>\nconst annotation1 = {\n  type: 'point',\n  backgroundColor: 'lime',\n  borderColor: 'black',\n  borderWidth: 1,\n  pointStyle: 'triangle',\n  radius: 15,\n  xValue: 3,\n  xScaleID: 'x',\n  yAdjust: 5,\n  yValue: 0,\n  yScaleID: 'y'\n};\n// </block:annotation1>\n\n// <block:annotation2:2>\nconst annotation2 = {\n  type: 'point',\n  backgroundColor: 'lime',\n  borderColor: 'black',\n  borderWidth: 1,\n  pointStyle: 'triangle',\n  radius: 15,\n  rotation: 180,\n  xValue: 3,\n  xScaleID: 'x',\n  yAdjust: -5,\n  yValue: 100,\n  yScaleID: 'y'\n};\n// </block:annotation2>\n\n/* <block:config:0> */\nconst config = {\n  type: 'bar',\n  data,\n  options: {\n    layout: {\n      padding: {\n        top: 16\n      }\n    },\n    scale: {\n      y: {\n        beginAtZero: true,\n        max: 100,\n        min: 0\n      }\n    },\n    plugins: {\n      annotation: {\n        clip: false,\n        drawTime: 'afterDraw',\n        annotations: {\n          annotation1,\n          annotation2\n        }\n      }\n    }\n  }\n};\n/* </block:config> */\n\nconst actions = [\n  {\n    name: 'Randomize',\n    handler: function(chart) {\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));\n      });\n      const xValue = Utils.rand(0, DATA_COUNT - 1);\n      chart.options.plugins.annotation.annotations.annotation1.xValue = xValue;\n      chart.options.plugins.annotation.annotations.annotation2.xValue = xValue;\n      chart.update();\n    }\n  }\n];\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n"}})],1)}),[],!1,null,null,null);t.default=e.exports}}]);