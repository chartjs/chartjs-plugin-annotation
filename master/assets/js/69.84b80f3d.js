(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{386:function(n,t,a){"use strict";a.r(t);var e=a(4),o=Object(e.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("h1",{attrs:{id:"auto-scaling"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#auto-scaling"}},[this._v("#")]),this._v(" Auto scaling")]),this._v(" "),n("input",{staticStyle:{width:"100%"},attrs:{id:"update",type:"range",min:"46",max:"100",value:"100",step:"2"}}),this._v(" "),n("chart-editor",{attrs:{code:"// <block:setup:4>\nconst uniqueId = new Date().getTime();\n\nconst DATA_COUNT = 12;\nconst MIN = 0;\nconst MAX = 100;\n\nconst numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};\n\nconst data = {\n  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],\n  datasets: [{\n    data: Utils.numbers(numberCfg)\n  }]\n};\n// </block:setup>\n\n// <block:annotation:1>\nconst annotation = {\n  type: 'label',\n  backgroundColor: 'whiteSmoke',\n  borderColor: 'lightGray',\n  borderRadius: 6,\n  content: ['Annotation', 'to resize'],\n  drawTime: 'afterDraw',\n  borderWidth: (ctx) => autoScaling(ctx, 'borderWidth', 2),\n  font: (ctx) => autoScaling(ctx, 'font', 48),\n  padding: (ctx) => autoScaling(ctx, 'padding', 6),\n};\n// </block:annotation>\n\n/* <block:config:0> */\nconst config = {\n  type: 'line',\n  data,\n  options: {\n    _sampleId: uniqueId,\n    plugins: {\n      annotation: {\n        annotations: {\n          annotation\n        }\n      }\n    }\n  }\n};\n/* </block:config> */\n\n// <block:autoScaling:2>\nfunction autoScaling(ctx, option, origValue) {\n  const {chart} = ctx;\n  const {width, height} = chart.chartArea;\n  const hypo = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));\n  let size, value;\n  if (!ctx.size) {\n    ctx.size = size = hypo;\n    value = origValue;\n  } else {\n    size = ctx.size;\n    value = hypo / size * origValue;\n  }\n  if (option === 'font') {\n    return {size: value};\n  }\n  return value;\n}\n// </block:autoScaling>\n\n// <block:utils:3>\nlet originalArea;\ndocument.getElementById('update').addEventListener('input', update);\n\nfunction update() {\n  const ratio = +document.querySelector('input[type=range]').value / 100;\n  const chart = Object.values(Chart.instances).find(c => c.options._sampleId === uniqueId);\n  if (!originalArea) {\n    originalArea = chart.chartArea;\n  }\n  const w = originalArea.width * ratio;\n  const h = originalArea.height * ratio;\n  chart.resize(w, h);\n}\n// </block:utils>\n\nmodule.exports = {\n  config: config\n};\n"}})],1)}),[],!1,null,null,null);t.default=o.exports}}]);