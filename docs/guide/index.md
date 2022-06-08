# Getting Started

:::danger

This plugin needs to be registered. It does not function as inline plugin (see below).

:::

An annotation plugin for Chart.js >= 3.0.0

This plugin draws lines, boxes, labels, points, polygons and ellipses on the chart area. Annotations work with line, bar, scatter and bubble charts that use linear, logarithmic, time, or category scales. Annotations will not work on any chart that does not have exactly two axes, including pie, radar, and polar area charts.

![Banner](./banner.png)

## Installation

```bash
> npm install chartjs-plugin-annotation
```

::: tip Important Note

For Chart.js 2.4.0 to 2.9.x support, use [version 0.5.7 of this plugin](https://github.com/chartjs/chartjs-plugin-annotation/releases/tag/v0.5.7)
Documentation for v0.5.7 can be found on [GitHub](https://github.com/chartjs/chartjs-plugin-annotation/blob/1ab782afce943456f958cac33f67edc5d6eab278/README.md).

:::


## Usage

In order to use the plugin, you need to import an register it:

### In React

```
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);
```

### Examples

#### In React + Typescript

Below is a fully functional example of a bar graph showing a horizontal line.

```
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

export const MyChart: React.FC = () => {
  const options2 = {
    scales: {
      y: {} // <- "y" will be used as "scaleID" in annotations
    }
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: [
          {
            id: 'a-line-1',
            type: 'line' as const, // important, otherwise typescript complains
            mode: 'horizontal',
            scaleID: 'y',
            value: 1.0,
            borderColor: 'red',
            borderWidth: 4,
            label: {
              enabled: true,
              content: 'Test label',
            },
          },
        ],
      },
    },
  };

   const data2 = {
    labels:   [ 'a', 'b'],
    datasets: [ { data: [1, 2] } ],
   };

   return (<Bar options={options2} data={data2} height={150} />
   );
};
```

