# Usage

Using the annotation plugin is very simple. Once the plugin is [registered](./integration) annotation options provided to the chart will be used. In this simple example, we define a single box annotation for our chart.

```js chart-editor
/* <block:config:0> */
const config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            // Indicates the type of annotation
            type: 'box',
            xMin: 1,
            xMax: 2,
            yMin: 50,
            yMax: 70,
            backgroundColor: 'rgba(255, 99, 132, 0.25)'
          }
        }
      }
    }
  }
};
/* </block:config> */

module.exports = {
  config
};
```
