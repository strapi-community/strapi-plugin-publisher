import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@strapi/helper-plugin';

const ActionContent = ({ dateValue, updateDateValue, disable }) => {
	const handleDateChange = (date) => {
		updateDateValue(date);
	};

	return (
		<DateTimePicker
			ariaLabel="datetime picker"
			onChange={handleDateChange}
			value={dateValue}
			disabled={disable}
		/>
	);
};

ActionContent.propTypes = {
	dateValue: PropTypes.string,
	updateDateValue: PropTypes.func.isRequired,
	disable: PropTypes.bool.isRequired,
};

export { ActionContent };
