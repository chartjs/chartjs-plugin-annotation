---
title: Integration
---

**`chartjs-plugin-annotation`** can be integrated with plain JavaScript or with different module loaders. The examples below show to load the plugin in different systems.

## Script Tag

```html
<script src="path/to/chartjs/dist/chart.min.js"></script>
<script src="path/to/chartjs-plugin-annotation/dist/chartjs-plugin-annotation.min.js"></script>
<script>
    var myChart = new Chart(ctx, {...});
</script>
```

## Bundlers (Webpack, Rollup, etc.)

```javascript
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);
```
