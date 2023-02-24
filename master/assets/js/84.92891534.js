(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{401:function(n,t,a){"use strict";a.r(t);var o=a(4),e=Object(o.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("h1",{attrs:{id:"outside-of-chart"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#outside-of-chart"}},[this._v("#")]),this._v(" Outside of chart")]),this._v(" "),n("chart-editor",{attrs:{code:"// <block:setup:2>\nconst DATA_COUNT = 8;\nconst MIN = 10;\nconst MAX = 100;\n\nUtils.srand(8);\n\nconst labels = [];\nfor (let i = 0; i < DATA_COUNT; ++i) {\n  labels.push('' + i);\n}\n\nconst numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};\n\nconst data = {\n  labels: labels,\n  datasets: [{\n    data: Utils.numbers(numberCfg)\n  }]\n};\n// </block:setup>\n\n// <block:annotation:1>\nconst annotation = {\n  type: 'line',\n  borderColor: 'black',\n  borderWidth: 3,\n  scaleID: 'y',\n  value: 55,\n  beforeDraw: drawExtraLine\n};\n// </block:annotation>\n\n// <block:utils:3>\nfunction drawExtraLine(context) {\n  const ctx = context.chart.ctx;\n  const width = context.chart.canvas.width;\n  const {x, y, x2, y2, options} = context.element;\n  ctx.save();\n  ctx.lineWidth = options.borderWidth;\n  ctx.strokeStyle = options.borderColor;\n  ctx.setLineDash([6, 6]);\n  ctx.lineDashOffset = options.borderDashOffset;\n  ctx.beginPath();\n  ctx.moveTo(0, y);\n  ctx.lineTo(x, y);\n  ctx.moveTo(x2, y2);\n  ctx.lineTo(width, y);\n  ctx.stroke();\n  ctx.restore();\n  return true;\n}\n// </block:utils>\n\n/* <block:config:0> */\nconst config = {\n  type: 'line',\n  data,\n  options: {\n    layout: {\n      padding: {\n        right: 50\n      }\n    },\n    scales: {\n      y: {\n        stacked: true\n      }\n    },\n    plugins: {\n      annotation: {\n        clip: false,\n        annotations: {\n          annotation\n        }\n      }\n    }\n  }\n};\n/* </block:config> */\n\nconst actions = [\n  {\n    name: 'Randomize',\n    handler: function(chart) {\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));\n      });\n      chart.update();\n    }\n  },\n  {\n    name: 'Add data',\n    handler: function(chart) {\n      chart.data.labels.push(chart.data.labels.length);\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.push(Utils.rand(MIN, MAX));\n      });\n      chart.update();\n    }\n  },\n  {\n    name: 'Remove data',\n    handler: function(chart) {\n      chart.data.labels.shift();\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.shift();\n      });\n      chart.update();\n    }\n  }\n];\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n"}})],1)}),[],!1,null,null,null);t.default=e.exports}}]);