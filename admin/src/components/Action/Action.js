import React, { useEffect, useState } from 'react';
import { useRBAC } from '@strapi/helper-plugin';
import PropTypes from 'prop-types';
import { useReactQuery } from '../../hooks/useReactQuery';
import { Stack } from '@strapi/design-system/Stack';
import ActionTimePicker from './ActionDateTimePicker';
import ActionButtons from './ActionButtons/ActionButtons';

const Action = ({ mode, entityId, entitySlug }) => {
	const { actionQueries, actionMutations } = useReactQuery();
	const [actionId, setActionId] = useState(0);
	const [isEditing, setIsEditing] = useState(false);
	const [executeAt, setExecuteAt] = useState(0);
	const [isCreating, setIsCreating] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [canPublish, setCanPublish] = useState(true);

	const { isLoading: isLoadingPermissions, allowedActions } = useRBAC({
		publish: [{ action: 'plugin::content-manager.explorer.publish', subject: entitySlug }],
	});

	useEffect(() => {
		if (!isLoadingPermissions) {
			setCanPublish(allowedActions.canPublish);
		}
	}, [isLoadingPermissions]);

	const { isLoading, data, isRefetching } = actionQueries.getEntityAction({
		mode,
		entityId,
		entitySlug,
	});

	// set initial data to state so its reactive
	useEffect(() => {
		if (!isLoading && !isRefetching) {
			if (data.length) {
				const entity = data[0];
				setActionId(entity.id);
				setExecuteAt(entity.attributes.executeAt);
				setIsEditing(true);
			} else {
				setActionId(0);
			}
		}
	}, [isLoading, isRefetching]);

	// handlers
	function handleDateChange(date) {
		setExecuteAt(date);
	}

	function handleOnEdit() {
		setIsCreating(true);
		setIsEditing(false);
	}

	function handleOnCreate() {
		setIsCreating(true);
	}

	function handleOnSave() {
		setIsSaving(true);
		try {
			if (!actionId) {
				actionMutations.create.mutate({
					mode,
					entityId,
					entitySlug,
					executeAt,
				});
			} else {
				actionMutations.update.mutate({
					id: actionId,
					executeAt,
				});
			}

			setIsCreating(false);
			setIsEditing(true);
		} catch (error) {
			console.error(error);
		} finally {
			setIsSaving(false);
		}
	}

	async function handleOnDelete() {
		try {
			actionMutations.delete.mutate({ id: actionId });
			setActionId(0);
			setExecuteAt(0);
			setIsCreating(false);
			setIsEditing(false);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Stack size={2}>
			<ActionTimePicker
				onChange={handleDateChange}
				executeAt={executeAt}
				isCreating={isCreating}
				isEditing={isEditing}
			/>
			<ActionButtons
				mode={mode}
				onEdit={handleOnEdit}
				isEditing={isEditing}
				isCreating={isCreating}
				isSaving={isSaving}
				executeAt={executeAt}
				canPublish={canPublish}
				onCreate={handleOnCreate}
				onSave={handleOnSave}
				onDelete={handleOnDelete}
			/>
		</Stack>
	);
};

Action.propTypes = {
	mode: PropTypes.string.isRequired,
	entityId: PropTypes.number.isRequired,
	entitySlug: PropTypes.string.isRequired,
};

export default Action;
