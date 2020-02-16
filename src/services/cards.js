// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = (params) =>
	client.get(`${url}cards`, { ...params })
		.then(handleSuccess)
    .catch(handleError);

export const get = id =>
  client.get(`${url}cards/${id}`)
    .then(handleSuccess)
    .catch(handleError);