import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _get from 'lodash/get';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Box } from '@strapi/design-system/Box';
import { ActionLayoutHeader } from './ActionLayoutHeader';
import { ActionLayoutContent } from './ActionLayoutContent';
import { ActionLayoutFooter } from './ActionLayoutFooter';
import { hasResponseData } from '../../utils/hasResponseData';
import { requestPluginEndpoint } from '../../utils/requestPluginEndpoint';

const ActionLayout = () => {
	const { slug, hasDraftAndPublish, modifiedData, isCreatingEntry } = useCMEditViewDataManager();
	const [isVisible, setIsVisible] = useState(false);
	const [disable, setDisable] = useState(false);
	const [dateValue, setDateValue] = useState(null);
	const [record, setRecord] = useState(null);
	const params = useParams();
	const id = _get(params, 'id', null);
	const currentEntityId = id;

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

		fetchEntityActions(slug, currentEntityId);
	}, []);

	// only add to unpublished records
	if (!hasDraftAndPublish || modifiedData.publishedAt || isCreatingEntry) {
		return null;
	}

	return (
		<Box marginTop={4}>
			<ActionLayoutHeader />
			{isVisible && (
				<ActionLayoutContent
					dateValue={dateValue}
					updateDateValue={updateDateValue}
					disable={disable}
				/>
			)}
			<ActionLayoutFooter
				toggleDisable={toggleDisable}
				disable={disable}
				dateValue={dateValue}
				isVisible={isVisible}
				toggleIsVisible={toggleIsVisible}
				entityId={currentEntityId}
				entitySlug={slug}
				record={record}
			/>
		</Box>
	);
};

export { ActionLayout };
