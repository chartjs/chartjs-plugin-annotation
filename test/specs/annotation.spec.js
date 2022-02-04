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

});
