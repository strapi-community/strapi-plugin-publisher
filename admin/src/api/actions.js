import { requestPluginEndpoint } from '../utils/requestPluginEndpoint';

const fetchEntityActions = ({ entitySlug, entityId, mode }) => {
	let params = {
		'filters[entitySlug][$eq]': entitySlug,
		'filters[mode][$eq]': mode,
	};
	if (entityId) {
		params['filters[entityId][$eq]'] = entityId;
	}
	return requestPluginEndpoint('actions', {
		params,
	});
};

const createEntityAction = ({ entitySlug, entityId, mode, executeAt }) => {
	let body = {
		executeAt,
		mode,
		entitySlug,
	};

	if (entityId) {
		body.entityId = entityId;
	}

	return requestPluginEndpoint('actions', {
		method: 'POST',
		body,
	});
};

const updateEntityAction = ({ id, executeAt }) => {
	let body = {
		executeAt,
		id,
	};

	return requestPluginEndpoint(`actions/${id}`, {
		method: 'PUT',
		body,
	});
};

const deleteEntityAction = ({ id }) => {
	return requestPluginEndpoint(`actions/${id}`, {
		method: 'DELETE',
	});
};

export { fetchEntityActions, createEntityAction, updateEntityAction, deleteEntityAction };
