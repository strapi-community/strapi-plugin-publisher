import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@strapi/helper-plugin';
import { fetchSettings } from '../../../api/settings';

const ActionContent = ({ action, setAction, isDisabled }) => {
	const [step, setStep] = useState(15);

	const handleDateChange = (date) => {
		setAction((prev) => ({
			...prev,
			executeAt: date,
		}));
	};

	const fetchDTPStep = async () => {
		try {
			const stepResponse = await fetchSettings();
			if (stepResponse.data) {
				setStep(stepResponse.data.step);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchDTPStep();
	}, []);

	return (
		<DateTimePicker
			ariaLabel="datetime picker"
			onChange={handleDateChange}
			value={action.executeAt}
			disabled={isDisabled}
			step={step}
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
	step: PropTypes.number,
};

export { ActionContent };
