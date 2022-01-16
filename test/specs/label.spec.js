describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  const options = {
    type: 'label',
    id: 'test',
    xValue: 5,
    yValue: 5,
    content: 'This is my text',
    borderWidth: 1
  };

  window.testEvents(options);

});
