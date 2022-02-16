'use strict';

const { getPluginEntityUid } = require('../utils/getEntityUId');

const actionUId = getPluginEntityUid('action');

module.exports = ({ strapi }) => ({
	/**
	 * Publish a single record
	 *
	 */
	async index(record) {
		// handle single content type, id is always 1
		const entityId = record.entityId || 1;

		const entity = await strapi.entityService.findOne(record.entitySlug, entityId);

		// ensure entity has been publish
		if (entity.publishedAt) {
			await strapi.entityService.update(record.entitySlug, entityId, {
				data: {
					publishedAt: null,
				},
			});
		}

		// remove any used actions
		strapi.entityService.delete(actionUId, record.id);
	},
});
