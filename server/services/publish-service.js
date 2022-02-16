'use strict';

const { pluginId } = require('../utils/pluginId');

const actionsUId = `plugin::${pluginId}.action`;

module.exports = ({ strapi }) => ({
	/**
	 * Publish multiple records
	 *
	 */
	publish(records) {
		for (const record of records) {
			this.publishOne(record);
		}
	},

	/**
	 * Publish a single record
	 *
	 */
	async publishOne(record) {
		// handle single content type, id is always 1
		const entityId = record.entityId || 1;

		const entity = await strapi.entityService.findOne(record.entitySlug, entityId);

		// ensure entity has not been publish yet
		if (!entity.publishedAt) {
			await strapi.entityService.update(record.entitySlug, entityId, {
				data: {
					publishedAt: new Date(),
				},
			});
		}

		// remove any used actions
		strapi.entityService.delete(actionsUId, record.id);
	},
});
