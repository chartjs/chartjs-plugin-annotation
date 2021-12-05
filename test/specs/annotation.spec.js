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
});
