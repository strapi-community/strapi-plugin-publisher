'use strict';

const actionRoutes = require('./action');

module.exports = {
	type: 'content-api',
	routes: [...actionRoutes],
};
