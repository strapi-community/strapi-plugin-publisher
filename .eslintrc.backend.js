module.exports = {
	$schema: 'https://json.schemastore.org/eslintrc',
	env: {
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
	rules: {
		'node/no-extraneous-require': [
			'error',
			{
				allowModules: ['yup', 'lodash', '@strapi/utils'],
			},
		],
	},
};
