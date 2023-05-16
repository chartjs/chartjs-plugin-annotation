const {createCanvas} = require('@napi-rs/canvas');
const {Chart, BarController, BarElement, CategoryScale, LinearScale} = require('chart.js');
const Annotation = require('chartjs-plugin-annotation');

Chart.register(BarController, BarElement, CategoryScale, LinearScale);
Chart.register(Annotation);

const canvas = createCanvas(300, 320);
const ctx = canvas.getContext('2d');

// Chart.js assumes ctx contains the canvas
ctx.canvas = canvas;

module.export = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  options: {
    plugins: {
      annotation: {
        clip: false,
        annotations: []
      }
    }
  },
  plugins: [Annotation]
});

