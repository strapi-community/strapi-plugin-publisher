import React from 'react';
import { useIntl } from 'react-intl';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { getTrad } from '../../utils/getTrad';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import Action from '../Action';

const actionModes = ['publish', 'unpublish'];

const ActionManager = () => {
	const { formatMessage } = useIntl();
	const entity = useCMEditViewDataManager();

	if (!entity.hasDraftAndPublish || entity.isCreatingEntry) {
		return null;
	}

	if (!entity.modifiedData?.id) {
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
			<Stack size={4} marginTop={2}>
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
