// Utils
import { basicClient } from './utils';
import { MyObject } from '#types';

export const all = (params?: MyObject) =>
  basicClient.get('wishlists', { ...params, limit: 1 });

export const add = (data: MyObject) => basicClient.post('wishlist-cards', data);

export const remove = (id: number) =>
  basicClient.delete(`wishlist-cards/${id}`);

export const update = (data: MyObject) =>
  basicClient.put('wishlist-cards', data);
