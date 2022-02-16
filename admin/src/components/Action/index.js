import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { ActionHeader } from './ActionHeader';
import { ActionContent } from './ActionContent';
import { ActionFooter } from './ActionFooter';
import { hasResponseData } from '../../utils/hasResponseData';
import { requestPluginEndpoint } from '../../utils/requestPluginEndpoint';

const Action = ({ mode, slug, entityId }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [disable, setDisable] = useState(false);
	const [dateValue, setDateValue] = useState(null);
	const [record, setRecord] = useState(null);

	const toggleDisable = () => {
		setDisable(!disable);
	};
	const toggleIsVisible = () => {
		setIsVisible(!isVisible);
	};

	const updateDateValue = (date) => {
		setDateValue(date);
	};

	const updateRecord = (record) => {
		setRecord(record);
		setDateValue(record.executeAt);
		setIsVisible(true);
		setDisable(true);
	};

	useEffect(() => {
		const fetchEntityActions = async (entitySlug, entityId) => {
			let params = {
				'filters[entitySlug][$eq]': entitySlug,
				'filters[mode][$eq]': mode,
			};
			if (entityId) {
				params['filters[entityId][$eq]'] = entityId;
			}
			const entityDateResponse = await requestPluginEndpoint('actions', {
				params,
			});

			if (hasResponseData(entityDateResponse)) {
				const record = entityDateResponse.data[0];
				updateRecord(record);
			}
		};

		fetchEntityActions(slug, entityId);
	}, []);

	return (
		<Box marginTop={4}>
			{isVisible && (
				<Stack size={2} marginTop={2} marginBottom={2}>
					<ActionHeader mode={mode} />
					<ActionContent
						dateValue={dateValue}
						updateDateValue={updateDateValue}
						disable={disable}
					/>
				</Stack>
			)}
			<ActionFooter
				mode={mode}
				toggleDisable={toggleDisable}
				disable={disable}
				dateValue={dateValue}
				isVisible={isVisible}
				toggleIsVisible={toggleIsVisible}
				entityId={entityId}
				entitySlug={slug}
				record={record}
			/>
		</Box>
	);
};

Action.propTypes = {
	mode: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	entityId: PropTypes.number,
};

export { Action };
