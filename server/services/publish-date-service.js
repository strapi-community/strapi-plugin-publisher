'use strict';

const { pluginId } = require('../utils/pluginId');

const uid = `plugin::${pluginId}.publish-date`;

module.exports = ({ strapi }) => ({
	/**
	 * Returns the currently stored dates
	 *
	 * @return {Promise<array>} dates
	 */
	find(options = {}) {
		return strapi.entityService.findMany(uid, options);
	},

	/**
	 * Returns the a specific stored date
	 *
	 * @return {Promise<Object>} date
	 */
	findOne(id, options = {}) {
		return strapi.entityService.findOne(uid, id, options);
	},

	/**
	 * Create a date
	 *
	 * @return {Promise<Object>} date
	 */
	create(date) {
		return strapi.entityService.create(uid, { data: date });
	},

	/**
	 * Deletes a date
	 *
	 * @return {Promise<Object>} date
	 */
	delete(id) {
		return strapi.entityService.delete(uid, id);
	},

	/**
	 * Update a date
	 *
	 * @return {Promise<Object>} date
	 */
	update(id, date) {
		return strapi.entityService.update(uid, id, { data: date });
	},
});
