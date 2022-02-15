import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { requestPluginEndpoint } from '../../../utils/requestPluginEndpoint';

const PublishLayoutFooter = ({
	isVisible,
	disable,
	toggleDisable,
	toggleIsVisible,
	entitySlug,
	entityId,
	dateValue,
	record,
}) => {
	const buildRequestOptions = () => {
		const endpoint = record ? `dates/${record.id}` : 'dates';
		let options = {
			method: record ? 'PUT' : 'POST',
			body: {
				publishAt: dateValue,
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

	const handlePublishDateSave = () => {
		if (dateValue) {
			const { endpoint, options } = buildRequestOptions();
			requestPluginEndpoint(endpoint, options);
		}
		toggleDisable();
	};

	const handlePublishDateEdit = () => {
		toggleDisable();
	};

	const handlePublishDateAdd = () => {
		toggleIsVisible();
	};

	const handlePublishDateDelete = () => {
		requestPluginEndpoint(`dates/${record.id}`, {
			method: 'DELETE',
		});
		toggleDisable();
		toggleIsVisible();
	};

	// add action
	if (!isVisible) {
		return (
			<Button fullWidth variant="secondary" onClick={handlePublishDateAdd}>
				Add a publish date
			</Button>
		);
	}

	// edit/delete action
	if (disable) {
		return (
			<Stack size={2}>
				<Button fullWidth variant="tertiary" onClick={handlePublishDateEdit}>
					Edit publish date
				</Button>
				<Button fullWidth variant="danger-light" onClick={handlePublishDateDelete}>
					Delete publish date
				</Button>
			</Stack>
		);
	}

	// save action
	return (
		<Button fullWidth variant="success-light" onClick={handlePublishDateSave}>
			Save publish date
		</Button>
	);
};

PublishLayoutFooter.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	disable: PropTypes.bool.isRequired,
	toggleDisable: PropTypes.func.isRequired,
	toggleIsVisible: PropTypes.func.isRequired,
	entitySlug: PropTypes.string.isRequired,
	entityId: PropTypes.number,
	dateValue: PropTypes.string,
	record: PropTypes.object,
};

export { PublishLayoutFooter };
