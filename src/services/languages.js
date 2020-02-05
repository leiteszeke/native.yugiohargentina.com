// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = () =>
	client.get(`${url}languages`)
		.then(handleSuccess)
    .catch(handleError);
