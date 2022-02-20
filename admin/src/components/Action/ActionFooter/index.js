import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import Check from '@strapi/icons/Check';
import Cross from '@strapi/icons/Cross';
import Write from '@strapi/icons/Write';
import Pencil from '@strapi/icons/Pencil';
import Trash from '@strapi/icons/Trash';
import { requestPluginEndpoint } from '../../../utils/requestPluginEndpoint';

const ActionFooter = ({
	isVisible,
	disable,
	toggleDisable,
	toggleIsVisible,
	entitySlug,
	entityId,
	dateValue,
	record,
	mode,
}) => {
	const buildRequestOptions = () => {
		const endpoint = record ? `actions/${record.id}` : 'actions';
		let options = {
			method: record ? 'PUT' : 'POST',
			body: {
				executeAt: dateValue,
				mode,
			},
		};

		if (record) {
			options.body.id = record.id;
		} else {
			options.body.entitySlug = entitySlug;
			if (entityId) {
				options.body.entityId = entityId;
			}
		}

		return { endpoint, options };
	};

	const handleActionSave = () => {
		if (dateValue) {
			const { endpoint, options } = buildRequestOptions();
			requestPluginEndpoint(endpoint, options);
		}
		toggleDisable();
	};

	const handleActionEdit = () => {
		toggleDisable();
	};

	const handleActionAdd = () => {
		toggleIsVisible();
	};

	const handleActionDelete = () => {
		requestPluginEndpoint(`actions/${record.id}`, {
			method: 'DELETE',
		});
		toggleDisable();
		toggleIsVisible();
	};

	// add action
	if (!isVisible) {
		const addActionButtonIcon = mode === 'publish' ? <Check /> : <Cross />;
		return (
			<Button
				fullWidth
				variant="secondary"
				onClick={handleActionAdd}
				startIcon={addActionButtonIcon}
			>
				Add a {mode} date
			</Button>
		);
	}

	// edit/delete action
	if (disable) {
		return (
			<Stack size={2}>
				<Button fullWidth variant="tertiary" onClick={handleActionEdit} startIcon={<Pencil />}>
					Edit {mode} date
				</Button>
				<Button fullWidth variant="danger-light" onClick={handleActionDelete} startIcon={<Trash />}>
					Delete {mode} date
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
			disabled={!dateValue}
			startIcon={<Write />}
		>
			Save {mode} date
		</Button>
	);
};

ActionFooter.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	disable: PropTypes.bool.isRequired,
	toggleDisable: PropTypes.func.isRequired,
	toggleIsVisible: PropTypes.func.isRequired,
	entitySlug: PropTypes.string.isRequired,
	entityId: PropTypes.number,
	dateValue: PropTypes.string,
	record: PropTypes.object,
	mode: PropTypes.string.isRequired,
};

export { ActionFooter };
