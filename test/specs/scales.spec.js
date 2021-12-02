describe('scale options', function() {
  ['scaleID', 'xScaleID', 'yScaleID'].forEach(function(key) {
    it(`should throw an exception when ${key} is not a defined scale`, function() {
      function create() {
        return acquireChart({
          type: 'line',
          options: {
            plugins: {
              annotation: {
                annotations: {
                  test: {
                    type: 'line',
                    scaleID: 'missing'
                  }
                }
              }
            }
          }
        });
      }
      expect(create).toThrow();
    });
  });
});
