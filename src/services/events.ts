// Utils
import { basicClient } from './utils';
import { MyObject } from '#types';

export const all = (params?: MyObject) =>
  basicClient.get('events', { ...params, public: true });

export default { all };
