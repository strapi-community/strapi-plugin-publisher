import { request } from '@strapi/helper-plugin';
import { getPluginEndpointURL } from './getPluginEndpointURL';

export const requestPluginEndpoint = (endpoint, data) => {
	const url = getPluginEndpointURL(endpoint);
	return request(url, data);
};
