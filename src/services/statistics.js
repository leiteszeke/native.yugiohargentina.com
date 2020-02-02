// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = () =>
	client.get(`${url}statistics`, { public: true })
		.then(handleSuccess)
		.catch(handleError);