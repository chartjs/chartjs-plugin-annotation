import { Chart } from 'chart.js';
import Annotation from '../index';

Chart.register(Annotation);
Chart.unregister(Annotation);

const chart = new Chart('id', {
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
        annotations: [{
          type: 'line',
          label: {
            content: ['test', 'multiple']
          }
        }, {
          type: 'box',
          backgroundColor: 'red',
          borderColor: (ctx, options) => options.type === 'box' ? 'red' : 'green',
        }
        ]
      }
    }
  },
  plugins: [Annotation]
});

const boxBorderDash = new Chart('boxBorderDash', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 1.5,
            xMax: 3.5,
            yMin: 5,
            yMax: 10,
            backgroundColor: 'rgba(33, 101, 171, 0.5)',
            borderColor: 'rgb(33, 101, 171)',
            borderDash: [6, 6],
            borderWidth: 5,
          },
          box2: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'May',
            xMax: 'July',
            yMin: 11,
            yMax: 15,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderDash: [6, 6],
            borderWidth: 5,
          },
          box3: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: -0.5,
            xMax: 'May',
            yMin: 16,
            yMax: 20,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderDash: [6, 6],
            borderWidth: 5,
          }
        }
      }
    }
  }
});
const boxBorderRadius = new Chart('boxBorderRadius', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 1.5,
            xMax: 3.5,
            yMin: 5,
            yMax: 10,
            backgroundColor: 'rgba(33, 101, 171, 0.5)',
            borderColor: 'rgb(33, 101, 171)',
            borderRadius: { topLeft: 16, topRight: 8, bottomRight: 4 },
            borderWidth: 5,
          },
          box2: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'July',
            xMax: 'May',
            yMin: 11,
            yMax: 15,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderRadius: Infinity,
            borderWidth: 5,
          },
          box3: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 0,
            xMax: 'May',
            yMin: 20,
            yMax: 16,
            backgroundColor: 'rgba(171, 101, 33, 0.5)',
            borderColor: 'rgb(171, 101, 33)',
            borderRadius: 4,
            borderWidth: 5,
          }
        }
      }
    }
  }
});

