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
});
