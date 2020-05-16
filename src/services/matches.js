// Utils
import { basicClient } from './utils';

export const all = params => basicClient.get('matches', params);

export const get = id => basicClient.get(`matches/${id}`);
