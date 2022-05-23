import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { getTrad } from '../../../utils/getTrad';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import Check from '@strapi/icons/Check';
import Cross from '@strapi/icons/Cross';
import Write from '@strapi/icons/Write';
import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';

const ActionFooter = ({
	mode,
	entityId,
	entitySlug,
	action,
	isDisabled,
	setIsDisabled,
	isVisible,
	setIsVisible,
}) => {
	const { formatMessage } = useIntl();
	const { actionMutations } = useReactQuery();

	// action handlers
	const handleActionSave = async () => {
		try {
			if (action.id) {
				await actionMutations.update.mutate(action);
			} else {
				await actionMutations.create.mutate({
					mode,
					entityId,
					entitySlug,
					...action,
				});
			}
			setIsDisabled(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleActionEdit = () => {
		setIsDisabled(false);
	};

	const handleActionAdd = () => {
		setIsVisible(true);
	};

	const handleActionDelete = async () => {
		try {
			await actionMutations.delete.mutate(action);
			setIsVisible(false);
			setIsDisabled(false);
		} catch (error) {
			console.error(error);
		}
	};

	// add action
	if (!isVisible) {
		const addActionButtonColor = mode === 'publish' ? 'default' : 'secondary';
		const addActionButtonIcon = mode === 'publish' ? <Check /> : <Cross />;
		return (
			<Button
				fullWidth
				variant={addActionButtonColor}
				onClick={handleActionAdd}
				startIcon={addActionButtonIcon}
			>
				{formatMessage({
					id: getTrad(`action.footer.${mode}.button.add`),
					defaultMessage: `Add a ${mode} date`,
				})}
			</Button>
		);
	}

	// edit/delete action
	if (isDisabled) {
		return (
			<Stack size={2}>
				<Button fullWidth variant="tertiary" onClick={handleActionEdit} startIcon={<Pencil />}>
					{formatMessage({
						id: getTrad(`action.footer.${mode}.button.edit`),
						defaultMessage: `Edit ${mode} date`,
					})}
				</Button>
				<Button fullWidth variant="danger-light" onClick={handleActionDelete} startIcon={<Trash />}>
					{formatMessage({
						id: getTrad(`action.footer.${mode}.button.delete`),
						defaultMessage: `Delete ${mode} date`,
					})}
				</Button>
			</Stack>
		);
	}

	// save action
	return (
		<Button
			fullWidth
			variant="success-light"
			onClick={handleActionSave}
			disabled={!action.executeAt}
			startIcon={<Write />}
		>
			{formatMessage({
				id: getTrad(`action.footer.${mode}.button.save`),
				defaultMessage: `Save ${mode} date`,
			})}
		</Button>
	);
};

ActionFooter.propTypes = {
	mode: PropTypes.string.isRequired,
	entityId: PropTypes.number,
	entitySlug: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	setIsDisabled: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	setIsVisible: PropTypes.func.isRequired,
	action: PropTypes.shape({
		id: PropTypes.number,
		executeAt: PropTypes.string,
	}),
};

export { ActionFooter };
