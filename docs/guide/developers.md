# Developers

## Access to the annotation elements

The annotation plugin uses Chart.js elements to draw the annotation requested by the user. The following APIs allows the user to get the created annotation elements to use in callbacks or for other purposes.
The APIs are available in the annotation plugin instance.

#### Script Tag

```html
<script>
  // get annotation plugin instance
  const annotationPlugin = window['chartjs-plugin-annotation'];
</script>
```

#### Bundlers (Webpack, Rollup, etc.)

```javascript
// get annotation plugin instance
import annotationPlugin from 'chartjs-plugin-annotation';
```

### `.getAnnotations(chart: Chart): AnnotationElement[]`

It provides all annotation elements configured by the plugin options, even if the annotations are not visible.

```javascript
const myLineChart = new Chart(ctx, config);
// get all annotation elements
const elements = annotationPlugin.getAnnotations(myLineChart);
```
 