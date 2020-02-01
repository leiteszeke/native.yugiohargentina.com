// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = (params) =>
	client.get(`${url}cards`, { ...params })
		.then(handleSuccess)
    .catch(handleError);


export const get = id =>
  client.get(`${url}cards/${id}`)
    .then(res => res.data)
    .catch(err => err.response.data);