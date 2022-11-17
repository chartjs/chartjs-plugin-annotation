describe('helpers', function() {

  describe('requireVersion', function() {
    const requireVersion = window.helpers.requireVersion;

    it('should throw error for too old version', function() {
      expect(() => requireVersion('test', '3.7', '2.9.3')).toThrowError();
      expect(() => requireVersion('test', '3.7', '3.6.99-alpha3')).toThrowError();
      expect(() => requireVersion('test', '16.13.2.8', '16.13.2.8-beta')).toThrowError();
    });

    it('should not throw error for new enough version', function() {
      expect(() => requireVersion('test', '3.7', '3.7.0-beta.1')).not.toThrowError();
      expect(() => requireVersion('test', '3.7.1', '3.7.19')).not.toThrowError();
      expect(() => requireVersion('test', '3.7', '4.0.0')).not.toThrowError();
      expect(() => requireVersion('test', '16.13.2', '16.13.3-rc')).not.toThrowError();
    });

    it('should return boolean when `strict` parameter is false', function() {
      expect(requireVersion('test', '3.7', '2.9.3', false)).toBeFalse();
      expect(requireVersion('test', '3.7', '3.8', false)).toBeTrue();
    });
  });

  describe('retrieveScaleID', function() {
    const chart = acquireChart({
      type: 'bar',
      data: {
        datasets: [{
          data: [0, 5, 10, 15, 20, 22]
        }]
      },
      options: {
        scales: {
          x1: {
            display: false,
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          },
          y1: {
            display: true
          }
        },
      }
    });
    const retrieveScaleID = window.helpers.retrieveScaleID;
    const scales = chart.scales;

    it('should return x1 as scale id', function() {
      expect(retrieveScaleID(scales, {}, 'xScaleID')).toBe('x1');
    });

    it('should return y1 as scale id', function() {
      expect(retrieveScaleID(scales, {}, 'yScaleID')).toBe('y1');
    });

    it('should return foo as scale id', function() {
      expect(retrieveScaleID(scales, {scaleID: 'foo'}, 'scaleID')).toBe('foo');
    });

    it('should return r as scale id', function() {
      expect(retrieveScaleID(scales, {}, 'rScaleID')).toBe('r');
    });

  });

});
