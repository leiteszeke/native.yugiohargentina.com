// Utils
import {basicClient} from './utils';

export const create = data => basicClient.post(`players`, data);
