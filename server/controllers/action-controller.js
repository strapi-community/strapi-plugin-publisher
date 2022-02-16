'use strict';

const { getPluginService } = require('../utils/getPluginService');

module.exports = ({ strapi }) => ({
	/**
	 *  Fetch the current actions
	 *
	 * @return {Array} actions
	 */
	async find(ctx) {
		const actions = await getPluginService(strapi, 'actionService').find(ctx.query);

		ctx.send({ data: actions });
	},

	/**
	 *  Create a action
	 *
	 * @return {Object} action
	 */
	async create(ctx) {
		const { body } = ctx.request;
		const createdAction = await getPluginService(strapi, 'actionService').create(body);

		ctx.send({ data: createdAction });
	},

	/**
	 *  Delete a action
	 *
	 * @return {Object} action
	 */
	async delete(ctx) {
		const { id } = ctx.params;
		const action = await getPluginService(strapi, 'actionService').findOne(id);

		if (!action) {
			return ctx.notFound('action not found');
		}

		const deletedNote = await getPluginService(strapi, 'actionService').delete(id);

		ctx.send({ data: deletedNote });
	},

	/**
	 *  Edit a action
	 *
	 * @return {Object} action
	 */
	async update(ctx) {
		const { id } = ctx.params;
		const { body } = ctx.request;
		const action = await getPluginService(strapi, 'actionService').findOne(id);

		if (!action) {
			return ctx.notFound('action not found');
		}

		const updatedAction = await getPluginService(strapi, 'actionService').update(id, body);

		ctx.send({ data: updatedAction });
	},
});
