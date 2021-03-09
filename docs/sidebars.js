const pkg = require('../package.json');
const docsVersion = pkg.version.indexOf('-') > -1 ? 'next' : 'latest';

module.exports = {
  someSidebar: {
    General: [
      'index',
      'integration',
      'usage',
      'options',
      'interaction',
    ],
    Annotations: [
      'types/box',
      'types/ellipse',
      'types/line',
      'types/point'
    ],
    Developers: [
      'contributing',
    ]
  },
};
