import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Button } from '@strapi/design-system/Button';
import Check from '@strapi/icons/Check';
import Cross from '@strapi/icons/Cross';
import Write from '@strapi/icons/Write';
import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import { getTrad } from '../../../utils/getTrad';

const ActionButtons = ({
	mode,
	isEditing,
	onEdit,
	onCreate,
	isCreating,
	executeAt,
	onDelete,
	onSave,
	canPublish,
	isSaving,
}) => {
	const { formatMessage } = useIntl();

	function handleEditChange() {
		if (onEdit) {
			onEdit();
		}
	}

	function handleCreateChange() {
		if (onCreate) {
			onCreate();
		}
	}

	function handleSaveChange() {
		if (onSave) {
			onSave();
		}
	}

	function handleDeleteChange() {
		if (onDelete) {
			onDelete();
		}
	}

	// do not show any mutate buttons if user cannot publish
	if ((isCreating || isEditing) && !canPublish) {
		return null;
	}

	if (isCreating) {
		return (
			<Button
				disabled={isSaving || !executeAt}
				fullWidth
				variant="success-light"
				startIcon={<Write />}
				onClick={handleSaveChange}
			>
				{formatMessage({
					id: getTrad(`action.footer.${mode}.button.save`),
					defaultMessage: `Save ${mode} date`,
				})}
			</Button>
		);
	}

	if (isEditing) {
		return (
			<>
				<Button fullWidth onClick={handleEditChange} variant="tertiary" startIcon={<Pencil />}>
					{formatMessage({
						id: getTrad(`action.footer.${mode}.button.edit`),
						defaultMessage: `Edit ${mode} date`,
					})}
				</Button>
				<Button fullWidth variant="danger-light" startIcon={<Trash />} onClick={handleDeleteChange}>
					{formatMessage({
						id: getTrad(`action.footer.${mode}.button.delete`),
						defaultMessage: `Delete ${mode} date`,
					})}
				</Button>
			</>
		);
	}

	return (
		<Button
			fullWidth
			variant={mode === 'publish' ? 'default' : 'secondary'}
			startIcon={mode === 'publish' ? <Check /> : <Cross />}
			onClick={handleCreateChange}
			disabled={!canPublish}
		>
			{formatMessage({
				id: getTrad(`action.footer.${mode}.button.add`),
				defaultMessage: `Add a ${mode} date`,
			})}
		</Button>
	);
};

ActionButtons.propTypes = {
	mode: PropTypes.string.isRequired,
	executeAt: PropTypes.string,
	isEditing: PropTypes.bool.isRequired,
	onEdit: PropTypes.func,
	onCreate: PropTypes.func,
	isCreating: PropTypes.bool.isRequired,
	isSaving: PropTypes.bool.isRequired,
	onDelete: PropTypes.func,
	onSave: PropTypes.func,
	canPublish: PropTypes.bool.isRequired,
};

export default ActionButtons;
