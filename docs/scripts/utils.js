import {Chart} from 'chart.js';
import {valueOrDefault} from 'chart.js/helpers';

// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
let _seed = Date.now();

export function srand(seed) {
  _seed = seed;
}

export function rand(min, max) {
  min = valueOrDefault(min, 0);
  max = valueOrDefault(max, 0);
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

export function numbers(config) {
  var cfg = config || {};
  var min = valueOrDefault(cfg.min, 0);
  var max = valueOrDefault(cfg.max, 100);
  var from = valueOrDefault(cfg.from, []);
  var count = valueOrDefault(cfg.count, 8);
  var decimals = valueOrDefault(cfg.decimals, 8);
  var continuity = valueOrDefault(cfg.continuity, 1);
  var dfactor = Math.pow(10, decimals) || 0;
  var data = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + this.rand(min, max);
    if (this.rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

export function points(config) {
  const xs = this.numbers(config);
  const ys = this.numbers(config);
  return xs.map((x, i) => ({x, y: ys[i]}));
}

export function getImage() {
  const img = new Image();
  img.src = 'https://www.chartjs.org/chartjs-plugin-annotation/latest/favicon.png';
  return img;
}

let pieChart = null;

export function getChart() {
  if (pieChart) {
    return pieChart;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  canvas.style.visibility = 'hidden';
  document.body.appendChild(canvas);
  pieChart = createChart(canvas);
  return pieChart;
}

export function getSpiral() {
  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 150;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const ctx = canvas.getContext('2d');
  ctx.moveTo(centerX, centerY);
  ctx.beginPath();
  for (let i = 0; i < 720; i++) {
    const angle = 0.1 * i;
    const x = centerX + angle * Math.cos(angle);
    const y = centerX + angle * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#666";
  ctx.stroke();
  return canvas;
}

export function getHouse() {
  const canvas = document.createElement('canvas');
  canvas.width = 230;
  canvas.height = 210;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#666';
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 10;
  ctx.strokeRect(40, 90, 150, 110);
  ctx.fillRect(95, 140, 40, 60);
  ctx.beginPath();
  ctx.moveTo(15, 90);
  ctx.lineTo(115, 10);
  ctx.lineTo(215, 90);
  ctx.closePath();
  ctx.stroke();
  return canvas;
}

function createChart(canvas) {
  return new Chart(canvas, {
    type: 'pie',
    data: {
      labels: ['Bought', 'Sold', 'Rented'],
      datasets: [{
        data: [42, 33, 25],
        backgroundColor: ['#3366cc', '#dc3912', '#ff9900']
      }]
    },
    options: {
      responsive: false,
      animation: false,
      plugins: {
        version: false,
        legend: false,
        title: false,
        subtitle: false
      }
    }
  });
}
