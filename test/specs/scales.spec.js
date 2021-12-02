describe('scale options', function() {
  ['scaleID', 'xScaleID', 'yScaleID'].forEach(function(key) {
    it(`should throw an exception when ${key} is not a defined scale`, function() {
      function create() {
        return acquireChart({
          type: 'line',
          data: {
            datasets: [{
              data: [1, 2, 3]
            }]
          },
          options: {
            plugins: {
              annotation: {
                annotations: {
                  test: {
                    type: 'line',
                    [key]: 'missing'
                  }
                }
              }
            }
          }
        });
      }
      expect(create).toThrowError(`Non-existing scale 'missing' defined as ${key} for annotation 'test'. Configured scales: x, y`);
    });
  });
});
