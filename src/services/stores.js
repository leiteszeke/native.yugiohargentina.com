// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = () =>
	client.get(`${url}stores`)
		.then(handleSuccess)
		.catch(handleError);