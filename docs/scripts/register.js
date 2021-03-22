import {Chart, registerables} from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';
import plugin from '../../dist/chartjs-plugin-annotation.esm.js';

Chart.register(...registerables);
Chart.register(plugin, autocolors);
