'use strict';

const actionService = require('./action-service');
const emitService = require('./emit-service');
const publicationService = require('./publication-service');
const settingsService = require('./settings-service');

module.exports = {
	action: actionService,
	emitService,
	publicationService,
	settingsService,
};
