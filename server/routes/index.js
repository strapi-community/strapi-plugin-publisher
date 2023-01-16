'use strict';

const actionRoutes = require('./action-routes');
const settingsRoutes = require('./settings-routes');

module.exports = [...actionRoutes, ...settingsRoutes];
