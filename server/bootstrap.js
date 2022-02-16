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

			// publish all records found
			if (records.length) {
				getPluginService(strapi, 'publishService').publish(records);
			}
		},
	});
};
