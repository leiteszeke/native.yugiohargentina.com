// Utils
import { basicClient } from './utils';
import { MyObject } from '#types';

export const all = (params?: MyObject) => basicClient.get('expansions', params);

export default { all };
