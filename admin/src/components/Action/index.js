import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useReactQuery } from '../../hooks/useReactQuery';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { ActionHeader } from './ActionHeader';
import { ActionContent } from './ActionContent';
import { ActionFooter } from './ActionFooter';
import { isEmpty } from '../../utils/isEmpty';

const Action = ({ mode, entitySlug, entityId }) => {
	const { actionQueries } = useReactQuery();
	const [action, setAction] = useState({});
	const [isVisible, setIsVisible] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);

	const { isLoading, data, isRefetching } = actionQueries.getEntityAction({
		mode,
		entityId,
		entitySlug,
	});

	// set initial data to state so its reactive
	useEffect(() => {
		if (!isLoading && !isRefetching) {
			if (isEmpty(data)) {
				// delete case
				setAction({});
			} else {
				setAction(data[0]);
				setIsVisible(true);
				setIsDisabled(true);
			}
		}
	}, [isLoading, isRefetching]);

	return (
		<Box marginTop={4}>
			{isVisible && (
				<Stack size={2} marginTop={2} marginBottom={2}>
					<ActionHeader mode={mode} />
					<ActionContent action={action} setAction={setAction} isDisabled={isDisabled} />
				</Stack>
			)}
			<ActionFooter
				mode={mode}
				entityId={entityId}
				entitySlug={entitySlug}
				action={action}
				isDisabled={isDisabled}
				setIsDisabled={setIsDisabled}
				isVisible={isVisible}
				setIsVisible={setIsVisible}
			/>
		</Box>
	);
};

Action.propTypes = {
	mode: PropTypes.string.isRequired,
	entitySlug: PropTypes.string.isRequired,
	entityId: PropTypes.number,
};

export { Action };
