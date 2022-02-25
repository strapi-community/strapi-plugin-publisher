'use strict';

const { getPluginEntityUid } = require('../utils/getEntityUId');

const actionUId = getPluginEntityUid('action');

module.exports = ({ strapi }) => ({
	/**
	 * Publish a single record
	 *
	 */
	publish(uid, entityId) {
		return strapi.entityService.update(uid, entityId, {
			data: {
				publishedAt: new Date(),
			},
		});
	},

	/**
	 * Publish a single record
	 *
	 */
	unpublish(uid, entityId) {
		return strapi.entityService.update(uid, entityId, {
			data: {
				publishedAt: null,
			},
		});
	},

	/**
	 * Toggle a records publication state
	 *
	 */
	async toggle(record, mode) {
		// handle single content type, id is always 1
		const entityId = record.entityId || 1;

		const entity = await strapi.entityService.findOne(record.entitySlug, entityId);

		// ensure entity is in correct publication status
		if (!entity.publishedAt && mode === 'publish') {
			await this.publish(record.entitySlug, entityId);
		} else if (entity.publishedAt && mode === 'unpublish') {
			await this.unpublish(record.entitySlug, entityId);
		}

		// remove any used actions
		strapi.entityService.delete(actionUId, record.id);
	},
});
