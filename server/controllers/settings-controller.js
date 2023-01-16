'use strict';

const { getPluginService } = require('../utils/getPluginService');

module.exports = () => ({
	/**
	 *  Fetch the current plugin settings
	 *
	 * @return {Array} actions
	 */
	async find(ctx) {
		ctx.send({ data: getPluginService('settingsService').get() });
	},
});
