// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = () =>
	client.get(`${url}states`)
    .then(handleSuccess)
    .catch(handleError);