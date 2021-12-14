describe('helpers', function() {

  describe('requireVersion', function() {
    const requireVersion = window.helpers.requireVersion;

    it('should throw error for too old version', function() {
      expect(() => requireVersion('3.7', '2.9.3')).toThrowError();
      expect(() => requireVersion('3.7', '3.6.99-alpha3')).toThrowError();
      expect(() => requireVersion('16.13.2.8', '16.13.2.8-beta')).toThrowError();
    });

    it('should not throw error for new enough version', function() {
      expect(() => requireVersion('3.7', '3.7.0-beta.1')).not.toThrowError();
      expect(() => requireVersion('3.7.1', '3.7.19')).not.toThrowError();
      expect(() => requireVersion('3.7', '4.0.0')).not.toThrowError();
      expect(() => requireVersion('16.13.2', '16.13.3-rc')).not.toThrowError();
    });
  });

});
