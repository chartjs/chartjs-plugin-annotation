import Chart from 'chart.js/auto';
import plugin from '../../dist/chartjs-plugin-annotation.esm.js';

Chart.register(plugin);

Chart.register({
  id: 'version',
  afterDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('Chart.js v' + Chart.version + ' + chartjs-plugin-annotation v' + plugin.version, chart.chartArea.right, 0);
    ctx.restore();
  }
});

