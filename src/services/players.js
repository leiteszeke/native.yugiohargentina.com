// Utils
import {basicClient} from './utils';

export const create = data => basicClient.post(`players`, data);

export const remove = data => basicClient.delete(`players`, data);

export default {create, remove};
