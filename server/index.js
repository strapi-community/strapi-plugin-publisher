'use strict';

const bootstrap = require('./bootstrap');
const contentTypes = require('./content-types');
const controllers = require('./controllers');
const routes = require('./routes');
const services = require('./services');

module.exports = {
	bootstrap,
	controllers,
	routes,
	services,
	contentTypes,
};
