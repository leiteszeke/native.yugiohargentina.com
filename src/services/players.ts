// Utils
import { basicClient } from './utils';
import { MyObject } from '#types';

export const create = (data: MyObject) => basicClient.post('players', data);

export const remove = (data: MyObject) => basicClient.delete('players', data);

export default { create, remove };
