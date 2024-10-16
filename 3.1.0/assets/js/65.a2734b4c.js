(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{492:function(n,t,a){"use strict";a.r(t);var o=a(4),r=Object(o.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("h1",{attrs:{id:"yearly-quarters"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#yearly-quarters"}},[this._v("#")]),this._v(" Yearly quarters")]),this._v(" "),n("chart-editor",{attrs:{code:"// <block:setup:5>\nconst DATA_COUNT = 12;\nconst MIN = 10;\nconst MAX = 100;\n\nconst numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};\n\nconst data = {\n  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],\n  datasets: [{\n    data: Utils.numbers(numberCfg)\n  }]\n};\n// </block:setup>\n\n// <block:annotation1:1>\nconst annotation1 = {\n  type: 'box',\n  backgroundColor: 'rgba(255, 245, 157, 0.2)',\n  borderWidth: 0,\n  xMax: 2.5,\n  xMin: -0.5,\n  label: {\n    drawTime: 'afterDraw',\n    display: true,\n    content: 'First quarter',\n    position: {\n      x: 'center',\n      y: 'start'\n    }\n  }\n};\n// </block:annotation1>\n\n// <block:annotation2:2>\nconst annotation2 = {\n  type: 'box',\n  backgroundColor: 'rgba(188, 170, 164, 0.2)',\n  borderWidth: 0,\n  xMax: 5.5,\n  xMin: 2.5,\n  label: {\n    drawTime: 'afterDraw',\n    display: true,\n    content: 'Second quarter',\n    position: {\n      x: 'center',\n      y: 'start'\n    }\n  }\n};\n// </block:annotation2>\n\n// <block:annotation3:3>\nconst annotation3 = {\n  type: 'box',\n  backgroundColor: 'rgba(165, 214, 167, 0.2)',\n  borderWidth: 0,\n  xMax: 8.5,\n  xMin: 5.5,\n  label: {\n    drawTime: 'afterDraw',\n    display: true,\n    content: 'Third quarter',\n    position: {\n      x: 'center',\n      y: 'start'\n    }\n  }\n};\n// </block:annotation3>\n\n// <block:annotation4:4>\nconst annotation4 = {\n  type: 'box',\n  backgroundColor: 'rgba(159, 168, 218, 0.2)',\n  borderWidth: 0,\n  xMin: 8.5,\n  label: {\n    drawTime: 'afterDraw',\n    display: true,\n    content: 'Fourth quarter',\n    position: {\n      x: 'center',\n      y: 'start'\n    }\n  }\n};\n// </block:annotation4>\n\n/* <block:config:0> */\nconst config = {\n  type: 'line',\n  data,\n  options: {\n    scales: {\n      y: {\n        beginAtZero: true,\n        max: 120,\n        min: 0\n      }\n    },\n    plugins: {\n      annotation: {\n        common: {\n          drawTime: 'beforeDraw'\n        },\n        annotations: {\n          annotation1,\n          annotation2,\n          annotation3,\n          annotation4\n        }\n      }\n    }\n  }\n};\n/* </block:config> */\n\nconst actions = [\n  {\n    name: 'Randomize',\n    handler: function(chart) {\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));\n      });\n      chart.update();\n    }\n  }\n];\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n"}})],1)}),[],!1,null,null,null);t.default=r.exports}}]);