import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils/getTrad';
import { Box } from '@strapi/design-system/Box';
import { Divider } from '@strapi/design-system/Divider';
import { Typography } from '@strapi/design-system/Typography';

const ActionLayoutHeader = () => {
	const { formatMessage } = useIntl();
	return (
		<React.Fragment>
			<Typography variant="sigma" textColor="neutral600">
				{formatMessage({
					id: getTrad('plugin.name'),
					defaultMessage: 'Publisher',
				})}
			</Typography>
			<Box marginTop={2} marginBottom={2}>
				<Divider />
			</Box>
		</React.Fragment>
	);
};

export { ActionLayoutHeader };
