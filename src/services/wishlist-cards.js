// Utils
import { client, url, handleSuccess, handleError } from './utils';

export const all = (params) =>
	client.get(`${url}wishlists`, { ...params, limit: 1 })
		.then(handleSuccess)
    .catch(handleError);

export const add = data =>
  client.post(`${url}wishlist-cards`, data)
    .then(handleSuccess)
    .catch(handleError);

export const remove = id =>
  client.delete(`${url}wishlist-cards/${id}`)
    .then(handleSuccess)
    .catch(handleError);

export const update = data =>
  client.put(`${url}wishlist-cards`, data)
    .then(handleSuccess)
    .catch(handleError);