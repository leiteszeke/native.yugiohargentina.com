// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = params =>
	client.get(`${url}inventary-cards`, params)
		.then(handleSuccess)
    .catch(handleError);

export const add = data =>
  client.post(`${url}inventary-cards`, data)
    .then(handleSuccess)
    .catch(handleError);

export const remove = id =>
  client.delete(`${url}inventary-cards/${id}`)
    .then(handleSuccess)
    .catch(handleError);

export const update = data =>
  client.put(`${url}inventary-cards`, data)
    .then(handleSuccess)
    .catch(handleError);