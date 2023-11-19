import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { getTrad } from '../../utils/getTrad';
import { Box, Stack, Typography, Divider } from '@strapi/design-system';
import Action from '../Action';
import { useSettings } from '../../hooks/useSettings';

const actionModes = ['publish', 'unpublish'];

const ActionManager = () => {
	const { formatMessage } = useIntl();
	const entity = useCMEditViewDataManager();
	const [showActions, setShowActions] = useState(false);
	const { getSettings } = useSettings();

	if (!entity.hasDraftAndPublish || entity.isCreatingEntry) {
		return null;
	}

	if (!entity.modifiedData?.id) {
		return null;
	}

	const { isLoading, data, isRefetching } = getSettings();

	useEffect(() => {
		if (!isLoading && !isRefetching) {
			if (!data.contentTypes?.length || data.contentTypes?.find((uid) => uid === entity.slug)) {
				setShowActions(true);
			}
		}
	}, [isLoading, isRefetching]);

	if (!showActions) {
		return null;
	}

	return (
		<Box marginTop={8}>
			<Typography variant="sigma" textColor="neutral600">
				{formatMessage({
					id: getTrad('plugin.name'),
					defaultMessage: 'Publisher',
				})}
			</Typography>
			<Box marginTop={2} marginBottom={4}>
				<Divider />
			</Box>
			<Stack spacing={4} marginTop={2}>
				{actionModes.map((mode, index) => (
					<Action
						mode={mode}
						key={mode + index}
						entityId={entity.modifiedData.id}
						entitySlug={entity.slug}
					/>
				))}
			</Stack>
		</Box>
	);
};

export default ActionManager;
