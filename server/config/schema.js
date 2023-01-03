'use strict';

const yup = require('yup');

const pluginConfigSchema = yup.object().shape({
	actionSyncFrequeuncy: yup.string(),
});

module.exports = {
	pluginConfigSchema,
};
