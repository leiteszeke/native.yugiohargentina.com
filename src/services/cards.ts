// Utils
import { basicClient } from './utils';
import { MyObject } from '#types';

export const all = (params?: MyObject) =>
  basicClient.get('cards', { ...params });

export const get = (id: number) => basicClient.get(`cards/${id}`);
