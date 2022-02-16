const { pluginId } = require('./pluginId');

const getPluginEntityUid = (entity) => `plugin::${pluginId}.${entity}`;

module.exports = {
	getPluginEntityUid,
};
