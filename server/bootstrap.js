'use strict';

const { getPluginService } = require('./utils/getPluginService');

module.exports = ({ strapi }) => {
	// create cron check
	strapi.cron.add({
		'*/1 * * * *': async ({ strapi }) => {
			// fetch all actions that have passed
			const records = await getPluginService(strapi, 'actionService').find({
				filters: {
					executeAt: {
						$lte: new Date(),
					},
				},
			});

			// process action records
			for (const record of records) {
				if (record.mode === 'publish') {
					getPluginService(strapi, 'publishService').index(record);
				} else if (record.mode === 'unpublish') {
					getPluginService(strapi, 'unpublishService').index(record);
				}
			}
		},
	});
};
