'use strict';

const actionRoutes = require('./action');

module.exports = {
	type: 'admin',
	routes: [...actionRoutes],
};
