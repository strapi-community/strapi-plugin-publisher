import React from 'react';
import { Box } from '@strapi/design-system/Box';
import { Divider } from '@strapi/design-system/Divider';
import { Typography } from '@strapi/design-system/Typography';

const ActionLayoutHeader = () => {
	return (
		<React.Fragment>
			<Typography variant="sigma" textColor="neutral600">
				Publisher
			</Typography>
			<Box marginTop={2} marginBottom={2}>
				<Divider />
			</Box>
		</React.Fragment>
	);
};

export { ActionLayoutHeader };
