import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { getTrad } from '../../../utils/getTrad';
import { Typography } from '@strapi/design-system/Typography';

const ActionHeader = ({ mode }) => {
	const { formatMessage } = useIntl();

	return (
		<Typography variant="sigma" textColor="neutral600" merginBottom={1}>
			{formatMessage({
				id: getTrad(`action.header.${mode}.title`),
				defaultMessage: `${mode} Date`,
			})}
		</Typography>
	);
};

ActionHeader.propTypes = {
	mode: PropTypes.string.isRequired,
};

export { ActionHeader };
