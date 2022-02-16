import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@strapi/helper-plugin';
import { Typography } from '@strapi/design-system/Typography';
import { Stack } from '@strapi/design-system/Stack';

const ActionLayoutContent = ({ dateValue, updateDateValue, disable }) => {
	const handleDateChange = (date) => {
		updateDateValue(date);
	};

	return (
		<Stack size={2} marginTop={2} marginBottom={2}>
			<Typography variant="sigma" textColor="neutral600" merginBottom={1}>
				Publish Date
			</Typography>
			<DateTimePicker
				ariaLabel="publish datetime picker"
				onChange={handleDateChange}
				value={dateValue}
				disabled={disable}
			/>
		</Stack>
	);
};

ActionLayoutContent.propTypes = {
	dateValue: PropTypes.string,
	updateDateValue: PropTypes.func.isRequired,
	disable: PropTypes.bool.isRequired,
};

export { ActionLayoutContent };
