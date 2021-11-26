(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{494:function(n,t,a){"use strict";a.r(t);var o=a(22),i=Object(o.a)({},(function(){var n=this.$createElement,t=this._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[t("h1",{attrs:{id:"box"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#box"}},[this._v("#")]),this._v(" Box")]),this._v(" "),t("chart-editor",{attrs:{code:"// <block:setup:4>\nconst DATA_COUNT = 8;\nconst MIN = [0, 50];\nconst MAX = [50, 100];\n\nUtils.srand(8);\n\nconst data = {\n  datasets: [{\n    data: Utils.points({count: DATA_COUNT, min: MIN[0], max: MAX[0]}),\n  }, {\n    data: Utils.points({count: DATA_COUNT, min: MIN[1], max: MAX[1]}),\n  }]\n};\n// </block:setup>\n\n// <block:annotation1:1>\nconst annotation1 = {\n  type: 'box',\n  backgroundColor: 'rgba(0,150,0,0.02)',\n  borderColor: 'rgba(0,150,0,0.2)',\n  borderWidth: 1,\n  borderRadius: 4,\n  xMin: (ctx) => min(ctx, 0, 'x') - 2,\n  yMin: (ctx) => min(ctx, 0, 'y') - 2,\n  xMax: (ctx) => max(ctx, 0, 'x') + 2,\n  yMax: (ctx) => max(ctx, 0, 'y') + 2\n};\n// </block:annotation1>\n\n// <block:annotation2:2>\nconst annotation2 = {\n  type: 'box',\n  backgroundColor: 'rgba(150,0,0,0.02)',\n  borderColor: 'rgba(150,0,0,0.2)',\n  borderWidth: 1,\n  borderRadius: 4,\n  xMin: (ctx) => min(ctx, 1, 'x') - 2,\n  yMin: (ctx) => min(ctx, 1, 'y') - 2,\n  xMax: (ctx) => max(ctx, 1, 'x') + 2,\n  yMax: (ctx) => max(ctx, 1, 'y') + 2,\n  label: {\n    enabled: true,\n    content: 'Box annotation',\n    color: 'rgba(150,0,0,0.2)'\n  }\n};\n// </block:annotation2>\n\n/* <block:config:0> */\nconst config = {\n  type: 'scatter',\n  data,\n  options: {\n    plugins: {\n      annotation: {\n        annotations: {\n          annotation1,\n          annotation2\n        }\n      }\n    },\n  }\n};\n/* </block:config> */\n\n// <block:utils:3>\nfunction min(ctx, datasetIndex, prop) {\n  const dataset = ctx.chart.data.datasets[datasetIndex];\n  return dataset.data.reduce((v, point) => Math.min(point[prop], v), Infinity);\n}\n\nfunction max(ctx, datasetIndex, prop) {\n  const dataset = ctx.chart.data.datasets[datasetIndex];\n  return dataset.data.reduce((v, point) => Math.max(point[prop], v), -Infinity);\n}\n\n// </block:utils>\n\nvar actions = [\n  {\n    name: 'Randomize',\n    handler: function(chart) {\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.forEach(p => {\n          p.x = Utils.rand(MIN[i], MAX[i]);\n          p.y = Utils.rand(MIN[i], MAX[i]);\n        });\n      });\n\n      chart.update();\n    }\n  },\n  {\n    name: 'Add data',\n    handler: function(chart) {\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.push({x: Utils.rand(MIN[i], MAX[i]), y: Utils.rand(MIN[i], MAX[i])});\n      });\n      chart.update();\n    }\n  },\n  {\n    name: 'Remove data',\n    handler: function(chart) {\n      chart.data.labels.shift();\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.shift();\n      });\n\n      chart.update();\n    }\n  }\n];\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n"}})],1)}),[],!1,null,null,null);t.default=i.exports}}]);