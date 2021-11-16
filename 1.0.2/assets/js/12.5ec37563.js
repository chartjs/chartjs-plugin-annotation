(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{447:function(t,e,a){"use strict";a.r(e);var n=a(18),o=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"options"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#options"}},[t._v("#")]),t._v(" Options")]),t._v(" "),a("h2",{attrs:{id:"color"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#color"}},[t._v("#")]),t._v(" Color")]),t._v(" "),a("p",[t._v("Any color supported by "),a("a",{attrs:{href:"https://www.chartjs.org/docs/master/general/colors",target:"_blank",rel:"noopener noreferrer"}},[t._v("chart.js"),a("OutboundLink")],1),t._v(" is supported by the annotation plugin.")]),t._v(" "),a("h2",{attrs:{id:"font"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#font"}},[t._v("#")]),t._v(" Font")]),t._v(" "),a("p",[t._v("Fonts use the same format as "),a("a",{attrs:{href:"https://www.chartjs.org/docs/master/general/fonts",target:"_blank",rel:"noopener noreferrer"}},[t._v("chart.js"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"scriptable-options"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scriptable-options"}},[t._v("#")]),t._v(" Scriptable Options")]),t._v(" "),a("p",[t._v("As with most options in chart.js, the annotation plugin options are scriptable. This means that a function can be passed which returns the value as needed. In the example below, the annotation is hidden when the screen is less than 1000px wide.\nThe function receives 2 arguments, first is the "),a("a",{attrs:{href:"#option-context"}},[t._v("option context")]),t._v(" representing contextual information. An options resolver is passed as second argument, which can be used to access the options that were originally passed in to configure the annotation element.")]),t._v(" "),a("chart-editor",{attrs:{code:"/* <block:options:0> */\nconst options = {\n  plugins: {\n    autocolors: false,\n    annotation: {\n      annotations: {\n        box1: {\n          drawTime: 'afterDatasetsDraw',\n          display: (context, opts) => {\n            const body = document.querySelector('body');\n            const rect = body.getBoundingClientRect();\n            return rect.width >= 1000;\n          },\n          type: 'box',\n          xMin: 1,\n          xMax: 2,\n          yMin: 50,\n          yMax: 70,\n          backgroundColor: 'rgba(255, 99, 132, 0.5)'\n        }\n      }\n    }\n  }\n};\n/* </block:options> */\n\n/* <block:config:1> */\nconst config = {\n  type: 'line',\n  data: {\n    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],\n    datasets: [{\n      label: 'My First Dataset',\n      data: [65, 59, 80, 81, 56, 55, 40],\n      fill: false,\n      borderColor: 'rgb(75, 192, 192)',\n      tension: 0.1\n    }]\n  },\n  options\n};\n/* </block:config> */\n\nmodule.exports = {\n  config\n};\n"}}),a("h2",{attrs:{id:"draw-time"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#draw-time"}},[t._v("#")]),t._v(" Draw Time")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("drawTime")]),t._v(" option for an annotation determines where in the chart lifecycle the drawing occurs. Four potential options are available:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Option")]),t._v(" "),a("th",[t._v("Notes")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("'beforeDraw'")])]),t._v(" "),a("td",[t._v("Occurs before any drawing takes place")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("'beforeDatasetsDraw'")])]),t._v(" "),a("td",[t._v("Occurs after drawing of axes, but before datasets")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("'afterDatasetsDraw'")])]),t._v(" "),a("td",[t._v("Occurs after drawing of datasets but before items such as the tooltip")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("'afterDraw'")])]),t._v(" "),a("td",[t._v("After other drawing is completed.")])])])]),t._v(" "),a("h2",{attrs:{id:"option-context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#option-context"}},[t._v("#")]),t._v(" Option Context")]),t._v(" "),a("p",[t._v("The option context is used to give contextual information when resolving options and only applies to scriptable options. The object is preserved, so it can be used to store and pass information between calls / options.")]),t._v(" "),a("p",[t._v("There are 2 levels of option context objects:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("chart")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("annotation")])])])])]),t._v(" "),a("p",[t._v("The context object contains the following properties:")]),t._v(" "),a("h3",{attrs:{id:"chart"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#chart"}},[t._v("#")]),t._v(" chart")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("chart")]),t._v(": the associated chart")]),t._v(" "),a("li",[a("code",[t._v("type")]),t._v(": "),a("code",[t._v("'chart'")])])]),t._v(" "),a("p",[t._v("The "),a("a",{attrs:{href:"#chart"}},[t._v("chart")]),t._v(" option context is provided by Chart.js. It is passed to scriptable options when resolving annotation "),a("code",[t._v("id")]),t._v(", "),a("code",[t._v("type")]),t._v(" and "),a("code",[t._v("drawTime")]),t._v(" or adjusting scale ranges in "),a("code",[t._v("afterDataLimits")]),t._v(" hook. The options resolved at that time are "),a("code",[t._v("scaleID")]),t._v(", "),a("code",[t._v("xScaleID")]),t._v(", "),a("code",[t._v("yScaleID")]),t._v(", "),a("code",[t._v("value")]),t._v(", "),a("code",[t._v("endValue")]),t._v(", "),a("code",[t._v("xMin")]),t._v(", "),a("code",[t._v("xMax")]),t._v(", "),a("code",[t._v("yMin")]),t._v(", "),a("code",[t._v("yMax")]),t._v(", "),a("code",[t._v("xValue")]),t._v(" and "),a("code",[t._v("yValue")]),t._v(".")]),t._v(" "),a("h3",{attrs:{id:"annotation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#annotation"}},[t._v("#")]),t._v(" annotation")]),t._v(" "),a("p",[t._v("In addition to "),a("a",{attrs:{href:"#chart"}},[t._v("chart")])]),t._v(" "),a("ul",[a("li",[a("code",[t._v("id")]),t._v(": the annotation id")]),t._v(" "),a("li",[a("code",[t._v("element")]),t._v(": the annotation element")]),t._v(" "),a("li",[a("code",[t._v("type")]),t._v(": "),a("code",[t._v("'annotation'")])])]),t._v(" "),a("p",[t._v("The "),a("a",{attrs:{href:"#annotation"}},[t._v("annotation")]),t._v(" option context is passed to scriptable options in all other cases, except when resolving "),a("code",[t._v("id")]),t._v(", "),a("code",[t._v("type")]),t._v(" or adjusting scale ranges. The same values resolved in "),a("code",[t._v("afterDataLimits")]),t._v(" with "),a("a",{attrs:{href:"#chart"}},[t._v("chart")]),t._v(" context are again evaluated in "),a("code",[t._v("afterUpdate")]),t._v(" with "),a("a",{attrs:{href:"#annotation"}},[t._v("annotation")]),t._v(" context.")]),t._v(" "),a("p",[t._v("Note that the annotation element may be undefined or partially uninitialized, since scriptable options may be invoked during the initial chart display, before everything's been resolved and initialized.")])],1)}),[],!1,null,null,null);e.default=o.exports}}]);