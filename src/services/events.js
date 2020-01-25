// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = () =>
	client.get(`${url}events`, { public: true })
		.then(handleSuccess)
		.catch(handleError);