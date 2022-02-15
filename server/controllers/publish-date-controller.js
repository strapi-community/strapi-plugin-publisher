'use strict';

const { getPluginService } = require('../utils/getPluginService');

module.exports = ({ strapi }) => ({
	/**
	 *  Fetch the current dates
	 *
	 * @return {Array} dates
	 */
	async find(ctx) {
		const dates = await getPluginService(strapi, 'publishDateService').find(ctx.query);

		ctx.send({ data: dates });
	},

	/**
	 *  Create a date
	 *
	 * @return {Object} date
	 */
	async create(ctx) {
		const { body } = ctx.request;
		const createdNote = await getPluginService(strapi, 'publishDateService').create(body);

		ctx.send({ data: createdNote });
	},

	/**
	 *  Delete a date
	 *
	 * @return {Object} date
	 */
	async delete(ctx) {
		const { id } = ctx.params;
		const date = await getPluginService(strapi, 'publishDateService').findOne(id);

		if (!date) {
			return ctx.notFound('date not found');
		}

		const deletedNote = await getPluginService(strapi, 'publishDateService').delete(id);

		ctx.send({ data: deletedNote });
	},

	/**
	 *  Edit a date
	 *
	 * @return {Object} date
	 */
	async update(ctx) {
		const { id } = ctx.params;
		const { body } = ctx.request;
		const date = await getPluginService(strapi, 'publishDateService').findOne(id);

		if (!date) {
			return ctx.notFound('date not found');
		}

		const updatedNote = await getPluginService(strapi, 'publishDateService').update(id, body);

		ctx.send({ data: updatedNote });
	},
});
