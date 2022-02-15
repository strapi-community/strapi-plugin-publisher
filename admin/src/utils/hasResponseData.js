export const hasResponseData = (response) => {
	if (!response.data) {
		return false;
	}

	if (Array.isArray(response.data)) {
		return response.data.length;
	}

	return Object.keys(response.data).length;
};