const boxBorderWidth0 = new Chart('boxBorderWidth0', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 1.5,
            xMax: 3.5,
            yMin: 5,
            yMax: 10,
            backgroundColor: 'rgba(33, 101, 171, 0.5)',
            borderColor: 'red',
            borderWidth: 0,
          },
        }
      }
    }
  }
});
const boxCategoryindex = new Chart('boxCategoryindex', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 1.5,
            xMax: 3.5,
            yMin: 5,
            yMax: 10,
            backgroundColor: 'rgba(33, 101, 171, 0.5)',
            borderColor: 'rgb(33, 101, 171)',
            borderWidth: 1,
          },
          box2: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'May',
            xMax: 'July',
            yMin: 11,
            yMax: 15,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderWidth: 1,
          },
          box3: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: -0.5,
            xMax: 'May',
            yMin: 16,
            yMax: 20,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderWidth: 1,
          }
        }
      }
    }
  }
});
const boxLabel = new Chart('boxLabel', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 1.5,
            xMax: 3.5,
            yMin: 5,
            yMax: 10,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: 'This is a label',
            }
          },
          box2: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'May',
            xMax: 'July',
            yMin: 11,
            yMax: 15,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: 'This is a label',
              position: 'start'
            }
          },
          box3: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: -0.5,
            xMax: 'May',
            yMin: 16,
            yMax: 20,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: 'This is a label with different length',
              position: 'end'
            }
          },
          box4: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'June',
            xMax: 'July',
            yMin: 5,
            yMax: 9,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: 'This is the label',
              color: 'red',
              position: {
                x: 'start'
              }
            }
          }
        }
      }
    }
  }
});
const boxLabelMultiline = new Chart('boxLabelMultiline', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 1.5,
            xMax: 3.5,
            yMin: 5,
            yMax: 10,
            backgroundColor: 'rgba(178, 255, 102, 0.5)',
            borderColor: 'rgb(178, 255, 102)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: ['This is a label', 'but this is multiline'],
            }
          },
          box2: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'May',
            xMax: 'July',
            yMin: 11,
            yMax: 15,
            backgroundColor: 'rgba(178, 255, 102, 0.5)',
            borderColor: 'rgb(178, 255, 102)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: ['This is a label', 'but this is multiline'],
              position: 'start'
            }
          },
          box3: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: -0.5,
            xMax: 'May',
            yMin: 16,
            yMax: 20,
            backgroundColor: 'rgba(178, 255, 102, 0.5)',
            borderColor: 'rgb(178, 255, 102)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: ['This is a label', 'but this is multiline'],
              position: 'end'
            }
          },
          box4: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'June',
            xMax: 'July',
            yMin: 5,
            yMax: 9,
            backgroundColor: 'rgba(178, 255, 102, 0.5)',
            borderColor: 'rgb(178, 255, 102)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: (ctx) => ['This is a label', 'type:' + ctx.type],
              color: 'red',
              position: {
                x: 'start'
              }
            }
          }
        }
      }
    }
  }
});
const boxLabelPadding = new Chart('boxLabelPadding', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 1.5,
            xMax: 3.5,
            yMin: 5,
            yMax: 10,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: 'box1: This is a label',
              position: 'start',
              padding: 15
            }
          },
          box2: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'May',
            xMax: 'July',
            yMin: 11,
            yMax: 15,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: 'box2: This is a label',
              position: 'start',
              padding: { x: 20 }
            }
          },
          box3: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: -0.5,
            xMax: 'May',
            yMin: 16,
            yMax: 20,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: 'box3: This is a label with different length',
              position: 'end',
              padding: { y: 10 }
            }
          },
          box4: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'June',
            xMax: 'July',
            yMin: 5,
            yMax: 9,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132)',
            borderDash: [6, 6],
            borderWidth: 5,
            label: {
              enabled: true,
              content: 'box4: This is the label',
              color: 'red',
              position: {
                x: 'start',
                y: 'start'
              },
              padding() {
                return { left: 10, top: 5 };
              }
            }
          }
        }
      }
    }
  }
});
const boxMissingScale = new Chart('boxMissingScale', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box: {
            type: 'box',
            xScaleID: 'x',
            yScaleID: 'missing',
            xMin: 'February',
            xMax: 'May',
            yMin: 5,
            yMax: 18,
            backgroundColor: 'rgba(33, 101, 171, 0.5)',
            borderColor: 'rgb(33, 101, 171)',
            borderWidth: 0,
          },
        }
      }
    }
  }
});
const boxPartialrange = new Chart('boxPartialrange', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'line',
  options: {
    plugins: {
      annotation: {
        annotations: {
          annotation1: {
            type: 'box',
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderWidth: 3,
            borderColor: 'black',
            xMin: 'B',
            xMax: 'C',
            yMin: 20,
            yMax: 700,
          }
        }
      }
    },
  }
});
const boxScriptableOptions = new Chart('boxScriptableOptions', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 1.5;
            },
            xMax() {
              return 3.5;
            },
            yMin() {
              return 5;
            },
            yMax() {
              return 10;
            },
            backgroundColor() {
              return 'rgba(33, 101, 171, 0.5)';
            },
            borderColor() {
              return 'rgb(33, 101, 171)';
            },
            borderDash() {
              return [6, 6];
            },
            borderWidth() {
              return 5;
            },
          },
          box2: {
            type: 'box',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 'May';
            },
            xMax() {
              return 'July';
            },
            yMin() {
              return 11;
            },
            yMax() {
              return 15;
            },
            backgroundColor() {
              return 'rgba(101, 33, 171, 0.5)';
            },
            borderColor() {
              return 'rgb(101, 33, 171)';
            },
            borderDash() {
              return [6, 6];
            },
            borderWidth() {
              return 5;
            },
          },
          box3: {
            type: 'box',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return -0.5;
            },
            xMax() {
              return 'May';
            },
            yMin() {
              return 16;
            },
            yMax() {
              return 20;
            },
            backgroundColor() {
              return 'rgba(101, 33, 171, 0.5)';
            },
            borderColor() {
              return 'rgb(101, 33, 171)';
            },
            borderDash() {
              return [6, 6];
            },
            borderWidth() {
              return 5;
            },
          }
        }
      }
    }
  }
});
const ellipseBorderDash = new Chart('ellipseBorderDash', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'ellipse',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 1.5,
            xMax: 3.5,
            yMin: 5,
            yMax: 10,
            backgroundColor: 'rgba(33, 101, 171, 0.5)',
            borderColor: 'rgb(33, 101, 171)',
            borderDash: [6, 6],
            borderWidth: 5,
          },
          box2: {
            type: 'ellipse',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 'May',
            xMax: 'July',
            yMin: 11,
            yMax: 15,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderDash: [6, 6],
            borderWidth: 5,
          },
          box3: {
            type: 'ellipse',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: -0.5,
            xMax: 'May',
            yMin: 16,
            yMax: 20,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderDash: [6, 6],
            borderWidth: 5,
          }
        }
      }
    }
  }
});
const ellipsePartialrange = new Chart('ellipsePartialrange', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'line',
  options: {
    plugins: {
      annotation: {
        annotations: {
          annotation1: {
            type: 'ellipse',
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderWidth: 3,
            borderColor: 'black',
            xMin: 'B',
            xMax: 'C',
            yMin: 20,
            yMax: 700,
          }
        }
      }
    },
  }
});
const ellipseRotation = new Chart('ellipseRotation', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        annotations: {
          annotation1: {
            type: 'ellipse',
            backgroundColor: '#f00',
            borderColor: '#000',
            borderWidth: 1,
            rotation: -45,
            xMin: 0,
            xMax: 100,
            yMin: 40,
            yMax: 60,
          }
        }
      }
    },
  }
});
const ellipseScriptableOptions = new Chart('ellipseScriptableOptions', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          box1: {
            type: 'ellipse',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 1.5;
            },
            xMax() {
              return 3.5;
            },
            yMin() {
              return 5;
            },
            yMax() {
              return 10;
            },
            backgroundColor() {
              return 'rgba(33, 101, 171, 0.5)';
            },
            borderColor() {
              return 'rgb(33, 101, 171)';
            },
            borderDash() {
              return [6, 6];
            },
            borderWidth() {
              return 5;
            },
          },
          box2: {
            type: 'ellipse',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 'May';
            },
            xMax() {
              return 'July';
            },
            yMin() {
              return 11;
            },
            yMax() {
              return 15;
            },
            backgroundColor() {
              return 'rgba(101, 33, 171, 0.5)';
            },
            borderColor() {
              return 'rgb(101, 33, 171)';
            },
            borderDash() {
              return [6, 6];
            },
            borderWidth() {
              return 5;
            },
          },
          box3: {
            type: 'ellipse',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return -0.5;
            },
            xMax() {
              return 'May';
            },
            yMin() {
              return 16;
            },
            yMax() {
              return 20;
            },
            backgroundColor() {
              return 'rgba(101, 33, 171, 0.5)';
            },
            borderColor() {
              return 'rgb(101, 33, 171)';
            },
            borderDash() {
              return [6, 6];
            },
            borderWidth() {
              return 5;
            },
          }
        }
      }
    }
  }
});
const labelBorderDash = new Chart('labelBorderDash', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          text1: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 3.5,
            yValue: 10,
            backgroundColor: 'rgba(33, 101, 171, 0.5)',
            borderColor: 'rgb(33, 101, 171)',
            borderDash: [6, 6],
            borderWidth: 5,
            content: 'This is my text'
          },
          text2: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'February',
            yValue: 11,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderDash: [6, 6],
            borderWidth: 4,
            content: 'This is my text'
          },
          text3: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'July',
            yValue: 20,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderDash: [6, 6],
            borderWidth: 5,
            content: 'This is my text position: { x: end }',
            position: {
              x: 'end'
            }
          }
        }
      }
    }
  }
});
const labelBorderRadius = new Chart('labelBorderRadius', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          text1: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 3.5,
            yValue: 10,
            backgroundColor: 'rgb(245,245,245)',
            borderWidth: 5,
            borderRadius: { topLeft: 16, topRight: 8, bottomRight: 4 },
            content: 'This is my text'
          },
          text2: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'February',
            yValue: 11,
            backgroundColor: 'rgb(245,245,245)',
            borderDash: [6, 6],
            borderWidth: 4,
            borderRadius: Infinity,
            content: 'This is my text'
          },
          text3: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'July',
            yValue: 20,
            backgroundColor: 'rgb(245,245,245)',
            borderDash: [6, 6],
            borderWidth: 5,
            borderRadius: 4,
            content: ['This is my text', 'position: { x: end }'],
            position: {
              x: 'end'
            }
          }
        }
      }
    }
  }
});
const labelBoxNotVisible = new Chart('labelBoxNotVisible', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          text1: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'January',
            yValue: 20,
            backgroundColor: 'missing',
            borderWidth: 0,
            content: 'This is my text',
            position: {
              x: 'end'
            }
          },
          text3: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'May',
            yValue: 20,
            backgroundColor: 'rgba(250,250,250,0)',
            borderWidth: 0,
            content: 'This is my text',
            position: {
              x: 'start'
            }
          }
        }
      }
    }
  }
});
const labelContentMultiline = new Chart('labelContentMultiline', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          text1: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'January',
            yValue: 20,
            backgroundColor: 'transparent',
            borderWidth: 0,
            content: ['position: { x: start, y: center }, textAlign: start, xValue: January', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
            position: {
              x: 'start',
              y: 'center'
            },
            textAlign: 'start'
          },
          text2: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'April',
            yValue: 10,
            backgroundColor: 'transparent',
            borderWidth: 0,
            content: ['position: center, textAlign: center, xValue: April', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
          },
          text3: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'May',
            yValue: 15,
            backgroundColor: 'transparent',
            borderWidth: 0,
            content: ['position: { x: end }, xValue: May', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
            position: {
              x: 'end'
            }
          }
        }
      }
    }
  }
});
const labelPadding = new Chart('labelPadding', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          text1: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'January',
            yValue: 20,
            backgroundColor: 'transparent',
            borderWidth: 1,
            content: 'position: { x: start }, padding: 15',
            position: {
              x: 'start'
            },
            padding: 15
          },
          text2: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'February',
            yValue: 10,
            backgroundColor: 'transparent',
            borderWidth: 1,
            content: 'position: { x: start }, padding: {x: 15}',
            position: {
              x: 'start'
            },
            padding: { x: 15 }
          },
          text3: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'May',
            yValue: 15,
            backgroundColor: 'transparent',
            borderWidth: 1,
            content: 'position: { x: end }, padding: {y: 30}',
            position: {
              x: 'end'
            },
            padding: { y: 30 }
          },
          text4: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'February',
            yValue: 5,
            backgroundColor: 'transparent',
            borderWidth: 1,
            content: ['position: { x: end },', 'padding: {left: 40, top: 10, right: 5, bottom: 20}'],
            textAlign: 'right',
            position: 'start',
            padding() {
              return { left: 40, top: 10, right: 5, bottom: 20 };
            }
          }
        }
      }
    }
  }
});
const labelPositionHorizontal = new Chart('labelPositionHorizontal', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          text1: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'January',
            yValue: 20,
            backgroundColor: 'transparent',
            borderWidth: 0,
            content: 'position: { x: start }',
            position: {
              x: 'start'
            }
          },
          text2: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'February',
            yValue: 10,
            backgroundColor: 'transparent',
            borderWidth: 0,
            content: 'position: center'
          },
          text3: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'May',
            yValue: 20,
            backgroundColor: 'transparent',
            borderWidth: 0,
            content: 'position: { x: end }',
            position: {
              x: 'end'
            }
          }
        }
      }
    }
  }
});
const labelPositionVertical = new Chart('labelPositionVertical', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'line',
  options: {
    plugins: {
      annotation: {
        annotations: {
          text1: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'February',
            yValue: 20,
            backgroundColor: 'transparent',
            borderWidth: 0,
            content: 'position: undefined'
          },
          text2: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'April',
            yValue: 20,
            backgroundColor: 'transparent',
            borderWidth: 0,
            content: 'position: start',
            position: 'start'
          },
          text3: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'June',
            yValue: 20,
            backgroundColor: 'transparent',
            borderWidth: 0,
            content: 'position: end',
            position: 'end'
          }
        }
      }
    }
  }
});
const labelScriptableOptions = new Chart('labelScriptableOptions', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'bar',
  options: {
    plugins: {
      annotation: {
        annotations: {
          text1: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'January',
            yValue: 20,
            backgroundColor: () => 'transparent',
            borderWidth: () => 0,
            position() {
              return { x: 'start' };
            }
          },
          text2: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'April',
            yValue: 10,
            backgroundColor: () => 'transparent',
            borderWidth: () => 0,
          },
          text3: {
            type: 'label',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 'May',
            yValue: 15,
            backgroundColor: () => 'transparent',
            borderWidth: () => 0,
            position() {
              return { x: 'end' };
            }
          }
        }
      }
    }
  }
});
const lineAxisindex = new Chart('lineAxisindex', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'line',
  options: {
    plugins: {
      annotation: {
        annotations: {
          annotation1: {
            type: 'line',
            scaleID: 'y',
            borderWidth: 3,
            borderColor: 'black',
            value: (ctx) => {
              if (ctx.type === 'annotation') {
                const scale = ctx.chart.scales.y;
                if (scale.ticks && scale.ticks.length > 1) {
                  return scale.ticks[1].value;
                }
              }
              return 0;
            },
          }
        }
      }
    },
  }
});
const lineDirectionreverse = new Chart('lineDirectionreverse', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'line',
  options: {
    plugins: {
      annotation: {
        annotations: [
          {
            type: 'line',
            xMin: 3,
            xMax: 5,
            yMin: 11,
            yMax: 8,
            borderColor: 'blue'
          },
          {
            type: 'line',
            xMin: 5,
            xMax: 5,
            yMin: 8,
            yMax: 11,
            borderColor: 'purple'
          },
          {
            type: 'line',
            xMin: 5,
            xMax: 7,
            yMin: 8,
            yMax: 11,
            borderColor: 'red'
          }
        ]
      }
    },
  }
});
const lineDirection = new Chart('lineDirection', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'line',
  options: {
    plugins: {
      annotation: {
        annotations: [
          {
            type: 'line',
            xMin: 3,
            xMax: 5,
            yMin: 11,
            yMax: 8,
            borderColor: 'blue'
          },
          {
            type: 'line',
            xMin: 5,
            xMax: 5,
            yMin: 8,
            yMax: 11,
            borderColor: 'purple'
          },
          {
            type: 'line',
            xMin: 5,
            xMax: 7,
            yMin: 8,
            yMax: 11,
            borderColor: 'red'
          }
        ]
      }
    },
  }
});
const lineLabelborder = new Chart('lineLabelborder', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime: 'afterDatasetsDraw',
        annotations: {
          line1: {
            type: 'line',
            scaleID: 'y',
            value: 0,
            endValue: 80,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              borderColor: 'black',
              borderRadius: 10,
              borderWidth: 3,
              borderDash: [6, 6],
              content: 'dashed 3px black border',
              enabled: true
            },
          },
        }
      }
    }
  }
});
const lineLabelsScriptableOptions = new Chart('lineLabelsScriptableOptions', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime() {
          return 'afterDatasetsDraw';
        },
        annotations: {
          auto1: {
            type: 'line',
            scaleID() {
              return 'y';
            },
            value() {
              return 0;
            },
            endValue() {
              return 80;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation() {
                return 'auto';
              },
              position() {
                return 'start';
              },
              backgroundColor() {
                return 'red';
              },
              content() {
                return 'auto rotation';
              },
              enabled() {
                return true;
              },
            },
          },
          auto2: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 90;
            },
            yMin() {
              return 10;
            },
            xMax() {
              return 80;
            },
            yMax() {
              return 50;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation() {
                return 'auto';
              },
              backgroundColor() {
                return 'red';
              },
              content() {
                return 'auto rotation';
              },
              enabled() {
                return true;
              },
            },
          },
          auto3: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 30;
            },
            yMin() {
              return 80;
            },
            xMax() {
              return 60;
            },
            yMax() {
              return 85;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation() {
                return 'auto';
              },
              backgroundColor() {
                return 'red';
              },
              content() {
                return 'auto rotation';
              },
              enabled() {
                return true;
              },
            },
          },
          auto4: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 65;
            },
            yMin() {
              return 70;
            },
            xMax() {
              return 70;
            },
            yMax() {
              return 100;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation() {
                return 'auto';
              },
              backgroundColor() {
                return 'red';
              },
              content() {
                return 'auto rotation';
              },
              enabled() {
                return true;
              },
            },
          },
          man1: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 10;
            },
            yMin() {
              return 60;
            },
            xMax() {
              return 30;
            },
            yMax() {
              return 70;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation() {
                return 90;
              },
              backgroundColor() {
                return 'red';
              },
              content() {
                return 'rotated 90';
              },
              enabled() {
                return true;
              },
            },
          },
          man2: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 10;
            },
            yMin() {
              return 30;
            },
            xMax() {
              return 40;
            },
            yMax() {
              return 50;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation() {
                return -80;
              },
              backgroundColor() {
                return 'red';
              },
              content() {
                return 'rotated -80';
              },
              enabled() {
                return true;
              },
            },
          }
        }
      }
    }
  }
});
const lineLabeldrawTime = new Chart('lineLabeldrawTime', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime: 'beforeDraw',
        annotations: {
          left: {
            drawTime: 'afterDraw',
            type: 'line',
            scaleID: 'y',
            value: 25,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              position: 'start',
              backgroundColor: 'red',
              content: 'afterDraw/undefined',
              enabled: true
            },
          },
          hCenter: {
            type: 'line',
            scaleID: 'y',
            value: 50,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              drawTime: 'beforeDraw',
              position: 'center',
              backgroundColor: 'red',
              content: 'beforeDraw/afterDraw',
              enabled: true
            },
          },
          right: {
            drawTime: 'afterDraw',
            type: 'line',
            scaleID: 'y',
            value: 75,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              drawTime: 'beforeDraw',
              position: 'end',
              backgroundColor: 'black',
              content: 'afterDraw/beforeDraw',
              enabled: true
            },
          },
          top: {
            type: 'line',
            scaleID: 'x',
            value: 50,
            borderColor: 'blue',
            borderWidth: 5,
            label: {
              position: 'start',
              backgroundColor: 'red',
              content: 'fallback/fallback',
              enabled: true
            }
          },
          bottomRight: {
            type: 'line',
            scaleID: 'x',
            value: 85,
            borderColor: 'transparent',
            label: {
              position: 'end',
              backgroundColor: 'green',
              content: 'fallback = beforeDraw',
              enabled: true
            }
          }
        }
      }
    }
  }
});
const lineOutofrange = new Chart('lineOutofrange', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'line',
  options: {
    plugins: {
      annotation: {
        annotations: {
          annotation1: {
            type: 'line',
            scaleID: 'x',
            borderWidth: 3,
            borderColor: 'black',
            value: 'B',
            label: {
              backgroundColor: 'red',
              content: 'shold not be drawn',
              enabled: true
            }
          }
        }
      }
    },
  }
});
const linePadding = new Chart('linePadding', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime: 'afterDatasetsDraw',
        annotations: {
          auto1: {
            type: 'line',
            scaleID: 'y',
            value: 0,
            endValue: 80,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              position: 'start',
              backgroundColor: 'red',
              content: 'padding: 10',
              enabled: true,
              padding: 10
            },
          },
          auto2: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 90,
            yMin: 10,
            xMax: 80,
            yMax: 50,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'padding: { x: 10, y: 15 }',
              enabled: true,
              padding: { x: 10, y: 15 }
            },
          },
          auto3: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 30,
            yMin: 80,
            xMax: 60,
            yMax: 85,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'padding: { left: 10, top: 15, right: 3, bottom: 2 }',
              enabled: true,
              padding() {
                return { left: 10, top: 15, right: 3, bottom: 2 };
              }
            },
          }
        }
      }
    }
  }
});
const linePaddingXY = new Chart('linePaddingXY', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime: 'afterDatasetsDraw',
        annotations: {
          auto1: {
            type: 'line',
            scaleID: 'y',
            value: 0,
            endValue: 80,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              position: 'start',
              backgroundColor: 'red',
              content: 'xPadding: 20',
              enabled: true,
              xPadding: 20
            },
          },
          auto2: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 90,
            yMin: 10,
            xMax: 80,
            yMax: 50,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'xPadding: 20, yPadding: 15',
              enabled: true,
              xPadding: 20,
              yPadding: 15
            },
          },
          auto3: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 30,
            yMin: 80,
            xMax: 60,
            yMax: 85,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'yPadding: 15',
              enabled: true,
              yPadding() {
                return 15;
              },
            },
          }
        }
      }
    }
  }
});
const linePartialrange = new Chart('linePartialrange', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'line',
  options: {
    plugins: {
      annotation: {
        annotations: {
          annotation1: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            borderWidth: 3,
            borderColor: 'black',
            xMin: 'B',
            xMax: 'D',
            yMin: 0,
            yMax: 60,
          }
        }
      }
    },
  }
});
const linePosition = new Chart('linePosition', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        annotations: {
          left: {
            type: 'line',
            scaleID: 'y',
            value: 25,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              position: 'start',
              backgroundColor: 'black',
              content: 'start',
              enabled: true
            },
          },
          hCenter: {
            type: 'line',
            scaleID: 'y',
            value: 50,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              position: 'center',
              backgroundColor: 'black',
              content: 'center',
              enabled: true
            },
          },
          right: {
            type: 'line',
            scaleID: 'y',
            value: 75,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              position: 'end',
              backgroundColor: 'black',
              content: 'end',
              enabled: true
            },
          },
          top: {
            type: 'line',
            scaleID: 'x',
            value: 15,
            borderColor: 'red',
            borderWidth: 5,
            label: {
              position: 'start',
              backgroundColor: 'red',
              content: 'start',
              enabled: true
            }
          },
          vCenter: {
            type: 'line',
            scaleID: 'x',
            value: 25,
            borderColor: 'red',
            borderWidth: 5,
            label: {
              position: 'center',
              backgroundColor: 'red',
              content: 'center',
              enabled: true
            }
          },
          bottom: {
            type: 'line',
            scaleID: 'x',
            value: 35,
            borderColor: 'red',
            borderWidth: 5,
            label: {
              position: 'end',
              backgroundColor: 'red',
              content: 'end',
              enabled: true
            }
          }
        }
      }
    }
  }
});
const lineRotation = new Chart('lineRotation', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime: 'afterDatasetsDraw',
        annotations: {
          auto1: {
            type: 'line',
            scaleID: 'y',
            value: 0,
            endValue: 80,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              position: 'start',
              backgroundColor: 'red',
              content: 'auto rotation',
              enabled: true
            },
          },
          auto2: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 90,
            yMin: 10,
            xMax: 80,
            yMax: 50,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'auto rotation',
              enabled: true
            },
          },
          auto3: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 30,
            yMin: 80,
            xMax: 60,
            yMax: 85,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'auto rotation',
              enabled: true
            },
          },
          auto4: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 65,
            yMin: 70,
            xMax: 70,
            yMax: 100,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'auto rotation',
              enabled: true
            },
          },
          man1: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 10,
            yMin: 60,
            xMax: 30,
            yMax: 70,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: 90,
              backgroundColor: 'red',
              content: 'rotated 90',
              enabled: true
            },
          },
          man2: {
            type: 'line',
            xScaleID: 'x',
            yScaleID: 'y',
            xMin: 10,
            yMin: 30,
            xMax: 40,
            yMax: 50,
            borderColor: 'black',
            borderWidth: 5,
            label: {
              rotation: -80,
              backgroundColor: 'red',
              content: 'rotated -80',
              enabled: true
            },
          }
        }
      }
    }
  }
});
const lineScriptableOptions = new Chart('lineScriptableOptions', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime() {
          return 'afterDatasetsDraw';
        },
        annotations: {
          auto1: {
            type: 'line',
            scaleID() {
              return 'y';
            },
            value() {
              return 0;
            },
            endValue() {
              return 80;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation: 'auto',
              position: 'start',
              backgroundColor: 'red',
              content: 'auto rotation',
              enabled: true
            },
          },
          auto2: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 90;
            },
            yMin() {
              return 10;
            },
            xMax() {
              return 80;
            },
            yMax() {
              return 50;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'auto rotation',
              enabled: true
            },
          },
          auto3: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 30;
            },
            yMin() {
              return 80;
            },
            xMax() {
              return 60;
            },
            yMax() {
              return 85;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'auto rotation',
              enabled: true
            },
          },
          auto4: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 65;
            },
            yMin() {
              return 70;
            },
            xMax() {
              return 70;
            },
            yMax() {
              return 100;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation: 'auto',
              backgroundColor: 'red',
              content: 'auto rotation',
              enabled: true
            },
          },
          man1: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 10;
            },
            yMin() {
              return 60;
            },
            xMax() {
              return 30;
            },
            yMax() {
              return 70;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation: 90,
              backgroundColor: 'red',
              content: 'rotated 90',
              enabled: true
            },
          },
          man2: {
            type: 'line',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xMin() {
              return 10;
            },
            yMin() {
              return 30;
            },
            xMax() {
              return 40;
            },
            yMax() {
              return 50;
            },
            borderColor() {
              return 'black';
            },
            borderWidth() {
              return 5;
            },
            label: {
              rotation: -80,
              backgroundColor: 'red',
              content: 'rotated -80',
              enabled: true
            },
          }
        }
      }
    }
  }
});
const pointBasic = new Chart('pointBasic', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime: 'afterDraw',
        annotations: {
          point: {
            type: 'point',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 1,
            yValue: 1,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderWidth: 15,
            radius: 50
          }
        }
      }
    }
  }
});

