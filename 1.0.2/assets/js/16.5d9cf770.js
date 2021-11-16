(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{452:function(t,e,a){"use strict";a.r(e);var n=a(18),o=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"point-annotations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#point-annotations"}},[t._v("#")]),t._v(" Point Annotations")]),t._v(" "),a("p",[t._v("Point annotations are used to mark points on the chart area. This can be useful for highlighting values that are of interest.")]),t._v(" "),a("chart-editor",{attrs:{code:"/* <block:options:0> */\nconst options = {\n  plugins: {\n    autocolors: false,\n    annotation: {\n      annotations: {\n        point1: {\n          type: 'point',\n          xValue: 1,\n          yValue: 60,\n          backgroundColor: 'rgba(255, 99, 132, 0.25)'\n        }\n      }\n    }\n  }\n};\n/* </block:options> */\n\n/* <block:config:1> */\nconst config = {\n  type: 'line',\n  data: {\n    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],\n    datasets: [{\n      label: 'My First Dataset',\n      data: [65, 59, 80, 81, 56, 55, 40],\n      fill: false,\n      borderColor: 'rgb(75, 192, 192)',\n      tension: 0.1\n    }]\n  },\n  options\n};\n/* </block:config> */\n\nmodule.exports = {\n  config\n};\n"}}),a("h2",{attrs:{id:"configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[t._v("#")]),t._v(" Configuration")]),t._v(" "),a("p",[t._v("The following options are available for ellipse annotations.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[a("a",{attrs:{href:"../options#scriptable-options"}},[t._v("Scriptable")])]),t._v(" "),a("th",[t._v("Default")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("a",{attrs:{href:"#general"}},[a("code",[t._v("display")])])]),t._v(" "),a("td",[a("code",[t._v("boolean")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("true")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#general"}},[a("code",[t._v("adjustScaleRange")])])]),t._v(" "),a("td",[a("code",[t._v("boolean")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("true")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#general"}},[a("code",[t._v("drawTime")])])]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("'afterDatasetsDraw'")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#general"}},[a("code",[t._v("xScaleID")])])]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("'x'")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#general"}},[a("code",[t._v("yScaleID")])])]),t._v(" "),a("td",[a("code",[t._v("string")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("'y'")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#general"}},[a("code",[t._v("xValue")])])]),t._v(" "),a("td",[a("code",[t._v("number")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("undefined")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#general"}},[a("code",[t._v("yValue")])])]),t._v(" "),a("td",[a("code",[t._v("number")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("undefined")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#general"}},[a("code",[t._v("radius")])])]),t._v(" "),a("td",[a("code",[t._v("number")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("10")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#styling"}},[a("code",[t._v("borderColor")])])]),t._v(" "),a("td",[a("a",{attrs:{href:"../options#color"}},[a("code",[t._v("Color")])])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("options.color")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#styling"}},[a("code",[t._v("borderWidth")])])]),t._v(" "),a("td",[a("code",[t._v("number")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("1")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#styling"}},[a("code",[t._v("borderDash")])])]),t._v(" "),a("td",[a("code",[t._v("number[]")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("[]")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#styling"}},[a("code",[t._v("borderDashOffset")])])]),t._v(" "),a("td",[a("code",[t._v("number")])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("0")])])]),t._v(" "),a("tr",[a("td",[a("a",{attrs:{href:"#styling"}},[a("code",[t._v("backgroundColor")])])]),t._v(" "),a("td",[a("a",{attrs:{href:"../options#color"}},[a("code",[t._v("Color")])])]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("Yes")]),t._v(" "),a("td",[a("code",[t._v("options.color")])])])])]),t._v(" "),a("h3",{attrs:{id:"general"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#general"}},[t._v("#")]),t._v(" General")]),t._v(" "),a("p",[t._v("If one of the axes does not match an axis in the chart, the ellipse will take the entire chart dimension. The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the ellipse is expanded out to the edges in the respective direction.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("display")])]),t._v(" "),a("td",[t._v("Whether or not this annotation is visible")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("adjustScaleRange")])]),t._v(" "),a("td",[t._v("Should the scale range be adjusted if this annotation is out of range")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("drawTime")])]),t._v(" "),a("td",[t._v("See "),a("a",{attrs:{href:"../options#draw-time"}},[t._v("drawTime")])])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("xScaleID")])]),t._v(" "),a("td",[t._v("ID of the X scale to bind onto, default is 'x'.")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("yScaleID")])]),t._v(" "),a("td",[t._v("ID of the Y scale to bind onto, default is 'y'.")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("xValue")])]),t._v(" "),a("td",[t._v("X coordinate of the point in units along the x axis.")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("yValue")])]),t._v(" "),a("td",[t._v("Y coordinate of the point in units along the y axis.")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("radius")])]),t._v(" "),a("td",[t._v("Size of the point in pixels")])])])]),t._v(" "),a("h3",{attrs:{id:"styling"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#styling"}},[t._v("#")]),t._v(" Styling")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("borderColor")])]),t._v(" "),a("td",[t._v("Stroke color")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("borderWidth")])]),t._v(" "),a("td",[t._v("Stroke width")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("borderDash")])]),t._v(" "),a("td",[t._v("Length and spacing of dashes. See "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN"),a("OutboundLink")],1),t._v(".")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("borderDashOffset")])]),t._v(" "),a("td",[t._v("Offset for line dashes. See "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN"),a("OutboundLink")],1),t._v(".")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("backgroundColor")])]),t._v(" "),a("td",[t._v("Fill color")])])])])],1)}),[],!1,null,null,null);e.default=o.exports}}]);