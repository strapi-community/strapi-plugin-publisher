import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@strapi/design-system/Typography';

const ActionHeader = ({ mode }) => {
	return (
		<Typography variant="sigma" textColor="neutral600" merginBottom={1}>
			{mode} Date
		</Typography>
	);
};

ActionHeader.propTypes = {
	mode: PropTypes.string.isRequired,
};

export { ActionHeader };
