import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNotification } from '@strapi/helper-plugin';
import {
	fetchEntityActions,
	createEntityAction,
	updateEntityAction,
	deleteEntityAction,
} from '../api/actions';
import { getTrad } from '../utils/getTrad';

const getQuerykey = ({ base, entityId, entitySlug, mode }) => {
	const queryKey = [base];
	if (entitySlug) {
		queryKey.push(entitySlug);
	}
	if (entityId) {
		queryKey.push(entityId);
	}

	if (mode) {
		queryKey.push(mode);
	}
	return queryKey;
};

const useReactQuery = () => {
	const queryClient = useQueryClient();
	const toggleNotification = useNotification();

	// universal handlers
	const handleError = (error) => {
		const message = error.response ? error.response.error.message : error.message;
		toggleNotification({
			type: 'warning',
			message,
		});
	};

	const handleSuccess = ({ invalidate, notification }) => {
		if (invalidate) {
			queryClient.invalidateQueries(invalidate);
		}
		toggleNotification({
			type: notification.type,
			message: { id: getTrad(notification.tradId) },
		});
	};

	// actions
	const actionQueries = {
		getEntityAction: (params) => {
			const queryKey = getQuerykey({
				base: 'get-entity-action',
				entityId: params.entityId,
				entitySlug: params.entitySlug,
				mode: params.mode,
			});
			return useQuery(queryKey, () => fetchEntityActions(params).then((r) => r.data));
		},
	};

	const actionMutations = {
		delete: useMutation(deleteEntityAction, {
			onSuccess: ({ data }) => {
				const querykey = getQuerykey({
					base: 'get-entity-action',
					entityId: data.entityId,
					entitySlug: data.entitySlug,
					mode: data.mode,
				});
				handleSuccess({
					invalidate: querykey,
					notification: {
						type: 'success',
						tradId: `action.notification.${data.mode}.delete.success`,
					},
				});
			},
			onError: (error) => handleError(error),
		}),

		update: useMutation(updateEntityAction, {
			onSuccess: ({ data }) => {
				const querykey = getQuerykey({
					base: 'get-entity-action',
					entityId: data.entityId,
					entitySlug: data.entitySlug,
					mode: data.mode,
				});
				handleSuccess({
					invalidate: querykey,
					notification: {
						type: 'success',
						tradId: `action.notification.${data.mode}.update.success`,
					},
				});
			},
			onError: handleError,
		}),

		create: useMutation(createEntityAction, {
			onSuccess: ({ data }) => {
				const querykey = getQuerykey({
					base: 'get-entity-action',
					entityId: data.entityId,
					entitySlug: data.entitySlug,
					mode: data.mode,
				});
				handleSuccess({
					invalidate: querykey,
					notification: {
						type: 'success',
						tradId: `action.notification.${data.mode}.create.success`,
					},
				});
			},
			onError: (error) => handleError(error),
		}),
	};

	return { actionQueries, actionMutations };
};

export { useReactQuery };
