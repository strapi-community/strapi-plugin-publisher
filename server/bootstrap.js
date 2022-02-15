'use strict';

const { getPluginService } = require('./utils/getPluginService');

module.exports = ({ strapi }) => {
	// create cron check
	strapi.cron.add({
		'*/1 * * * *': async ({ strapi }) => {
			// fetch all publish dates that have passed
			const records = await getPluginService(strapi, 'publishDateService').find({
				filters: {
					publishAt: {
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
