// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = () =>
	client.get(`${url}stores`, { public: true })
		.then(handleSuccess)
		.catch(handleError);