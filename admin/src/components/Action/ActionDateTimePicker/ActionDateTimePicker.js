import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { DateTimePicker } from '@strapi/design-system/DateTimePicker';
import { Typography } from '@strapi/design-system/Typography';
import { Stack } from '@strapi/design-system/Stack';
import { getTrad } from '../../../utils/getTrad';
import { useSettings } from '../../../hooks/useSettings';

import './ActionDateTimerPicker.css';

const ActionDateTimePicker = ({ executeAt, mode, isCreating, isEditing, onChange }) => {
	const [step, setStep] = useState(1);
	const { formatMessage } = useIntl();
	const { getSettings } = useSettings();

	function handleDateChange(date) {
		if (onChange) {
			onChange(date);
		}
	}

	const { isLoading, data, isRefetching } = getSettings();

	useEffect(() => {
		if (!isLoading && !isRefetching) {
			if (data) {
				setStep(data.components.dateTimePicker.step);
			}
		}
	}, [isLoading, isRefetching]);

	if (!isCreating && !isEditing) {
		return null;
	}

	return (
		<div id="action-date-time-picker">
			<Stack spacing={2}>
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
