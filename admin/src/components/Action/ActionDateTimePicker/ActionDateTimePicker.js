import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from '@strapi/design-system/DateTimePicker';
import { fetchSettings } from '../../../api/settings';
import { Typography } from '@strapi/design-system/Typography';
import { getTrad } from '../../../utils/getTrad';
import { useIntl } from 'react-intl';
import { Stack } from '@strapi/design-system/Stack';
import './ActionDateTimerPicker.css';

const ActionDateTimePicker = ({ executeAt, mode, isCreating, isEditing, onChange }) => {
	const [step, setStep] = useState(1);
	const { formatMessage } = useIntl();

	function handleDateChange(date) {
		if (onChange) {
			onChange(date);
		}
	}

	useEffect(() => {
		fetchSettings().then((response) => {
			if (response.data) {
				setStep(response.data.components.dateTimePicker.step);
			}
		});
	}, []);

	if (!isCreating && !isEditing) {
		return null;
	}

	return (
		<div id="action-date-time-picker">
			<Stack size={2}>
				<Typography variant="sigma" textColor="neutral600" merginBottom={1}>
					{formatMessage({
						id: getTrad(`action.header.${mode}.title`),
						defaultMessage: `${mode} Date`,
					})}
				</Typography>
				<DateTimePicker
					ariaLabel="datetime picker"
					onChange={handleDateChange}
					value={executeAt ? new Date(executeAt) : null}
					disabled={!isCreating}
					step={step}
				/>
			</Stack>
		</div>
	);
};

ActionDateTimePicker.propTypes = {
	executeAt: PropTypes.string,
	onChange: PropTypes.func,
	mode: PropTypes.string.isRequired,
	isCreating: PropTypes.bool.isRequired,
	isEditing: PropTypes.bool.isRequired,
};

export default ActionDateTimePicker;
