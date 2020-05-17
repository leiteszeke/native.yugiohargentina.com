// Utils
import { basicClient } from './utils';
import { MyObject } from '#types';

export const all = (params?: MyObject) => basicClient.get('eras', params);

export default { all };
