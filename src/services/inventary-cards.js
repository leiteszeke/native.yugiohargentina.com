// Utils
import {basicClient} from './utils';

export const all = params => basicClient.get(`${url}inventary-cards`, params);

export const add = data => basicClient.post(`${url}inventary-cards`, data);

export const remove = id => basicClient.delete(`${url}inventary-cards/${id}`);

export const update = data => basicClient.put(`${url}inventary-cards`, data);
