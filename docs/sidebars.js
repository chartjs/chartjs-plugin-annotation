const pkg = require('../package.json');
const docsVersion = pkg.version.indexOf('-') > -1 ? 'next' : 'latest';

module.exports = {
	someSidebar: {
        Introduction: ['index'],
	},
};
