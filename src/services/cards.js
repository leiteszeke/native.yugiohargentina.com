// Utils
import {basicClient} from './utils';

export const all = params => basicClient.get(`cards`, {...params});

export const get = id => basicClient.get(`cards/${id}`);
