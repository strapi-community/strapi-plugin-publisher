'use strict';

const { getPluginService } = require('../utils/getPluginService');

module.exports = {
	registerCronTasks: ({ strapi }) => {
		const settings = getPluginService('settingsService').get();

		// create cron check
		strapi.cron.add({
			[settings.actions.syncFrequency]: async () => {
				// fetch all actions that have passed
				const records = await getPluginService('actionService').find({
					filters: {
						executeAt: {
							$lte: Date.now(),
						},
					},
				});

				// process action records
				for (const record of records) {
					getPluginService('publicationService').toggle(record, record.mode);
				}
			},
		});
	},
};
