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

  describe('Annotation option resolution', function() {
    it('should resolve from plugin options', function() {
      const chart = acquireChart({
        type: 'line',
        options: {
          plugins: {
            annotation: {
              drawTime: 'fallback',
              annotations: {
                test: {
                  type: 'line'
                }
              }
            }
          }
        }
      });
      const state = window['chartjs-plugin-annotation']._getState(chart);
      const element = state.elements[0];
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
              test: {
                drawTime: 'invalid'
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
      const state = window['chartjs-plugin-annotation']._getState(chart);
      const element = state.elements[0];
      expect(element.options.drawTime).not.toBe('invalid');
    });

    // TODO: enable when desired option resolution can be configured in chart.js
    xit('should resolve to same options through chart options', function() {
      const chart = acquireChart({
        type: 'line',
        options: {
          plugins: {
            annotation: {
              test: {
                drawTime: 'invalid'
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
      const state = window['chartjs-plugin-annotation']._getState(chart);
      const element = state.elements[0];
      expect(element.options.drawTime).toBe(chart.options.plugins.annotation.annotations.test.drawTime);
    });
  });
});
