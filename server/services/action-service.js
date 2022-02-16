'use strict';

const { getPluginEntityUid } = require('../utils/getEntityUId');

const uid = getPluginEntityUid('action');

module.exports = ({ strapi }) => ({
	/**
	 * Returns the currently stored actions
	 *
	 * @return {Promise<array>} actions
	 */
	find(options = {}) {
		return strapi.entityService.findMany(uid, options);
	},

	/**
	 * Returns the a specific stored action
	 *
	 * @return {Promise<Object>} action
	 */
	findOne(id, options = {}) {
		return strapi.entityService.findOne(uid, id, options);
	},

	/**
	 * Create a action
	 *
	 * @return {Promise<Object>} action
	 */
	create(action) {
		return strapi.entityService.create(uid, { data: action });
	},

	/**
	 * Deletes a action
	 *
	 * @return {Promise<Object>} action
	 */
	delete(id) {
		return strapi.entityService.delete(uid, id);
	},

	/**
	 * Update a action
	 *
	 * @return {Promise<Object>} action
	 */
	update(id, action) {
		return strapi.entityService.update(uid, id, { data: action });
	},
});
