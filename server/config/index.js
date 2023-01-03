'use strict';

const { pluginConfigSchema } = require('./schema');

module.exports = {
	default: () => ({
		actionSyncFrequeuncy: '*/1 * * * *',
	}),
	validator: async (config) => {
		await pluginConfigSchema.validate(config);
	},
};
