import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@strapi/helper-plugin';

const ActionContent = ({ action, setAction, isDisabled }) => {
	const handleDateChange = (date) => {
		setAction((prev) => ({
			...prev,
			executeAt: date,
		}));
	};

	return (
		<DateTimePicker
			ariaLabel="datetime picker"
			onChange={handleDateChange}
			value={action.executeAt}
			disabled={isDisabled}
		/>
	);
};

ActionContent.propTypes = {
	action: PropTypes.shape({
		id: PropTypes.number,
		executeAt: PropTypes.string,
	}),
	setAction: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool.isRequired,
};

export { ActionContent };
