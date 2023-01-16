'use strict';

const actionRoutes = require('./action-routes');
const settingsRoutes = require('./settings-routes');

module.exports = {
	type: 'admin',
	routes: [...actionRoutes, settingsRoutes],
};
