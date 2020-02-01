// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = (params) =>
	client.get(`${url}events`, { ...params, public: true })
		.then(handleSuccess)
		.catch(handleError);