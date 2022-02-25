'use strict';

const { getPluginService } = require('../utils/getPluginService');
const { getPluginEntityUid } = require('../utils/getEntityUId');

const actionUId = getPluginEntityUid('action');

module.exports = ({ strapi }) => ({
	/**
	 * Publish a single record
	 *
	 */
	async publish(uid, entityId) {
		const publishedEntity = await strapi.entityService.update(uid, entityId, {
			data: {
				publishedAt: new Date(),
			},
		});

		// emit publish event
		await getPluginService(strapi, 'emitService').publish(uid, publishedEntity);
	},

	/**
	 * Unpublish a single record
	 *
	 */
	async unpublish(uid, entityId) {
		const unpublishedEntity = await strapi.entityService.update(uid, entityId, {
			data: {
				publishedAt: null,
			},
		});

		// emit unpublish event
		await getPluginService(strapi, 'emitService').unpublish(uid, unpublishedEntity);
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
