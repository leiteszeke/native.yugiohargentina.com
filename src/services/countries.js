// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = () =>
	client.get(`${url}countries`)
    .then(handleSuccess)
    .catch(handleError);