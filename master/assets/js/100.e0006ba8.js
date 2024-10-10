(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{527:function(n,t,a){"use strict";a.r(t);var e=a(4),o=Object(e.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("h1",{attrs:{id:"label-visibility"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#label-visibility"}},[this._v("#")]),this._v(" Label visibility")]),this._v(" "),n("chart-editor",{attrs:{code:"// <block:setup:4>\nconst DATA_COUNT = 8;\nconst MIN = 10;\nconst MAX = 100;\n\nUtils.srand(8);\n\nconst labels = [];\nfor (let i = 0; i < DATA_COUNT; ++i) {\n  labels.push('' + i);\n}\n\nconst numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};\n\nconst data = {\n  labels: labels,\n  datasets: [{\n    data: Utils.numbers(numberCfg)\n  }]\n};\n// </block:setup>\n\n// <block:annotation1:1>\nconst annotation1 = {\n  type: 'line',\n  borderColor: 'lightGreen',\n  borderWidth: 10,\n  label: {\n    display: false,\n    backgroundColor: 'green',\n    drawTime: 'afterDatasetsDraw',\n    content: (ctx) => ['Average of dataset', 'is: ' + average(ctx).toFixed(3)]\n  },\n  scaleID: 'y',\n  value: (ctx) => average(ctx),\n  // For simple property changes, you can directly modify the annotation\n  // element's properties then return true to force chart re-drawing.  This is faster.\n  enter({element}, event) {\n    element.label.options.display = true;\n    return true;\n  },\n  leave({element}, event) {\n    element.label.options.display = false;\n    return true;\n  }\n};\n// </block:annotation1>\n\n// <block:annotation2:2>\nconst annotation2 = {\n  type: 'line',\n  borderColor: 'lightBlue',\n  borderWidth: 10,\n  label: {\n    display: (ctx) => ctx.hovered,\n    backgroundColor: 'blue',\n    drawTime: 'afterDatasetsDraw',\n    content: (ctx) => ['Min of dataset', 'is: ' + min(ctx).toFixed(3)],\n    position: (ctx) => ctx.hoverPosition\n  },\n  scaleID: 'y',\n  value: (ctx) => min(ctx),\n  // For more complex dynamic properties, you can store values on the persistent\n  // context object then retrieve them via scriptable properties.  You'll have\n  // to call chart.update() to reprocess the chart.\n  enter(ctx, event) {\n    ctx.hovered = true;\n    ctx.hoverPosition = (event.x / ctx.chart.chartArea.width * 100) + '%';\n    ctx.chart.update();\n  },\n  leave(ctx, event) {\n    ctx.hovered = false;\n    ctx.chart.update();\n  }\n};\n// </block:annotation2>\n\n/* <block:config:0> */\nconst config = {\n  type: 'line',\n  data,\n  options: {\n    plugins: {\n      tooltip: {\n        display: false,\n      },\n      annotation: {\n        common: {\n          drawTime: 'beforeDatasetsDraw'\n        },\n        annotations: {\n          annotation1,\n          annotation2\n        }\n      }\n    }\n  }\n};\n/* </block:config> */\n\n// <block:utils:3>\nfunction average(ctx) {\n  const values = ctx.chart.data.datasets[0].data;\n  return values.reduce((a, b) => a + b, 0) / values.length;\n}\n\nfunction min(ctx) {\n  const values = ctx.chart.data.datasets[0].data;\n  return values.reduce((a, b) => Math.min(a, b), Infinity);\n}\n// </block:utils>\n\nconst actions = [\n  {\n    name: 'Randomize',\n    handler: function(chart) {\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));\n      });\n      chart.update();\n    }\n  },\n  {\n    name: 'Add data',\n    handler: function(chart) {\n      chart.data.labels.push(chart.data.labels.length);\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.push(Utils.rand(MIN, MAX));\n      });\n      chart.update();\n    }\n  },\n  {\n    name: 'Remove data',\n    handler: function(chart) {\n      chart.data.labels.shift();\n      chart.data.datasets.forEach(function(dataset, i) {\n        dataset.data.shift();\n      });\n      chart.update();\n    }\n  }\n];\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n"}})],1)}),[],!1,null,null,null);t.default=o.exports}}]);