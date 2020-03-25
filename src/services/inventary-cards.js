// Utils
import {basicClient} from './utils';

export const all = params => basicClient.get(`inventary-cards`, params);

export const add = data => basicClient.post(`inventary-cards`, data);

export const remove = id => basicClient.delete(`inventary-cards/${id}`);

export const update = data => basicClient.put(`inventary-cards`, data);
