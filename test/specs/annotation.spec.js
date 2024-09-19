describe('Annotation plugin', function() {
  it('should emit console warning when unknown element type is used', function() {
    const origWarn = console.warn;
    console.warn = jasmine.createSpy('warn');

    acquireChart({
      type: 'line',
      options: {
        plugins: {
          annotation: {
            annotations: [{
              id: 'test',
              type: 'invalid'
            }]
          }
        }
      }
    });

    expect(console.warn).toHaveBeenCalledWith('Unknown annotation type: \'invalid\', defaulting to \'line\'');

    acquireChart({
      type: 'line',
      options: {
        plugins: {
          annotation: {
            annotations: {
              test: {
                type: 'invalid2'
              }
            }
          }
        }
      }
    });

    expect(console.warn).toHaveBeenCalledWith('Unknown annotation type: \'invalid2\', defaulting to \'line\'');

    console.warn = origWarn;
  });

  it('should emit console warning when unknown scale id is used', function() {
    const origWarn = console.warn;
    console.warn = jasmine.createSpy('warn');

    acquireChart({
      type: 'line',
      options: {
        plugins: {
          annotation: {
            annotations: [{
              id: 'test',
              type: 'box',
              xScaleID: 'invalid',
              xMin: 8
            }]
          }
        }
      }
    });

    expect(console.warn).toHaveBeenCalledWith('No scale found with id \'invalid\' for annotation \'test\'');

    acquireChart({
      type: 'line',
      options: {
        plugins: {
          annotation: {
            annotations: [{
              id: 'test',
              type: 'line',
              scaleID: 'invalid',
            }]
          }
        }
      }
    });

    expect(console.warn).toHaveBeenCalledWith('No scale found with id \'invalid\' for annotation \'test\'');

    console.warn = origWarn;
  });

  it('should not emit console warning when scale id is unknown or missing', function() {
    const origWarn = console.warn;
    console.warn = jasmine.createSpy('warn');

    acquireChart({
      type: 'line',
      options: {
        plugins: {
          annotation: {
            annotations: [{
              id: 'test',
              type: 'box',
              xScaleID: 'invalid',
              yScaleID: 'invalid'
            }]
          }
        }
      }
    });

    expect(console.warn.calls.count()).toBe(0);

    acquireChart({
      type: 'line',
      data: {
        datasets: [{
          data: [40, 35, 79, 3, 55, 88, 36],
          yScaleID: 'y1'
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: 6
          },
          y1: {
            type: 'linear',
            min: 0,
            max: 100
          }
        },
        plugins: {
          annotation: {
            annotations: [{
              id: 'test',
              type: 'line',
              xMin: 1,
              xMax: 1
            }]
          }
        }
      }
    });

    expect(console.warn.calls.count()).toBe(0);

    console.warn = origWarn;
  });

  it('should return the right amount of annotations elements', function() {
    const types = ['box', 'ellipse', 'label', 'line', 'point', 'polygon'];
    const annotations = types.map(function(type) {
      return {
        type,
        display: () => type.startsWith('l'),
        xMin: 2,
        yMin: 2,
        xMax: 8,
        yMax: 8
      };
    });

    const chart = acquireChart({
      type: 'line',
      options: {
        plugins: {
          annotation: {
            annotations
          }
        }
      }
    });

    expect(window.getAnnotationElements(chart).length).toBe(types.length);
    expect(window.getAnnotationElements(undefined).length).toBe(0);
  });

  describe('Annotation option resolution', function() {
    it('should resolve from plugin common options', function() {
      const chart = acquireChart({
        type: 'line',
        options: {
          plugins: {
            annotation: {
              common: {
                drawTime: 'fallback',
              },
              annotations: {
                test: {
                  type: 'line'
                }
              }
            }
          }
        }
      });
      const element = window.getAnnotationElements(chart)[0];
      expect(element.options.drawTime).toBe('fallback');
    });

    it('should not resolve from same sub key in plugin options', function() {
      // https://github.com/chartjs/chartjs-plugin-annotation/issues/625
      // https://github.com/chartjs/chartjs-plugin-annotation/pull/626#issuecomment-1012960850
      const chart = acquireChart({
        type: 'line',
        options: {
          plugins: {
            annotation: {
              label: {
                drawTime: 'this should not be read'
              },
              annotations: {
                label: {
                  type: 'line'
                }
              }
            }
          }
        }
      });
      const element = window.getAnnotationElements(chart)[0];
      expect(element.options.drawTime).toBe('afterDatasetsDraw');
    });

    it('should resolve to same options through chart options', function() {
      const chart = acquireChart({
        type: 'line',
        options: {
          plugins: {
            annotation: {
              label: {
                drawTime: 'this should not be read'
              },
              annotations: {
                label: {
                  type: 'line'
                }
              }
            }
          }
        }
      });
      const element = window.getAnnotationElements(chart)[0];
      expect(element.options.drawTime).toBe(chart.options.plugins.annotation.annotations.label.drawTime);
    });
  });

  describe('context', function() {
    it('should contain the loaded elements', function() {
      const counts = [];
      const annotations = [];
      for (let i = 0; i < 5; i++) {
        annotations.push({
          type: 'label',
          content: 'test',
          display(context) {
            expect(context.elements.length).toBe(i);
            counts.push(i);
          }
        });
      }
      acquireChart({
        type: 'line',
        options: {
          plugins: {
            annotation: {
              annotations
            }
          }
        }
      });
      expect(counts).toEqual([0, 1, 2, 3, 4]);
    });
    it('should contain the loaded elements after update', function() {
      const counts = [];
      const annotations = [];
      for (let i = 0; i < 5; i++) {
        annotations.push({
          type: 'label',
          content: 'test',
          display(context) {
            expect(context.elements.length).toBe(i);
            counts.push(i);
          }
        });
      }
      const chart = acquireChart({
        type: 'line',
        options: {
          plugins: {
            annotation: {
              annotations
            }
          }
        }
      });
      counts.splice(0, counts.length);
      chart.update();
      expect(counts).toEqual([0, 1, 2, 3, 4]);
    });

    it('should contain the loaded elements after reducing annotations and chart update', function() {
      const counts = [];
      const annotations = [];
      for (let i = 0; i < 5; i++) {
        annotations.push({
          type: 'label',
          content: 'test',
          display(context) {
            const check = context.chart.options.plugins.annotation.annotations.length < 5;
            if (check) {
              expect(context.elements.length).toBe(i - 2);
              counts.push(i);
            }
          }
        });
      }
      const chart = acquireChart({
        type: 'line',
        options: {
          plugins: {
            annotation: {
              annotations
            }
          }
        }
      });
      counts.splice(0, counts.length);
      chart.update();
      counts.splice(0, counts.length);
      chart.options.plugins.annotation.annotations = annotations.slice(2);
      chart.update();
      expect(counts).toEqual([2, 3, 4]);
    });

  });
});
