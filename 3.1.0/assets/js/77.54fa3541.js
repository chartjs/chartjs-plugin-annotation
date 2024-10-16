(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{504:function(n,t,e){"use strict";e.r(t);var a=e(4),l=Object(a.a)({},(function(){var n=this._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[n("h1",{attrs:{id:"cartesian-plane"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#cartesian-plane"}},[this._v("#")]),this._v(" Cartesian plane")]),this._v(" "),n("chart-editor",{attrs:{code:"// <block:setup:5>\nlet rect;\nconst MIN = -10;\nconst MAX = 10;\n// </block:setup>\n\n// <block:axes:1>\nconst yAxis = {\n  type: 'line',\n  value: 0,\n  scaleID: 'x',\n  borderColor: 'lightGray',\n  afterDraw({chart, element}) {\n    const scale = chart.scales.y;\n    const labelItems = scale.getLabelItems().filter((item) => Number.isInteger(parseFloat(item.label)));\n    drawTicks(chart, scale, {\n      labelItems,\n      align: 'right',\n      xy: (translation) => ({x: element.x - scale.options.ticks.padding, y: translation[1]})\n    });\n  }\n};\nconst xAxis = {\n  type: 'line',\n  value: 0,\n  scaleID: 'y',\n  borderColor: 'lightGray',\n  afterDraw({chart, element}) {\n    const scale = chart.scales.x;\n    const labelItems = scale.getLabelItems().filter((item) => Number.isInteger(parseFloat(item.label)) && parseFloat(item.label) !== 0);\n    drawTicks(chart, scale, {\n      labelItems,\n      baseline: 'top',\n      xy: (translation) => ({x: translation[0], y: element.y2 + scale.options.ticks.padding})\n    });\n  }\n};\n// </block:axes>\n\n// <block:rectangle:2>\nconst box = {\n  type: 'box',\n  display: () => !!rect,\n  backgroundColor: 'rgba(255, 174, 201, 0.2)',\n  borderColor: 'red',\n  borderDash: [4, 4],\n  xMin: () => rect ? rect.left : undefined,\n  xMax: () => rect ? rect.right : undefined,\n  yMin: () => rect ? rect.bottom : undefined,\n  yMax: () => rect ? rect.top : undefined,\n  z: -1\n};\nconst A = {\n  type: 'label',\n  content: 'A',\n  position: {\n    x: 'end',\n    y: 'end'\n  },\n  xValue: () => rect ? rect.left : undefined,\n  yValue: () => rect ? rect.top : undefined\n};\nconst B = {\n  type: 'label',\n  content: 'B',\n  position: {\n    x: 'start',\n    y: 'end'\n  },\n  xValue: () => rect ? rect.right : undefined,\n  yValue: () => rect ? rect.top : undefined\n};\nconst C = {\n  type: 'label',\n  content: 'C',\n  position: {\n    x: 'end',\n    y: 'start'\n  },\n  xValue: () => rect ? rect.left : undefined,\n  yValue: () => rect ? rect.bottom : undefined\n};\nconst D = {\n  type: 'label',\n  content: 'D',\n  position: {\n    x: 'start',\n    y: 'start'\n  },\n  xValue: () => rect ? rect.right : undefined,\n  yValue: () => rect ? rect.bottom : undefined\n};\n// </block:rectangle>\n\n// <block:summary:3>\nconst summary = {\n  type: 'label',\n  display: () => !!rect,\n  drawTime: 'afterDraw',\n  backgroundColor: 'white',\n  borderColor: 'silver',\n  borderWidth: 1,\n  borderRadius: 6,\n  content() {\n    if (rect) {\n      const result = [];\n      result.push('A: (' + rect.left.toFixed(2) + ', ' + rect.top.toFixed(2) + ')');\n      result.push('B: (' + rect.right.toFixed(2) + ', ' + rect.top.toFixed(2) + ')');\n      result.push('C: (' + rect.left.toFixed(2) + ', ' + rect.bottom.toFixed(2) + ')');\n      result.push('D: (' + rect.right.toFixed(2) + ', ' + rect.bottom.toFixed(2) + ')');\n      const AB = Math.abs(rect.right - rect.left);\n      const AC = Math.abs(rect.bottom - rect.top);\n      result.push('AB = CD = ' + AB.toFixed(2));\n      result.push('AC = BD = ' + AC.toFixed(2));\n      result.push('AD = BC = ' + Math.sqrt(Math.pow(AB, 2) + Math.pow(AC, 2)).toFixed(2));\n      result.push('Perimeter = ' + ((AB + AC) * 2).toFixed(2));\n      result.push('Area = ' + (AB * AC).toFixed(2));\n      return result;\n    }\n  },\n  font: {\n    size: 12,\n    family: 'Courier'\n  },\n  padding: 5,\n  position: {\n    x: () => rect && rect.left < 0 ? 'end' : 'start',\n    y: () => rect && rect.top <= 0 ? 'start' : 'end'\n  },\n  textAlign: () => rect && rect.left < 0 ? 'right' : 'left',\n  xValue: () => rect && rect.left < 0 ? MAX : MIN,\n  yValue: () => rect && rect.top <= 0 ? MAX : MIN\n};\n// </block:box>\n\n// <block:utils:4>\nfunction calculateBox(e, chart) {\n  const xValue = chart.scales.x.getValueForPixel(e.x);\n  const yValue = chart.scales.y.getValueForPixel(e.y);\n  return {\n    left: xValue > 0 ? 0 : xValue,\n    right: xValue > 0 ? xValue : 0,\n    top: yValue > 0 ? yValue : 0,\n    bottom: yValue > 0 ? 0 : yValue\n  };\n}\n\nfunction drawTicks(chart, scale, {labelItems, align, baseline, xy}) {\n  const ctx = chart.ctx;\n  ctx.save();\n  ctx.beginPath();\n  for (const item of labelItems) {\n    const {font, label, options} = item;\n    const {textAlign, textBaseline, translation} = options;\n    const point = xy(translation);\n    ctx.beginPath();\n    ctx.font = font.string;\n    ctx.textAlign = align || textAlign;\n    ctx.textBaseline = baseline || textBaseline;\n    ctx.fillStyle = 'silver';\n    ctx.fillText(parseFloat(label).toFixed(0), point.x, point.y);\n    ctx.fill();\n  }\n  ctx.restore();\n}\n// </block:utils>\n\n/* <block:config:0> */\nconst config = {\n  type: 'scatter',\n  options: {\n    layout: {\n      padding: {\n        top: 20,\n        left: 20,\n        right: 20\n      }\n    },\n    onClick(e, elements, chart) {\n      rect = calculateBox(e, chart);\n      chart.update();\n    },\n    elements: {\n      labelAnnotation: {\n        display: () => !!rect,\n        borderWidth: 0,\n        padding: 0,\n        font: {\n          size: 20,\n          style: 'oblique'\n        }\n      }\n    },\n    scales: {\n      x: {\n        min: MIN,\n        max: MAX,\n        grid: {\n          drawTicks: false\n        },\n        ticks: {\n          display: false,\n          stepSize: 0.5\n        }\n      },\n      y: {\n        min: MIN,\n        max: MAX,\n        grid: {\n          drawTicks: false\n        },\n        ticks: {\n          display: false,\n          stepSize: 0.5\n        }\n      }\n    },\n    plugins: {\n      annotation: {\n        clip: false,\n        common: {\n          drawTime: 'beforeDraw'\n        },\n        annotations: {\n          xAxis,\n          yAxis,\n          box,\n          A, B, C, D,\n          summary\n        }\n      },\n      title: {\n        display: true,\n        text: 'Click on the chart to set the point to build the rectangle',\n        position: 'bottom',\n        padding: {\n          top: 16,\n          bottom: 0\n        }\n      }\n    }\n  }\n};\n/* </block:config> */\n\nconst actions = [\n  {\n    name: 'Reset',\n    handler: function(chart) {\n      rect = undefined;\n      chart.update();\n    }\n  }\n];\n\nmodule.exports = {\n  actions: actions,\n  config: config,\n};\n"}})],1)}),[],!1,null,null,null);t.default=l.exports}}]);