const pointBorderDash = new Chart('pointBorderDash', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime: 'afterDraw',
        annotations: {
          point: {
            type: 'point',
            xScaleID: 'x',
            yScaleID: 'y',
            xValue: 1,
            yValue: 1,
            backgroundColor: 'rgba(101, 33, 171, 0.5)',
            borderColor: 'rgb(101, 33, 171)',
            borderWidth: 15,
            borderDash: [6, 6],
            radius: 50
          }
        }
      }
    }
  }
});

const pointScriptableOptions = new Chart('pointScriptableOptions', {
  data: {
    labels: [],
    datasets: [{
      data: []
    }]
  },
  type: 'scatter',
  options: {
    plugins: {
      annotation: {
        drawTime: 'afterDraw',
        annotations: {
          point: {
            type: 'point',
            xScaleID() {
              return 'x';
            },
            yScaleID() {
              return 'y';
            },
            xValue() {
              return 1;
            },
            yValue() {
              return 1;
            },
            backgroundColor() {
              return 'rgba(101, 33, 171, 0.5)';
            },
            borderColor() {
              return 'rgb(101, 33, 171)';
            },
            borderWidth() {
              return 15;
            },
            borderDash() {
              return [6, 6];
            },
            radius() {
              return 50;
            }
          }
        }
      }
    }
  }
});
