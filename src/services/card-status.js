// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = () =>
	client.get(`${url}card-status`)
    .then(handleSuccess)
    .catch(handleError);