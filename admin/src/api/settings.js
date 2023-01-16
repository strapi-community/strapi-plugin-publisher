import { requestPluginEndpoint } from '../utils/requestPluginEndpoint';

const fetchSettings = () => {
	return requestPluginEndpoint('settings');
};

export { fetchSettings };
