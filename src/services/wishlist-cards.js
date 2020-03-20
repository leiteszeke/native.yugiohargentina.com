// Utils
import {basicClient} from './utils';

export const all = params =>
  basicClient.get(`wishlists`, {...params, limit: 1});

export const add = data => basicClient.post(`wishlist-cards`, data);

export const remove = id => basicClient.delete(`wishlist-cards/${id}`);

export const update = data => basicClient.put(`wishlist-cards`, data);
