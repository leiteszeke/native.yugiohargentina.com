// Utils
import { basicClient } from './utils';
import { MyObject } from '#types';

export const all = (params?: MyObject) =>
  basicClient.get('inventary-cards', params);

export const add = (data: MyObject) =>
  basicClient.post('inventary-cards', data);

export const remove = (id: number) =>
  basicClient.delete(`inventary-cards/${id}`);

export const update = (data: MyObject) =>
  basicClient.put('inventary-cards', data);
