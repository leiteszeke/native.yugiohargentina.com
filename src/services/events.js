// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = () =>
	client.get(`${url}events`)
		.then(handleSuccess)
		.catch(handleError);