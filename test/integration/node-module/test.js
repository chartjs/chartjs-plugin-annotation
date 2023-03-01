import {createCanvas} from '@napi-rs/canvas';
import {Chart, BarController, BarElement, CategoryScale, LinearScale} from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);
Chart.register(Annotation);

const canvas = createCanvas(300, 320);
const ctx = canvas.getContext('2d');

// Chart.js assumes ctx contains the canvas
ctx.canvas = canvas;

export const chart = new Chart(ctx, {
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

