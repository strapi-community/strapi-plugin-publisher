'use strict';

module.exports = {
	kind: 'collectionType',
	collectionName: 'publish-dates',
	info: {
		singularName: 'publish-date',
		pluralName: 'publish-dates',
		displayName: 'publish-dates',
	},
	pluginOptions: {
		'content-manager': {
			visible: false,
		},
		'content-type-builder': {
			visible: false,
		},
	},
	options: {
		draftAndPublish: false,
		comment: '',
	},
	attributes: {
		publishAt: {
			type: 'datetime',
		},
		entityId: {
			type: 'integer',
		},
		entitySlug: {
			type: 'string',
		},
	},
};
