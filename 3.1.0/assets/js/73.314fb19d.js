(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{500:function(n,t,a){"use strict";a.r(t);var o=a(4),i=Object(o.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("h1",{attrs:{id:"basic"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#basic"}},[this._v("#")]),this._v(" Basic")]),this._v(" "),n("chart-editor",{attrs:{code:"// <block:setup:4>\nconst DATA_COUNT = 8;\nconst MIN = [0, 50];\nconst MAX = [50, 100];\n\nUtils.srand(8);\n\nconst data = {\n  datasets: [{\n    data: Utils.points({count: DATA_COUNT, min: MIN[0], max: MAX[0]})\n  }, {\n    data: Utils.points({count: DATA_COUNT, min: MIN[1], max: MAX[1]})\n  }]\n};\n// </block:setup>\n\n// <block:annotation1:1>\nconst annotation1 = {\n  type: 'ellipse',\n  backgroundColor: 'rgba(0, 150, 0, 0.02)',\n  borderColor: 'rgba(0, 150, 0, 0.2)',\n  borderWidth: 1,\n  xMax: (ctx) => max(ctx, 0, 'x') + 10,\n  xMin: (ctx) => min(ctx, 0, 'x') - 10,\n  yMax: (ctx) => max(ctx, 0, 'y') + 10,\n  yMin: (ctx) => min(ctx, 0, 'y') - 10\n};\n// </block:annotation1>\n\n// <block:annotation2:2>\nconst annotation2 = {\n  type: 'ellipse',\n  backgroundColor: 'rgba(150, 0, 0, 0.02)',\n  borderColor: 'rgba(150, 0, 0, 0.2)',\n  borderWidth: 1,\n  xMax: (ctx) => max(ctx, 1, 'x') + 10,\n  xMin: (ctx) => min(ctx, 1, 'x') - 10,\n  yMax: (ctx) => max(ctx, 1, 'y') + 10,\n  yMin: (ctx) => min(ctx, 1, 'y') - 10\n};\n// </block:annotation2>\n\n/* <block:config:0> */\nconst config = {\n  type: 'scatter',\n  data,\n  options: {\n    plugins: {\n      annotation: {\n        annotations: {\n          annotation1,\n          annotation2\n        }\n      }\n    }\n  }\n};\n/* </block:config> */\n\n// <block:utils:3>\nfunction min(ctx, datasetIndex, prop) {\n  const dataset = ctx.chart.data.datasets[datasetIndex];\n  return dataset.data.reduce((v, point) => Math.min(point[prop], v), Infinity);\n}\n\nfunction max(ctx, datasetIndex, prop) {\n  const dataset = ctx.chart.data.datasets[datasetIndex];\n  return dataset.data.reduce((v, point) => Math.max(point[prop], v), -Infinity);\n}\n// </block:utils>\n\nconst actions = [\n  {\n    name: 'Randomize',\n    handler: function(chart) {\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.forEach(p => {\n          p.x = Utils.rand(MIN[i], MAX[i]);\n          p.y = Utils.rand(MIN[i], MAX[i]);\n        });\n      });\n      chart.update();\n    }\n  },\n  {\n    name: 'Add data',\n    handler: function(chart) {\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.push({x: Utils.rand(MIN[i], MAX[i]), y: Utils.rand(MIN[i], MAX[i])});\n      });\n      chart.update();\n    }\n  },\n  {\n    name: 'Remove data',\n    handler: function(chart) {\n      chart.data.labels.shift();\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.shift();\n      });\n      chart.update();\n    }\n  }\n];\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n"}})],1)}),[],!1,null,null,null);t.default=i.exports}}]);