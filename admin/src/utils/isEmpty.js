export const isEmpty = (v) => {
	if (!v) {
		return true;
	} else if (Array.isArray(v)) {
		return v.length === 0;
	}

	return !Object.keys(v).length === 0;
};
