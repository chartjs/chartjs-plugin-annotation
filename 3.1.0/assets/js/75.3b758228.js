(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{501:function(n,t,a){"use strict";a.r(t);var o=a(4),e=Object(o.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("h1",{attrs:{id:"labeling"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#labeling"}},[this._v("#")]),this._v(" Labeling")]),this._v(" "),n("chart-editor",{attrs:{code:"// <block:setup:2>\nconst DATA_COUNT = 12;\nconst MIN = 10;\nconst MAX = 100;\n\nconst numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};\n\nconst data = {\n  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],\n  datasets: [{\n    data: Utils.numbers(numberCfg)\n  }]\n};\n// </block:setup>\n\n// <block:annotation:1>\nconst annotation = {\n  type: 'ellipse',\n  backgroundColor: 'rgba(208, 208, 208, 0.2)',\n  borderWidth: 0,\n  label: {\n    drawTime: 'afterDatasetsDraw',\n    display: true,\n    color: 'rgba(208, 208, 208, 0.6)',\n    content: 'whole year',\n    font: {\n      size: (ctx) => ctx.chart.chartArea.height / 4\n    },\n    position: {\n      x: 'center',\n      y: 'end'\n    }\n  }\n};\n// </block:annotation>\n\n/* <block:config:0> */\nconst config = {\n  type: 'line',\n  data,\n  options: {\n    plugins: {\n      annotation: {\n        annotations: {\n          annotation\n        }\n      }\n    }\n  }\n};\n/* </block:config> */\n\nconst actions = [\n  {\n    name: 'Randomize',\n    handler: function(chart) {\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));\n      });\n      chart.update();\n    }\n  }\n];\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n"}})],1)}),[],!1,null,null,null);t.default=e.exports}}]);